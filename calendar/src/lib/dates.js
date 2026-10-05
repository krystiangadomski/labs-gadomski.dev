// Plain date helpers. A day is identified by a key "YYYY-MM-DD" in local time, so the
// calendar never shifts a day because of the time zone. Months are 0-based, like Date.

/** @typedef {{ key: string, day: number, inMonth: boolean }} GridDay */

/** Weekday labels for a week that starts on Monday, the order the grid uses. */
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** @param {number} n */
const pad = (n) => String(n).padStart(2, '0')

/**
 * The key of a date: "2026-10-05".
 * @param {Date} date
 */
export function toKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/**
 * The key of a year, a 0-based month and a day of the month.
 * @param {number} year
 * @param {number} month
 * @param {number} day
 */
export function keyOf(year, month, day) {
  return toKey(new Date(year, month, day))
}

/**
 * A key back to a local Date at midnight.
 * @param {string} key
 */
export function fromKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/**
 * How many days a month has.
 * @param {number} year
 * @param {number} month
 */
export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * The month a number of months away, with the year rolled over.
 * @param {{ year: number, month: number }} at
 * @param {number} delta
 * @returns {{ year: number, month: number }}
 */
export function shiftMonth({ year, month }, delta) {
  const date = new Date(year, month + delta, 1)
  return { year: date.getFullYear(), month: date.getMonth() }
}

/**
 * The days the month view shows: whole weeks from the Monday on or before the 1st to the
 * Sunday on or after the last day, so four to six rows. Days from the months either side
 * are marked inMonth: false.
 * @param {number} year
 * @param {number} month
 * @returns {GridDay[]}
 */
export function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const weeks = Math.ceil((offset + daysInMonth(year, month)) / 7)
  return Array.from({ length: weeks * 7 }, (_, index) => {
    const date = new Date(year, month, 1 - offset + index)
    return { key: toKey(date), day: date.getDate(), inMonth: date.getMonth() === month }
  })
}

/**
 * The month heading: "October 2026".
 * @param {number} year
 * @param {number} month
 */
export function monthLabel(year, month) {
  return `${MONTHS[month]} ${year}`
}

/**
 * The selected day's heading: "Monday 5 October".
 * @param {string} key
 */
export function dayLabel(key) {
  const date = fromKey(key)
  return `${DAY_NAMES[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`
}

/**
 * A short date for the upcoming list: "Mon 5 Oct".
 * @param {string} key
 */
export function shortDayLabel(key) {
  const date = fromKey(key)
  return `${DAY_NAMES[date.getDay()].slice(0, 3)} ${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)}`
}

/**
 * The time of a date as "HH:MM", the format events store.
 * @param {Date} date
 */
export function toTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}
