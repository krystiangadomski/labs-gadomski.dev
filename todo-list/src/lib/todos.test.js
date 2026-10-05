import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FILTERS,
  nextId,
  addTodo,
  toggleTodo,
  removeTodo,
  filterTodos,
  countLeft,
  leftLabel,
} from './todos.js'

const sample = () => [
  { id: 1, title: 'Buy bread', done: false },
  { id: 2, title: 'Water the plants', done: true },
  { id: 4, title: 'Call the dentist', done: false },
]

test('the filters are all, active and done, in that order', () => {
  assert.deepEqual(FILTERS, ['all', 'active', 'done'])
})

test('nextId is one more than the highest id', () => {
  assert.equal(nextId(sample()), 5)
  assert.equal(nextId([]), 1)
})

test('addTodo adds a trimmed, not-done todo at the end', () => {
  const todos = addTodo(sample(), '  Pay the gas bill  ')
  assert.equal(todos.length, 4)
  assert.deepEqual(todos.at(-1), { id: 5, title: 'Pay the gas bill', done: false })
})

test('addTodo ignores a blank title', () => {
  const before = sample()
  assert.equal(addTodo(before, '   '), before)
})

test('addTodo leaves the original list untouched', () => {
  const before = sample()
  addTodo(before, 'Something')
  assert.equal(before.length, 3)
})

test('toggleTodo flips only the todo with that id', () => {
  const todos = toggleTodo(sample(), 1)
  assert.equal(todos[0].done, true)
  assert.equal(todos[1].done, true)
  assert.equal(todos[2].done, false)
})

test('toggleTodo twice puts the todo back', () => {
  const todos = toggleTodo(toggleTodo(sample(), 2), 2)
  assert.deepEqual(todos, sample())
})

test('toggleTodo does not change the todo object it was given', () => {
  const before = sample()
  toggleTodo(before, 1)
  assert.equal(before[0].done, false)
})

test('removeTodo removes only the todo with that id', () => {
  const todos = removeTodo(sample(), 2)
  assert.deepEqual(
    todos.map((todo) => todo.id),
    [1, 4],
  )
})

test('filterTodos shows all, active or done todos', () => {
  assert.equal(filterTodos(sample(), 'all').length, 3)
  assert.deepEqual(
    filterTodos(sample(), 'active').map((todo) => todo.id),
    [1, 4],
  )
  assert.deepEqual(
    filterTodos(sample(), 'done').map((todo) => todo.id),
    [2],
  )
})

test('countLeft counts the todos not done', () => {
  assert.equal(countLeft(sample()), 2)
  assert.equal(countLeft(toggleTodo(sample(), 1)), 1)
  assert.equal(countLeft([]), 0)
})

test('leftLabel reads "N left", or "Nothing left" at zero', () => {
  assert.equal(leftLabel(3), '3 left')
  assert.equal(leftLabel(1), '1 left')
  assert.equal(leftLabel(0), 'Nothing left')
})
