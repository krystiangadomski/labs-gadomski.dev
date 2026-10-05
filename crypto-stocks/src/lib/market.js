// Turning prices into what the screen shows: changes, formatted numbers, the chart line,
// and the holdings sums. Plain functions, no state.

/** @typedef {'up' | 'down' | 'flat'} Direction */

/**
 * Percent change from the first to the last value of a series.
 * @param {readonly number[]} series
 */
export function changePercent(series) {
  if (series.length < 2 || series[0] === 0) return 0
  return ((series[series.length - 1] - series[0]) / series[0]) * 100
}

/**
 * Up, down or flat, judged on the change as it is shown (two decimals).
 * @param {number} percent
 * @returns {Direction}
 */
export function direction(percent) {
  const shown = Math.round(percent * 100) / 100
  if (shown > 0) return 'up'
  if (shown < 0) return 'down'
  return 'flat'
}

/**
 * "▲ 2.41%", "▼ 1.94%" or "0.00%". The glyph carries the direction, so colour does not have to.
 * @param {number} percent
 */
export function formatChange(percent) {
  const size = Math.abs(percent).toFixed(2)
  const dir = direction(percent)
  if (dir === 'up') return `▲ ${size}%`
  if (dir === 'down') return `▼ ${size}%`
  return '0.00%'
}

/**
 * A US dollar amount with a fixed number of decimals, e.g. "$61,284.50".
 * @param {number} value
 * @param {number} [decimals]
 */
export function formatUsd(value, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Keeps at most `max` points, evenly spaced, always including the first and the last.
 * Live data can have hundreds of points; the chart needs about a hundred.
 * @param {readonly number[]} series
 * @param {number} max
 * @returns {number[]}
 */
export function downsample(series, max) {
  if (series.length <= max || max < 2) return [...series]
  const out = []
  for (let i = 0; i < max; i++) out.push(series[Math.round((i * (series.length - 1)) / (max - 1))])
  return out
}

/**
 * The chart line as an SVG path in a width x height box, plus the lowest and highest value.
 * Higher prices sit higher. A flat series draws across the middle.
 * @param {readonly number[]} series
 * @param {number} width
 * @param {number} height
 * @returns {{ path: string, min: number, max: number }}
 */
export function chartLine(series, width, height) {
  if (series.length === 0) return { path: '', min: 0, max: 0 }
  const min = Math.min(...series)
  const max = Math.max(...series)
  const span = max - min
  const last = Math.max(series.length - 1, 1)
  const path = series
    .map((value, i) => {
      const x = (i / last) * width
      const y = span === 0 ? height / 2 : height - ((value - min) / span) * height
      return `${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`
    })
    .join(' ')
  return { path, min, max }
}

/** @param {number} n */
function round(n) {
  return Math.round(n * 100) / 100
}

/**
 * Reads a typed amount. Accepts "0.25" and "0,25"; blank, negative or not a number gives null.
 * @param {string} text
 * @returns {number | null}
 */
export function parseAmount(text) {
  const cleaned = String(text).trim().replace(',', '.')
  if (cleaned === '' || !/^\d*\.?\d+$|^\d+\.$/.test(cleaned)) return null
  return Number(cleaned)
}

/**
 * Value of one holding in dollars; an unreadable amount counts as zero.
 * @param {string} amountText
 * @param {number} price
 */
export function holdingValue(amountText, price) {
  const amount = parseAmount(amountText)
  return amount === null ? 0 : amount * price
}

/**
 * Sum of all holdings in dollars.
 * @param {Record<string, string>} holdings amount typed per coin symbol
 * @param {Record<string, { price: number }>} prices
 */
export function totalValue(holdings, prices) {
  return Object.entries(holdings).reduce(
    (sum, [symbol, amount]) => sum + (prices[symbol] ? holdingValue(amount, prices[symbol].price) : 0),
    0,
  )
}

/**
 * The two labels under the chart. Relative on purpose: sample data has no real dates.
 * @param {import('./coins.js').Range} range
 * @returns {[string, string]}
 */
export function rangeEnds(range) {
  const start = { '24h': '24 hours ago', '7d': '7 days ago', '30d': '30 days ago' }[range]
  return [start, 'now']
}
