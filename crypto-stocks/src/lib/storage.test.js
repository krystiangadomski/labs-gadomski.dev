import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STORAGE_KEY, SEED_HOLDINGS, loadHoldings, saveHoldings } from './storage.js'

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, value),
  }
}

const symbols = ['BTC', 'XRP', 'ETH']

test('loadHoldings gives a copy of the fallback when nothing is saved', () => {
  const holdings = loadHoldings(memoryStorage(), symbols, SEED_HOLDINGS)
  assert.deepEqual(holdings, SEED_HOLDINGS)
  assert.notEqual(holdings, SEED_HOLDINGS)
})

test('saveHoldings then loadHoldings gives the same amounts back', () => {
  const storage = memoryStorage()
  saveHoldings(storage, { BTC: '0.1', XRP: '', ETH: '4,5' })
  assert.deepEqual(loadHoldings(storage, symbols, SEED_HOLDINGS), { BTC: '0.1', XRP: '', ETH: '4,5' })
})

test('loadHoldings fills a missing coin with an empty amount and drops unknown ones', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: '{"BTC":"1","DOGE":"9"}' })
  assert.deepEqual(loadHoldings(storage, symbols, SEED_HOLDINGS), { BTC: '1', XRP: '', ETH: '' })
})

test('loadHoldings gives the fallback for unreadable or non-object data', () => {
  for (const bad of ['{oops', '[1,2]', 'null', '7']) {
    assert.deepEqual(loadHoldings(memoryStorage({ [STORAGE_KEY]: bad }), symbols, SEED_HOLDINGS), SEED_HOLDINGS)
  }
})
