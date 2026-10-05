// Sample price series, so the app works offline and on camera. They are made up: a random walk
// from a fixed seed, the same numbers on every load. They are not real prices and carry no dates;
// the screen labels them "Sample data" wherever they show.

/** @typedef {import('./coins.js').Symbol} Symbol */
/** @typedef {import('./coins.js').Range} Range */

/** Points per range: hourly for 24h, every 4 hours for 7d, daily for 30d. */
export const SAMPLE_POINTS = { '24h': 25, '7d': 43, '30d': 31 }

/** Hours between two points, used to scale how much a step can move. */
const STEP_HOURS = { '24h': 1, '7d': 4, '30d': 24 }

/**
 * The made-up last price, the hourly wobble, and the change each range ends on (percent).
 * @type {Record<Symbol, { last: number, wobble: number, change: Record<Range, number> }>}
 */
const SHAPES = {
  BTC: { last: 61284.5, wobble: 0.004, change: { '24h': 2.41, '7d': 5.82, '30d': -3.12 } },
  XRP: { last: 0.5872, wobble: 0.006, change: { '24h': -1.94, '7d': 3.37, '30d': 12.6 } },
  ETH: { last: 2436.18, wobble: 0.005, change: { '24h': 0.83, '7d': -4.21, '30d': 7.45 } },
}

/**
 * A small seeded random generator (mulberry32), so the walk is the same every time.
 * @param {number} seed
 */
function seeded(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** @param {string} text */
function hash(text) {
  let h = 2166136261
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 16777619)
  return h >>> 0
}

/** @type {Map<string, readonly number[]>} */
const cache = new Map()

/**
 * The sample series for one coin and range, oldest first. Every range ends on the same last price.
 * @param {Symbol} symbol
 * @param {Range} range
 * @returns {readonly number[]}
 */
export function sampleSeries(symbol, range) {
  const key = `${symbol}/${range}`
  const cached = cache.get(key)
  if (cached) return cached

  const shape = SHAPES[symbol]
  const points = SAMPLE_POINTS[range]
  const random = seeded(hash(key))
  const step = shape.wobble * Math.sqrt(STEP_HOURS[range])

  // A walk in log price that ends at 0 (the last price), built backwards from the end.
  const walk = new Array(points).fill(0)
  for (let i = points - 2; i >= 0; i--) walk[i] = walk[i + 1] + step * (random() * 2 - 1)

  // Tilt the walk so its first point lands exactly on the wanted change; the end stays put.
  const wantedStart = -Math.log(1 + shape.change[range] / 100)
  const tilt = wantedStart - walk[0]
  const series = walk.map((w, i) => {
    const value = shape.last * Math.exp(w + (tilt * (points - 1 - i)) / (points - 1))
    return i === points - 1 ? shape.last : value
  })

  const frozen = Object.freeze(series)
  cache.set(key, frozen)
  return frozen
}

/**
 * Price and 24h change for every coin, in the shape the watchlist reads.
 * @param {readonly Symbol[]} symbols
 * @returns {Record<string, { price: number, change: number }>}
 */
export function samplePrices(symbols) {
  /** @type {Record<string, { price: number, change: number }>} */
  const prices = {}
  for (const symbol of symbols) {
    const day = sampleSeries(symbol, '24h')
    prices[symbol] = { price: day.at(-1) ?? 0, change: ((day.at(-1) ?? 0) / day[0] - 1) * 100 }
  }
  return prices
}
