// The optional live mode: prices and a chart from the public CoinGecko API (no key).
// Off by default. Any failure falls back to sample data; nothing here retries.

/** @typedef {import('./coins.js').Coin} Coin */
/** @typedef {import('./coins.js').Range} Range */
/** @typedef {(url: string, init?: { signal?: AbortSignal }) => Promise<{ ok: boolean, status: number, json(): Promise<any> }>} FetchLike */

export const API = 'https://api.coingecko.com/api/v3'

/** Give up on a request after this many milliseconds. */
export const TIMEOUT_MS = 8000

const DAYS = { '24h': 1, '7d': 7, '30d': 30 }

/**
 * @param {readonly Coin[]} coins
 */
export function pricesUrl(coins) {
  const ids = coins.map((coin) => coin.geckoId).join(',')
  return `${API}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
}

/**
 * @param {Coin} coin
 * @param {Range} range
 */
export function chartUrl(coin, range) {
  return `${API}/coins/${coin.geckoId}/market_chart?vs_currency=usd&days=${DAYS[range]}`
}

/**
 * Price and 24h change per symbol. Throws if any coin is missing, so a half answer is never shown.
 * @param {any} json
 * @param {readonly Coin[]} coins
 * @returns {Record<string, { price: number, change: number }>}
 */
export function parsePrices(json, coins) {
  /** @type {Record<string, { price: number, change: number }>} */
  const prices = {}
  for (const coin of coins) {
    const entry = json?.[coin.geckoId]
    if (typeof entry?.usd !== 'number' || typeof entry?.usd_24h_change !== 'number') {
      throw new Error(`No live price for ${coin.symbol}`)
    }
    prices[coin.symbol] = { price: entry.usd, change: entry.usd_24h_change }
  }
  return prices
}

/**
 * The price values of a market_chart answer, oldest first. Throws on fewer than two points.
 * @param {any} json
 * @returns {number[]}
 */
export function parseChart(json) {
  const points = Array.isArray(json?.prices) ? json.prices : []
  const values = points.map((/** @type {any} */ p) => p?.[1]).filter((v) => typeof v === 'number')
  if (values.length < 2) throw new Error('Not enough live chart points')
  return values
}

/**
 * @param {FetchLike} fetchFn
 * @param {string} url
 */
async function getJson(fetchFn, url) {
  const response = await fetchFn(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!response.ok) throw new Error(`CoinGecko answered ${response.status}`)
  return response.json()
}

/**
 * Fetches live prices for all coins and the chart for one coin and range.
 * Rejects on any network error, timeout, bad status or unexpected shape.
 * @param {FetchLike} fetchFn
 * @param {readonly Coin[]} coins
 * @param {Coin} coin
 * @param {Range} range
 */
export async function loadLive(fetchFn, coins, coin, range) {
  const [pricesJson, chartJson] = await Promise.all([
    getJson(fetchFn, pricesUrl(coins)),
    getJson(fetchFn, chartUrl(coin, range)),
  ])
  return { prices: parsePrices(pricesJson, coins), series: parseChart(chartJson) }
}

/**
 * @typedef {'off' | 'loading' | 'ready' | 'failed'} LiveStatus
 */

/**
 * What the source label says, and whether sample data is on screen.
 * Sample data is shown unless live is on and live data has arrived.
 * @param {LiveStatus} status
 * @param {boolean} hasLiveData
 * @returns {{ sample: boolean, text: string }}
 */
export function sourceLabel(status, hasLiveData) {
  if (status === 'failed') return { sample: true, text: 'Sample data · live unavailable' }
  if (status === 'loading' && !hasLiveData) return { sample: true, text: 'Sample data · connecting' }
  if (status === 'off' || !hasLiveData) return { sample: true, text: 'Sample data · not live prices' }
  return { sample: false, text: status === 'loading' ? 'Live · CoinGecko · updating' : 'Live · CoinGecko' }
}
