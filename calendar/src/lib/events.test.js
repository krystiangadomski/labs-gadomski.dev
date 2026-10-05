import { test } from 'node:test'
import assert from 'node:assert/strict'
import { nextId, isValidTime, addEvent, removeEvent, eventsOn, countByDay, upcoming } from './events.js'
import { seedEvents } from './seed.js'
import { daysInMonth, fromKey, toKey } from './dates.js'

const sample = () => [
  { id: 1, date: '2026-10-05', time: '16:00', title: 'Call the plumber' },
  { id: 2, date: '2026-10-05', time: '09:30', title: 'Stand-up' },
  { id: 4, date: '2026-10-12', time: '18:00', title: 'Yoga class' },
  { id: 5, date: '2026-11-01', time: '10:00', title: 'Market' },
]

test('nextId is one more than the highest id', () => {
  assert.equal(nextId(sample()), 6)
  assert.equal(nextId([]), 1)
})

test('isValidTime accepts HH:MM on the 24-hour clock only', () => {
  assert.equal(isValidTime('00:00'), true)
  assert.equal(isValidTime('23:59'), true)
  assert.equal(isValidTime('24:00'), false)
  assert.equal(isValidTime('9:00'), false)
  assert.equal(isValidTime(''), false)
})

test('addEvent adds a trimmed event with the next id', () => {
  const events = addEvent(sample(), { date: '2026-10-07', time: '11:00', title: '  Haircut  ' })
  assert.equal(events.length, 5)
  assert.deepEqual(events.at(-1), { id: 6, date: '2026-10-07', time: '11:00', title: 'Haircut' })
})

test('addEvent ignores an empty title, a bad time or a bad date', () => {
  const events = sample()
  assert.equal(addEvent(events, { date: '2026-10-07', time: '11:00', title: '   ' }), events)
  assert.equal(addEvent(events, { date: '2026-10-07', time: '', title: 'Haircut' }), events)
  assert.equal(addEvent(events, { date: 'soon', time: '11:00', title: 'Haircut' }), events)
})

test('addEvent and removeEvent leave the original list alone', () => {
  const events = sample()
  addEvent(events, { date: '2026-10-07', time: '11:00', title: 'Haircut' })
  removeEvent(events, 1)
  assert.deepEqual(events, sample())
})

test('removeEvent removes only the event with that id', () => {
  assert.deepEqual(
    removeEvent(sample(), 2).map((event) => event.id),
    [1, 4, 5],
  )
})

test('eventsOn gives one day, earliest first', () => {
  assert.deepEqual(
    eventsOn(sample(), '2026-10-05').map((event) => event.time),
    ['09:30', '16:00'],
  )
  assert.deepEqual(eventsOn(sample(), '2026-10-06'), [])
})

test('countByDay counts events per date', () => {
  assert.deepEqual(countByDay(sample()), { '2026-10-05': 2, '2026-10-12': 1, '2026-11-01': 1 })
})

test('upcoming skips what has passed today and sorts the rest', () => {
  const next = upcoming(sample(), '2026-10-05', '12:00', 10)
  assert.deepEqual(
    next.map((event) => event.id),
    [1, 4, 5],
  )
})

test('upcoming keeps an event starting this minute and respects the limit', () => {
  assert.deepEqual(
    upcoming(sample(), '2026-10-05', '09:30', 2).map((event) => event.id),
    [2, 1],
  )
})

test('the seed puts eight events in the month of the given day, one on that day', () => {
  for (const today of [new Date(2026, 9, 5), new Date(2027, 1, 28), new Date(2026, 3, 30)]) {
    const events = seedEvents(today)
    assert.equal(events.length, 8)
    assert.equal(new Set(events.map((event) => event.id)).size, 8)
    for (const event of events) {
      const date = fromKey(event.date)
      assert.equal(date.getMonth(), today.getMonth())
      assert.equal(date.getFullYear(), today.getFullYear())
      assert.ok(date.getDate() <= daysInMonth(today.getFullYear(), today.getMonth()))
      assert.equal(isValidTime(event.time), true)
    }
    assert.equal(eventsOn(events, toKey(today)).length >= 1, true)
  }
})
