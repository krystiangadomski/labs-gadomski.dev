<script>
  import { formatUsd, holdingValue, parseAmount, totalValue } from '../lib/market.js'

  /**
   * @type {{
   *   coins: import('../lib/coins.js').Coin[],
   *   holdings: Record<string, string>,
   *   prices: Record<string, { price: number }>,
   *   sample: boolean,
   *   onchange: (symbol: string, amount: string) => void,
   * }}
   */
  let { coins, holdings, prices, sample, onchange } = $props()

  const total = $derived(totalValue(holdings, prices))
</script>

<section class="holdings" aria-label="Holdings">
  <header>
    <h2>Holdings</h2>
    <p class="basis">at {sample ? 'sample' : 'live'} prices</p>
  </header>

  {#each coins as coin (coin.symbol)}
    {@const amount = holdings[coin.symbol] ?? ''}
    <label class="row">
      <span class="symbol">{coin.symbol}</span>
      <input
        class="mono"
        type="text"
        inputmode="decimal"
        autocomplete="off"
        value={amount}
        aria-invalid={amount.trim() !== '' && parseAmount(amount) === null}
        aria-label="{coin.name} amount"
        placeholder="0"
        oninput={(event) => onchange(coin.symbol, event.currentTarget.value)}
      />
      <span class="value mono">{formatUsd(holdingValue(amount, prices[coin.symbol].price))}</span>
    </label>
  {/each}

  <p class="total">
    <span>Total</span>
    <span class="mono sum" aria-live="polite">{formatUsd(total)}</span>
  </p>
</section>

<style>
  .holdings {
    display: grid;
    gap: 10px;
    padding: 20px 24px;
    background: var(--gd-graphite-700);
    border: 1px solid var(--gd-graphite-600);
    border-radius: 12px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }

  h2 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 30px;
    line-height: 1.1;
  }

  /* Steel on Graphite Raised is 4.02:1: 24 px and up only. */
  .basis {
    color: var(--gd-steel);
    font-size: 24px;
  }

  .row {
    display: grid;
    grid-template-columns: 64px 1fr 190px;
    align-items: center;
    gap: 16px;
  }

  .symbol {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 26px;
  }

  input {
    width: 100%;
    min-width: 0;
    height: 52px;
    padding: 0 16px;
    background: var(--gd-graphite-900);
    border: 1px solid var(--gd-graphite-600);
    border-radius: 10px;
    font-size: 24px;
  }

  input::placeholder {
    color: var(--gd-steel);
  }

  input:focus {
    outline: none;
    border-color: var(--gd-paper);
  }

  input[aria-invalid='true'] {
    border-style: dashed;
    border-color: var(--gd-steel);
  }

  .value {
    text-align: right;
    font-size: 24px;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 6px;
    padding-top: 12px;
    border-top: 1px solid var(--gd-graphite-600);
    font-size: 24px;
    color: var(--gd-steel);
  }

  .sum {
    color: var(--gd-paper);
    font-size: 32px;
    font-weight: 500;
  }
</style>
