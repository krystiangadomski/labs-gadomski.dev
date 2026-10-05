// Saving and loading the favourites. The storage is passed in, so the browser hands over
// window.localStorage and the tests hand over a plain stand-in.

/** The localStorage key the favourites live under. */
export const STORAGE_KEY = 'favourites'

/**
 * @typedef {{ getItem(key: string): string | null, setItem(key: string, value: string): void }} KeyValueStore
 */

/**
 * Reads the saved favourite ids. Nothing saved yet, or something unreadable, gives the fallback.
 * @param {KeyValueStore} storage
 * @param {string[]} fallback
 * @returns {string[]}
 */
export function loadFavourites(storage, fallback) {
  const saved = storage.getItem(STORAGE_KEY)
  if (saved === null) return fallback
  try {
    const ids = JSON.parse(saved)
    return Array.isArray(ids) && ids.every((id) => typeof id === 'string') ? ids : fallback
  } catch {
    return fallback
  }
}

/**
 * Writes the whole list of favourite ids.
 * @param {KeyValueStore} storage
 * @param {string[]} favourites
 */
export function saveFavourites(storage, favourites) {
  storage.setItem(STORAGE_KEY, JSON.stringify(favourites))
}
