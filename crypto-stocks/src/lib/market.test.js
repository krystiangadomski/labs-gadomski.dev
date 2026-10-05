import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  changePercent,
  direction,
  formatChange,
  formatUsd,
  downsample,
  chartLine,
  parseAmount,
  holdingValue,
  totalValue,
  rangeEnds,
} from './market.js'

test('changePercent compares the last value with the first', () => {
  assert.equal(changePercent([100, 90, 110]), 10)
  assert.equal(changePercent([200, 150]), -25)
  assert.equal(changePercent([5]), 0)
  assert.equal(changePercent([]), 0)
})

test('direction follows the change as shown, so -0.001% counts as flat', () => {
  assert.equal(direction(2.4), 'up')
  assert.equal(direction(-0.5), 'down')
  assert.equal(direction(-0.001), 'flat')
  assert.equal(direction(0), 'flat')
})

test('formatChange puts a triangle before the size of the change', () => {
  assert.equal(formatChange(2.414), '▲ 2.41%')
  assert.equal(formatChange(-1.936), '▼ 1.94%')
  assert.equal(formatChange(0.001), '0.00%')
})

test('formatUsd writes dollars with thousands separators and fixed decimals', () => {
  assert.equal(formatUsd(61284.5), '$61,284.50')
  assert.equal(formatUsd(0.58721, 4), '$0.5872')
  assert.equal(formatUsd(0), '$0.00')
})

test('downsample keeps the first and last point and the requested count', () => {
  const long = Array.from({ length: 300 }, (_, i) => i)
  const short = downsample(long, 100)
  assert.equal(short.length, 100)
  assert.equal(short[0], 0)
  assert.equal(short.at(-1), 299)
  assert.deepEqual(downsample([1, 2, 3], 100), [1, 2, 3])
})

test('chartLine draws left to right with the highest price at the top', () => {
  const { path, min, max } = chartLine([10, 30, 20], 200, 100)
  assert.equal(path, 'M0 100 L100 0 L200 50')
  assert.equal(min, 10)
  assert.equal(max, 30)
})

test('chartLine draws a flat series across the middle, and nothing for no data', () => {
  assert.equal(chartLine([5, 5], 100, 40).path, 'M0 20 L100 20')
  assert.equal(chartLine([], 100, 40).path, '')
})

test('parseAmount reads dots and commas and refuses anything else', () => {
  assert.equal(parseAmount('0.25'), 0.25)
  assert.equal(parseAmount(' 0,5 '), 0.5)
  assert.equal(parseAmount('2000'), 2000)
  assert.equal(parseAmount('.5'), 0.5)
  assert.equal(parseAmount(''), null)
  assert.equal(parseAmount('-1'), null)
  assert.equal(parseAmount('1.2.3'), null)
  assert.equal(parseAmount('abc'), null)
})

test('holdingValue multiplies the amount by the price; a bad amount is worth zero', () => {
  assert.equal(holdingValue('2', 1500), 3000)
  assert.equal(holdingValue('oops', 1500), 0)
})

test('totalValue adds up every holding and skips coins without a price', () => {
  const prices = { BTC: { price: 60000 }, ETH: { price: 2000 } }
  assert.equal(totalValue({ BTC: '0.5', ETH: '3', XRP: '100' }, prices), 36000)
  assert.equal(totalValue({}, prices), 0)
})

test('rangeEnds are relative, never dates', () => {
  assert.deepEqual(rangeEnds('24h'), ['24 hours ago', 'now'])
  assert.deepEqual(rangeEnds('30d'), ['30 days ago', 'now'])
})
