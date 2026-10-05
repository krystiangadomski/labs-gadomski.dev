// Saving and loading the holdings. The storage is passed in, so the browser hands over
// window.localStorage and the tests hand over a plain stand-in.

/** The localStorage key the holdings live under. */
export const STORAGE_KEY = 'holdings'

/**
 * @typedef {{ getItem(key: string): string | null, setItem(key: string, value: string): void }} KeyValueStore
 * @typedef {Record<string, string>} Holdings amount as typed, per coin symbol
 */

/** What a first visit starts with, so the calculator shows numbers straight away. */
/** @type {Holdings} */
export const SEED_HOLDINGS = { BTC: '0.5', XRP: '2000', ETH: '3' }

/**
 * Reads the saved holdings for the given coins. Missing coins get an empty amount; nothing
 * saved yet, or something unreadable, gives the fallback.
 * @param {KeyValueStore} storage
 * @param {readonly string[]} symbols
 * @param {Holdings} fallback
 * @returns {Holdings}
 */
export function loadHoldings(storage, symbols, fallback) {
  const saved = storage.getItem(STORAGE_KEY)
  if (saved === null) return { ...fallback }
  let parsed
  try {
    parsed = JSON.parse(saved)
  } catch {
    return { ...fallback }
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return { ...fallback }
  /** @type {Holdings} */
  const holdings = {}
  for (const symbol of symbols) {
    holdings[symbol] = typeof parsed[symbol] === 'string' ? parsed[symbol] : ''
  }
  return holdings
}

/**
 * Writes all holdings.
 * @param {KeyValueStore} storage
 * @param {Holdings} holdings
 */
export function saveHoldings(storage, holdings) {
  storage.setItem(STORAGE_KEY, JSON.stringify(holdings))
}
