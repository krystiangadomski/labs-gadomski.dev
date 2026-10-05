import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COINS, RANGES, coinBySymbol } from './coins.js'

test('the app tracks exactly Bitcoin, XRP and Ethereum, in that order', () => {
  assert.deepEqual(
    COINS.map((coin) => coin.symbol),
    ['BTC', 'XRP', 'ETH'],
  )
})

test('the ranges are 24h, 7d and 30d, in that order', () => {
  assert.deepEqual(RANGES, ['24h', '7d', '30d'])
})

test('coinBySymbol finds a coin and refuses an unknown one', () => {
  assert.equal(coinBySymbol('ETH').name, 'Ethereum')
  assert.throws(() => coinBySymbol(/** @type {any} */ ('DOGE')))
})
