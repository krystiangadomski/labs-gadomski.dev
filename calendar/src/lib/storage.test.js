import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STORAGE_KEY, loadEvents, saveEvents } from './storage.js'

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, value),
  }
}

const fallback = [{ id: 1, date: '2026-01-02', time: '09:00', title: 'Fallback' }]

test('loadEvents gives the fallback when nothing is saved', () => {
  assert.equal(loadEvents(memoryStorage(), fallback), fallback)
})

test('saveEvents then loadEvents gives the same events back', () => {
  const storage = memoryStorage()
  const events = [{ id: 7, date: '2026-03-04', time: '13:45', title: 'Haircut' }]
  saveEvents(storage, events)
  assert.deepEqual(loadEvents(storage, fallback), events)
})

test('an empty saved list stays empty', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: '[]' })
  assert.deepEqual(loadEvents(storage, fallback), [])
})

test('loadEvents gives the fallback for unreadable or non-list data', () => {
  assert.equal(loadEvents(memoryStorage({ [STORAGE_KEY]: '{oops' }), fallback), fallback)
  assert.equal(loadEvents(memoryStorage({ [STORAGE_KEY]: '{"id":1}' }), fallback), fallback)
})
