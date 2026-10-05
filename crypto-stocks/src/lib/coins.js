// The three coins the app tracks and the three chart ranges. Nothing else is tracked.

/**
 * @typedef {'BTC' | 'XRP' | 'ETH'} Symbol
 * @typedef {'24h' | '7d' | '30d'} Range
 * @typedef {{ symbol: Symbol, name: string, geckoId: string, decimals: number }} Coin
 */

/** In watchlist order. `decimals` is how many places a price shows; XRP trades below a dollar. */
/** @type {Coin[]} */
export const COINS = [
  { symbol: 'BTC', name: 'Bitcoin', geckoId: 'bitcoin', decimals: 2 },
  { symbol: 'XRP', name: 'XRP', geckoId: 'ripple', decimals: 4 },
  { symbol: 'ETH', name: 'Ethereum', geckoId: 'ethereum', decimals: 2 },
]

/** @type {Range[]} */
export const RANGES = ['24h', '7d', '30d']

/**
 * @param {Symbol} symbol
 * @returns {Coin}
 */
export function coinBySymbol(symbol) {
  const coin = COINS.find((c) => c.symbol === symbol)
  if (!coin) throw new Error(`Unknown coin: ${symbol}`)
  return coin
}
