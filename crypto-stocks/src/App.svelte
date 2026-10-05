<script>
  import Watchlist from './components/Watchlist.svelte'
  import PriceChart from './components/PriceChart.svelte'
  import Holdings from './components/Holdings.svelte'
  import LiveSwitch from './components/LiveSwitch.svelte'
  import { COINS, coinBySymbol } from './lib/coins.js'
  import { sampleSeries, samplePrices } from './lib/sample.js'
  import { loadHoldings, saveHoldings, SEED_HOLDINGS } from './lib/storage.js'
  import { loadLive, sourceLabel } from './lib/live.js'
  import wordmark from './assets/wordmark-mono-paper.svg'

  const symbols = COINS.map((coin) => coin.symbol)
  const sampleQuotes = samplePrices(symbols)

  /** @type {import('./lib/coins.js').Symbol} */
  let selected = $state('BTC')
  /** @type {import('./lib/coins.js').Range} */
  let range = $state('24h')
  let holdings = $state(loadHoldings(localStorage, symbols, SEED_HOLDINGS))

  // Live mode: off by default. Any failure shows sample data again.
  let live = $state(false)
  /** @type {import('./lib/live.js').LiveStatus} */
  let status = $state('off')
  /** @type {{ prices: Record<string, { price: number, change: number }>, series: number[] } | null} */
  let liveData = $state(null)
  let request = 0

  const coin = $derived(coinBySymbol(selected))
  const source = $derived(sourceLabel(status, liveData !== null))
  const prices = $derived(source.sample || !liveData ? sampleQuotes : liveData.prices)
  const series = $derived(source.sample || !liveData ? sampleSeries(selected, range) : liveData.series)

  $effect(() => {
    saveHoldings(localStorage, holdings)
  })

  $effect(() => {
    if (!live) {
      request++
      status = 'off'
      liveData = null
      return
    }
    const id = ++request
    status = 'loading'
    loadLive((url, init) => fetch(url, init), COINS, coin, range).then(
      (data) => {
        if (id !== request) return
        liveData = data
        status = 'ready'
      },
      () => {
        if (id === request) status = 'failed'
      },
    )
  })
</script>

<div class="page">
  <header>
    <img class="wordmark" src={wordmark} alt="Gadomski.DEV" />
    <div class="heading">
      <h1>Crypto Stocks</h1>
      <div class="controls">
        <p class="source" class:sample={source.sample} aria-live="polite">{source.text}</p>
        <LiveSwitch on={live} ontoggle={() => (live = !live)} />
      </div>
    </div>
  </header>

  <main>
    <div class="side">
      <Watchlist coins={COINS} {prices} {selected} onselect={(symbol) => (selected = symbol)} />
      <Holdings
        coins={COINS}
        {holdings}
        {prices}
        sample={source.sample}
        onchange={(symbol, amount) => (holdings = { ...holdings, [symbol]: amount })}
      />
    </div>
    <PriceChart {coin} {series} {range} sample={source.sample} onrange={(next) => (range = next)} />
  </main>
</div>

<style>
  .page {
    max-width: 1440px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 32px 32px;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 24px;
  }

  header {
    display: grid;
    gap: 22px;
  }

  .wordmark {
    height: 22px;
    width: auto;
    justify-self: start;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  h1 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 56px;
    line-height: 1;
    letter-spacing: -0.015em;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .source {
    padding: 6px 16px;
    border: 1px solid var(--gd-graphite-600);
    border-radius: 999px;
    font-size: 22px;
    font-weight: 500;
  }

  .source.sample {
    border: 2px solid var(--gd-paper);
  }

  main {
    display: grid;
    grid-template-columns: 540px minmax(0, 1fr);
    gap: 24px;
    min-height: 0;
  }

  .side {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 24px;
  }
</style>
