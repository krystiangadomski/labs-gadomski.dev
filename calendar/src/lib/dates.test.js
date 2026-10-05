import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  WEEKDAYS,
  toKey,
  keyOf,
  fromKey,
  daysInMonth,
  shiftMonth,
  monthGrid,
  monthLabel,
  dayLabel,
  shortDayLabel,
  toTime,
} from './dates.js'

test('the week starts on Monday', () => {
  assert.deepEqual(WEEKDAYS, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
})

test('toKey pads month and day, and fromKey reads it back', () => {
  assert.equal(toKey(new Date(2026, 0, 5)), '2026-01-05')
  assert.equal(keyOf(2026, 11, 31), '2026-12-31')
  assert.equal(toKey(fromKey('2027-02-09')), '2027-02-09')
})

test('daysInMonth knows short months and leap years', () => {
  assert.equal(daysInMonth(2026, 1), 28)
  assert.equal(daysInMonth(2028, 1), 29)
  assert.equal(daysInMonth(2026, 3), 30)
  assert.equal(daysInMonth(2026, 11), 31)
})

test('shiftMonth rolls the year over in both directions', () => {
  assert.deepEqual(shiftMonth({ year: 2026, month: 11 }, 1), { year: 2027, month: 0 })
  assert.deepEqual(shiftMonth({ year: 2026, month: 0 }, -1), { year: 2025, month: 11 })
  assert.deepEqual(shiftMonth({ year: 2026, month: 5 }, 0), { year: 2026, month: 5 })
})

test('monthGrid runs in whole weeks from the Monday on or before the 1st', () => {
  // 1 October 2026 is a Thursday, so the grid opens on Monday 28 September and closes on
  // Sunday 1 November: five weeks.
  const grid = monthGrid(2026, 9)
  assert.equal(grid.length, 35)
  assert.deepEqual(grid[0], { key: '2026-09-28', day: 28, inMonth: false })
  assert.deepEqual(grid[3], { key: '2026-10-01', day: 1, inMonth: true })
  assert.equal(grid.filter((day) => day.inMonth).length, 31)
  assert.deepEqual(grid[34], { key: '2026-11-01', day: 1, inMonth: false })
})

test('monthGrid takes six weeks when the month needs them and four when it fits', () => {
  // August 2026 starts on a Saturday and has 31 days; February 2027 starts on a Monday.
  assert.equal(monthGrid(2026, 7).length, 42)
  assert.equal(monthGrid(2027, 1).length, 28)
})

test('a month that starts on Monday opens on its 1st', () => {
  // 1 June 2026 is a Monday.
  assert.deepEqual(monthGrid(2026, 5)[0], { key: '2026-06-01', day: 1, inMonth: true })
})

test('every grid row starts on a Monday', () => {
  const grid = monthGrid(2026, 7)
  for (let row = 0; row < grid.length / 7; row++) assert.equal(fromKey(grid[row * 7].key).getDay(), 1)
})

test('labels read in English', () => {
  assert.equal(monthLabel(2026, 9), 'October 2026')
  assert.equal(dayLabel('2026-10-05'), 'Monday 5 October')
  assert.equal(shortDayLabel('2026-10-05'), 'Mon 5 Oct')
})

test('toTime pads hours and minutes', () => {
  assert.equal(toTime(new Date(2026, 0, 1, 7, 5)), '07:05')
  assert.equal(toTime(new Date(2026, 0, 1, 23, 59)), '23:59')
})
