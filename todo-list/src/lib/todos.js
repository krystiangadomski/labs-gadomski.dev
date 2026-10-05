// Plain functions over a list of todos. Every function returns a new list and never changes
// the one it was given, so the screen can replace its state in one assignment.

/** @typedef {{ id: number, title: string, done: boolean }} Todo */

/** The three filters, in the order the filter bar shows them. */
export const FILTERS = /** @type {const} */ (['all', 'active', 'done'])

/** @typedef {typeof FILTERS[number]} Filter */

/**
 * The id the next todo gets: one more than the highest id in the list.
 * @param {Todo[]} todos
 */
export function nextId(todos) {
  return todos.reduce((highest, todo) => Math.max(highest, todo.id), 0) + 1
}

/**
 * Adds a todo at the end of the list. A title that is empty after trimming adds nothing.
 * @param {Todo[]} todos
 * @param {string} title
 * @returns {Todo[]}
 */
export function addTodo(todos, title) {
  const clean = title.trim()
  if (clean === '') return todos
  return [...todos, { id: nextId(todos), title: clean, done: false }]
}

/**
 * Flips one todo between done and not done.
 * @param {Todo[]} todos
 * @param {number} id
 * @returns {Todo[]}
 */
export function toggleTodo(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
}

/**
 * Removes one todo.
 * @param {Todo[]} todos
 * @param {number} id
 * @returns {Todo[]}
 */
export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id)
}

/**
 * The todos a filter shows: all of them, the ones still to do, or the ones done.
 * @param {Todo[]} todos
 * @param {Filter} filter
 * @returns {Todo[]}
 */
export function filterTodos(todos, filter) {
  if (filter === 'active') return todos.filter((todo) => !todo.done)
  if (filter === 'done') return todos.filter((todo) => todo.done)
  return todos
}

/**
 * How many todos are not done yet: the "N left" counter.
 * @param {Todo[]} todos
 */
export function countLeft(todos) {
  return todos.filter((todo) => !todo.done).length
}

/**
 * The counter's text: "1 left", "3 left", "Nothing left".
 * @param {number} left
 */
export function leftLabel(left) {
  return left === 0 ? 'Nothing left' : `${left} left`
}
