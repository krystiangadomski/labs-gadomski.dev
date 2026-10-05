<script>
  import { direction, formatChange, formatUsd } from '../lib/market.js'

  /**
   * @type {{
   *   coins: import('../lib/coins.js').Coin[],
   *   prices: Record<string, { price: number, change: number }>,
   *   selected: import('../lib/coins.js').Symbol,
   *   onselect: (symbol: import('../lib/coins.js').Symbol) => void,
   * }}
   */
  let { coins, prices, selected, onselect } = $props()
</script>

<ul class="watchlist" aria-label="Watchlist">
  {#each coins as coin (coin.symbol)}
    {@const quote = prices[coin.symbol]}
    <li>
      <button
        type="button"
        class:selected={coin.symbol === selected}
        aria-pressed={coin.symbol === selected}
        onclick={() => onselect(coin.symbol)}
      >
        <span class="who">
          <span class="symbol">{coin.symbol}</span>
          {#if coin.name !== coin.symbol}<span class="name">{coin.name}</span>{/if}
        </span>
        <span class="quote mono">
          <span class="price">{formatUsd(quote.price, coin.decimals)}</span>
          <span class="change {direction(quote.change)}">{formatChange(quote.change)}</span>
        </span>
      </button>
    </li>
  {/each}
</ul>

<style>
  /* Rows share the height the column leaves over, so on a tall screen the card meets the chart. */
  .watchlist {
    display: flex;
    flex-direction: column;
    list-style: none;
    background: var(--gd-graphite-700);
    border: 1px solid var(--gd-graphite-600);
    border-radius: 12px;
    overflow: hidden;
  }

  li {
    flex: 1;
    display: flex;
  }

  li + li {
    border-top: 1px solid var(--gd-graphite-600);
  }

  button {
    width: 100%;
    min-height: 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 14px 24px 14px 18px;
    background: none;
    border: none;
    border-left: 6px solid transparent;
    text-align: left;
  }

  button.selected {
    border-left-color: var(--gd-circuit);
  }

  .who,
  .quote {
    display: grid;
  }

  .quote {
    justify-items: end;
  }

  .symbol {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 34px;
    line-height: 1.05;
  }

  /* Steel on Graphite Raised is 4.02:1, so Steel text here stays at 24 px or more (large text). */
  .name {
    color: var(--gd-steel);
    font-size: 24px;
    line-height: 1.2;
  }

  .price {
    font-size: 30px;
    font-weight: 500;
    line-height: 1.15;
  }

  .change {
    font-size: 24px;
    line-height: 1.2;
  }

  .change.down,
  .change.flat {
    color: var(--gd-steel);
  }
</style>
