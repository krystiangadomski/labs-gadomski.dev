// Saving and loading the list. The storage is passed in, so the browser hands over
// window.localStorage and the tests hand over a plain stand-in.

/** The localStorage key the list lives under. */
export const STORAGE_KEY = 'todos'

/**
 * @typedef {{ getItem(key: string): string | null, setItem(key: string, value: string): void }} KeyValueStore
 */

/**
 * Reads the saved list. Nothing saved yet, or something unreadable, gives the fallback.
 * @param {KeyValueStore} storage
 * @param {import('./todos.js').Todo[]} fallback
 * @returns {import('./todos.js').Todo[]}
 */
export function loadTodos(storage, fallback) {
  const saved = storage.getItem(STORAGE_KEY)
  if (saved === null) return fallback
  try {
    const todos = JSON.parse(saved)
    return Array.isArray(todos) ? todos : fallback
  } catch {
    return fallback
  }
}

/**
 * Writes the whole list.
 * @param {KeyValueStore} storage
 * @param {import('./todos.js').Todo[]} todos
 */
export function saveTodos(storage, todos) {
  storage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
