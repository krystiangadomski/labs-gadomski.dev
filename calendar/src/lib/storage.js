// Saving and loading the events. The storage is passed in, so the browser hands over
// window.localStorage and the tests hand over a plain stand-in.

/** The localStorage key the events live under. */
export const STORAGE_KEY = 'calendar-events'

/**
 * @typedef {{ getItem(key: string): string | null, setItem(key: string, value: string): void }} KeyValueStore
 */

/**
 * Reads the saved list. Nothing saved yet, or something unreadable, gives the fallback.
 * @param {KeyValueStore} storage
 * @param {import('./events.js').CalendarEvent[]} fallback
 * @returns {import('./events.js').CalendarEvent[]}
 */
export function loadEvents(storage, fallback) {
  const saved = storage.getItem(STORAGE_KEY)
  if (saved === null) return fallback
  try {
    const events = JSON.parse(saved)
    return Array.isArray(events) ? events : fallback
  } catch {
    return fallback
  }
}

/**
 * Writes the whole list of events.
 * @param {KeyValueStore} storage
 * @param {import('./events.js').CalendarEvent[]} events
 */
export function saveEvents(storage, events) {
  storage.setItem(STORAGE_KEY, JSON.stringify(events))
}
