<script>
  import RangeBar from './RangeBar.svelte'
  import { chartLine, changePercent, direction, downsample, formatChange, formatUsd, rangeEnds } from '../lib/market.js'

  /**
   * @type {{
   *   coin: import('../lib/coins.js').Coin,
   *   series: readonly number[],
   *   range: import('../lib/coins.js').Range,
   *   sample: boolean,
   *   onrange: (range: import('../lib/coins.js').Range) => void,
   * }}
   */
  let { coin, series, range, sample, onrange } = $props()

  const WIDTH = 1000
  const HEIGHT = 400

  const points = $derived(downsample(series, 120))
  const line = $derived(chartLine(points, WIDTH, HEIGHT))
  const change = $derived(changePercent(series))
  const ends = $derived(rangeEnds(range))
  const last = $derived(series.at(-1) ?? 0)
  const description = $derived(
    `${coin.name} price over ${range}, ${sample ? 'sample data' : 'live data'}, from ${formatUsd(series[0] ?? 0, coin.decimals)} to ${formatUsd(last, coin.decimals)}`,
  )
</script>

<section class="chart" aria-label="{coin.name} chart">
  <header>
    <div class="title">
      <h2>{coin.name}{#if coin.name !== coin.symbol}<span class="ticker">{coin.symbol}</span>{/if}</h2>
      <p class="mono now">
        <span class="price">{formatUsd(last, coin.decimals)}</span>
        <span class="change {direction(change)}">{formatChange(change)}</span>
        <span class="over">over {range}</span>
      </p>
    </div>
    <RangeBar {range} onchange={onrange} />
  </header>

  <div class="plot">
    <div class="area">
      <svg viewBox="0 0 {WIDTH} {HEIGHT}" preserveAspectRatio="none" role="img" aria-label={description}>
        <line x1="0" y1="0" x2={WIDTH} y2="0" />
        <line x1="0" y1={HEIGHT / 2} x2={WIDTH} y2={HEIGHT / 2} />
        <line x1="0" y1={HEIGHT} x2={WIDTH} y2={HEIGHT} />
        <path d={line.path} />
      </svg>
    </div>
    <div class="axis mono" aria-hidden="true">
      <span style="top: 0%">{formatUsd(line.max, coin.decimals)}</span>
      <span style="top: 50%">{formatUsd((line.max + line.min) / 2, coin.decimals)}</span>
      <span style="top: 100%">{formatUsd(line.min, coin.decimals)}</span>
    </div>
    <footer class="mono">
      <span>{ends[0]}</span>
      {#if sample}<span class="source">Sample data</span>{/if}
      <span>{ends[1]}</span>
    </footer>
  </div>
</section>

<style>
  .chart {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 20px;
    padding: 24px 28px 20px;
    background: var(--gd-graphite-700);
    border: 1px solid var(--gd-graphite-600);
    border-radius: 12px;
    min-height: 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }

  h2 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 40px;
    line-height: 1.05;
  }

  .ticker {
    color: var(--gd-steel);
    font-weight: 600;
    font-size: 30px;
    margin-left: 14px;
  }

  .now {
    white-space: nowrap;
    display: flex;
    align-items: baseline;
    gap: 18px;
    margin-top: 10px;
  }

  .price {
    font-size: 44px;
    font-weight: 500;
    line-height: 1.1;
  }

  .change {
    font-size: 28px;
  }

  .change.down,
  .change.flat,
  .over {
    color: var(--gd-steel);
  }

  .over {
    font-size: 24px;
  }

  .plot {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    column-gap: 20px;
    row-gap: 36px;
    padding-top: 18px;
    min-height: 260px;
  }

  .area {
    position: relative;
  }

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  line {
    stroke: var(--gd-graphite-600);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  path {
    fill: none;
    stroke: var(--gd-circuit);
    stroke-width: 3;
    stroke-linejoin: round;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  /* Axis text is Steel on Graphite Raised (4.02:1), so it stays at 24 px. */
  .axis {
    position: relative;
    min-width: 9ch;
    font-size: 24px;
    color: var(--gd-steel);
  }

  .axis span {
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    white-space: nowrap;
  }

  footer {
    grid-column: 1;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    color: var(--gd-steel);
  }

  .source {
    color: var(--gd-paper);
  }
</style>
