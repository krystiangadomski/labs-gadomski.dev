import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COINS, coinBySymbol } from './coins.js'
import { pricesUrl, chartUrl, parsePrices, parseChart, loadLive, sourceLabel } from './live.js'

const pricesJson = {
  bitcoin: { usd: 100, usd_24h_change: 1.5 },
  ripple: { usd: 0.5, usd_24h_change: -2 },
  ethereum: { usd: 10, usd_24h_change: 0 },
}
const chartJson = { prices: [[1, 98], [2, 99], [3, 100]] }

/** A stand-in for fetch that answers by URL. */
function fakeFetch(answers) {
  return async (url) => {
    const hit = Object.entries(answers).find(([part]) => url.includes(part))
    if (!hit) throw new Error('offline')
    const [, body] = hit
    return { ok: body !== 'error', status: body === 'error' ? 429 : 200, json: async () => body }
  }
}

test('pricesUrl asks for all three coins in dollars with the 24h change', () => {
  assert.equal(
    pricesUrl(COINS),
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ripple,ethereum&vs_currencies=usd&include_24hr_change=true',
  )
})

test('chartUrl maps the range to days', () => {
  assert.ok(chartUrl(coinBySymbol('XRP'), '24h').endsWith('/coins/ripple/market_chart?vs_currency=usd&days=1'))
  assert.ok(chartUrl(coinBySymbol('BTC'), '30d').endsWith('days=30'))
})

test('parsePrices reads price and change per symbol', () => {
  assert.deepEqual(parsePrices(pricesJson, COINS).XRP, { price: 0.5, change: -2 })
})

test('parsePrices refuses an answer missing any coin', () => {
  assert.throws(() => parsePrices({ bitcoin: pricesJson.bitcoin }, COINS))
  assert.throws(() => parsePrices(null, COINS))
})

test('parseChart takes the price values and refuses too few points', () => {
  assert.deepEqual(parseChart(chartJson), [98, 99, 100])
  assert.throws(() => parseChart({ prices: [[1, 5]] }))
  assert.throws(() => parseChart({}))
})

test('loadLive returns prices and the chart series', async () => {
  const fetchFn = fakeFetch({ simple: pricesJson, market_chart: chartJson })
  const live = await loadLive(fetchFn, COINS, coinBySymbol('BTC'), '7d')
  assert.equal(live.prices.BTC.price, 100)
  assert.deepEqual(live.series, [98, 99, 100])
})

test('loadLive rejects when offline or when the API answers with an error', async () => {
  await assert.rejects(loadLive(fakeFetch({}), COINS, coinBySymbol('BTC'), '24h'))
  const limited = fakeFetch({ simple: 'error', market_chart: chartJson })
  await assert.rejects(loadLive(limited, COINS, coinBySymbol('BTC'), '24h'), /429/)
})

test('sourceLabel says sample data unless live data has arrived', () => {
  assert.deepEqual(sourceLabel('off', false), { sample: true, text: 'Sample data · not live prices' })
  assert.deepEqual(sourceLabel('loading', false), { sample: true, text: 'Sample data · connecting' })
  assert.deepEqual(sourceLabel('failed', true), { sample: true, text: 'Sample data · live unavailable' })
  assert.deepEqual(sourceLabel('ready', true), { sample: false, text: 'Live · CoinGecko' })
  assert.deepEqual(sourceLabel('loading', true), { sample: false, text: 'Live · CoinGecko · updating' })
})
