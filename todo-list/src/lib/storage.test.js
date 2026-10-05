import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STORAGE_KEY, loadTodos, saveTodos } from './storage.js'
import { seedTodos } from './seed.js'

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, value),
  }
}

const fallback = [{ id: 1, title: 'Fallback', done: false }]

test('loadTodos gives the fallback when nothing is saved', () => {
  assert.equal(loadTodos(memoryStorage(), fallback), fallback)
})

test('saveTodos then loadTodos gives the same list back', () => {
  const storage = memoryStorage()
  const todos = [{ id: 7, title: 'Fix the shelf', done: true }]
  saveTodos(storage, todos)
  assert.deepEqual(loadTodos(storage, fallback), todos)
})

test('an empty saved list stays empty', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: '[]' })
  assert.deepEqual(loadTodos(storage, fallback), [])
})

test('loadTodos gives the fallback for unreadable or non-list data', () => {
  assert.equal(loadTodos(memoryStorage({ [STORAGE_KEY]: '{oops' }), fallback), fallback)
  assert.equal(loadTodos(memoryStorage({ [STORAGE_KEY]: '{"id":1}' }), fallback), fallback)
})

test('the seed has six todos with unique ids, two of them done', () => {
  assert.equal(seedTodos.length, 6)
  assert.equal(new Set(seedTodos.map((todo) => todo.id)).size, 6)
  assert.equal(seedTodos.filter((todo) => todo.done).length, 2)
})
