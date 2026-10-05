// The events a first visit starts with: ordinary appointments, nothing that happened.
// The dates are worked out from today, so the seed always lands in the current month.

import { daysInMonth, keyOf } from './dates.js'

/** Day of the month, time and title. Today gets one more event on top of these. */
const PLAN = [
  { day: 3, time: '10:00', title: 'Farmers market' },
  { day: 9, time: '18:30', title: 'Yoga class' },
  { day: 14, time: '08:15', title: 'Dentist check-up' },
  { day: 14, time: '19:00', title: 'Book club' },
  { day: 19, time: '12:30', title: 'Lunch with Anna' },
  { day: 23, time: '09:00', title: 'Car service' },
  { day: 28, time: '17:00', title: 'Pay the rent' },
]

/**
 * The seed events for the month of a given day. Days past the end of a short month move to
 * its last day; the "today" event sits on the given day itself.
 * @param {Date} today
 * @returns {import('./events.js').CalendarEvent[]}
 */
export function seedEvents(today) {
  const year = today.getFullYear()
  const month = today.getMonth()
  const last = daysInMonth(year, month)
  const planned = PLAN.map((item) => ({ ...item, day: Math.min(item.day, last) }))
  planned.push({ day: today.getDate(), time: '16:00', title: 'Call the plumber' })
  return planned.map((item, index) => ({
    id: index + 1,
    date: keyOf(year, month, item.day),
    time: item.time,
    title: item.title,
  }))
}
