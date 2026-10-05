// Plain functions over a list of events. Every function returns a new list and never changes
// the one it was given, so the screen can replace its state in one assignment.

/** @typedef {{ id: number, date: string, time: string, title: string }} CalendarEvent */

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

/**
 * The id the next event gets: one more than the highest id in the list.
 * @param {CalendarEvent[]} events
 */
export function nextId(events) {
  return events.reduce((highest, event) => Math.max(highest, event.id), 0) + 1
}

/**
 * Whether a time is a valid "HH:MM" on the 24-hour clock.
 * @param {string} time
 */
export function isValidTime(time) {
  return TIME.test(time)
}

/**
 * Adds an event. An empty title, a time that is not "HH:MM" or a malformed date adds nothing.
 * @param {CalendarEvent[]} events
 * @param {{ date: string, time: string, title: string }} draft
 * @returns {CalendarEvent[]}
 */
export function addEvent(events, { date, time, title }) {
  const clean = title.trim()
  if (clean === '' || !isValidTime(time) || !DATE.test(date)) return events
  return [...events, { id: nextId(events), date, time, title: clean }]
}

/**
 * Removes one event.
 * @param {CalendarEvent[]} events
 * @param {number} id
 * @returns {CalendarEvent[]}
 */
export function removeEvent(events, id) {
  return events.filter((event) => event.id !== id)
}

/**
 * Earlier date first, then earlier time, then the order they were added.
 * @param {CalendarEvent} a
 * @param {CalendarEvent} b
 */
function byWhen(a, b) {
  return a.date.localeCompare(b.date) || a.time.localeCompare(b.time) || a.id - b.id
}

/**
 * The events of one day, earliest first.
 * @param {CalendarEvent[]} events
 * @param {string} date
 * @returns {CalendarEvent[]}
 */
export function eventsOn(events, date) {
  return events.filter((event) => event.date === date).sort(byWhen)
}

/**
 * How many events each day has, keyed by date. Days with none are absent.
 * @param {CalendarEvent[]} events
 * @returns {Record<string, number>}
 */
export function countByDay(events) {
  /** @type {Record<string, number>} */
  const counts = {}
  for (const event of events) counts[event.date] = (counts[event.date] ?? 0) + 1
  return counts
}

/**
 * The next events from a moment on: later days, plus today's from the current minute on.
 * @param {CalendarEvent[]} events
 * @param {string} today the key of today
 * @param {string} now the current time, "HH:MM"
 * @param {number} limit
 * @returns {CalendarEvent[]}
 */
export function upcoming(events, today, now, limit) {
  return events
    .filter((event) => event.date > today || (event.date === today && event.time >= now))
    .sort(byWhen)
    .slice(0, limit)
}
