import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COINS, RANGES } from './coins.js'
import { SAMPLE_POINTS, sampleSeries, samplePrices } from './sample.js'
import { changePercent } from './market.js'

const symbols = COINS.map((coin) => coin.symbol)

test('every coin has a series for every range with the planned number of points', () => {
  for (const symbol of symbols) {
    for (const range of RANGES) {
      assert.equal(sampleSeries(symbol, range).length, SAMPLE_POINTS[range], `${symbol} ${range}`)
    }
  }
})

test('the sample data is the same on every call, so it never looks live', () => {
  const first = [...sampleSeries('BTC', '7d')]
  assert.deepEqual([...sampleSeries('BTC', '7d')], first)
})

test('every range of a coin ends on the same last price', () => {
  for (const symbol of symbols) {
    const ends = RANGES.map((range) => sampleSeries(symbol, range).at(-1))
    assert.equal(new Set(ends).size, 1, symbol)
  }
})

test('all sample prices are positive numbers', () => {
  for (const symbol of symbols) {
    for (const range of RANGES) {
      assert.ok(sampleSeries(symbol, range).every((v) => Number.isFinite(v) && v > 0))
    }
  }
})

test('the sample shows both directions: Bitcoin up and XRP down over 24h', () => {
  assert.ok(changePercent(sampleSeries('BTC', '24h')) > 0)
  assert.ok(changePercent(sampleSeries('XRP', '24h')) < 0)
})

test('the series cannot be changed by the screen', () => {
  assert.throws(() => {
    /** @type {any} */ (sampleSeries('ETH', '24h'))[0] = 1
  })
})

test('samplePrices gives the last price and the 24h change per coin', () => {
  const prices = samplePrices(symbols)
  assert.deepEqual(Object.keys(prices), symbols)
  assert.equal(prices.BTC.price, sampleSeries('BTC', '24h').at(-1))
  assert.equal(prices.XRP.change.toFixed(2), '-1.94')
})
