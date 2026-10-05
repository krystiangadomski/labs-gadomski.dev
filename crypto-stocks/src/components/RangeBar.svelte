<script>
  import { RANGES } from '../lib/coins.js'

  /** @type {{ range: import('../lib/coins.js').Range, onchange: (range: import('../lib/coins.js').Range) => void }} */
  let { range, onchange } = $props()
</script>

<nav class="ranges" aria-label="Chart range">
  {#each RANGES as option (option)}
    <button
      type="button"
      class="mono"
      class:selected={option === range}
      aria-pressed={option === range}
      onclick={() => onchange(option)}
    >
      {option}
    </button>
  {/each}
</nav>

<style>
  .ranges {
    display: flex;
    gap: 28px;
  }

  button {
    padding: 4px 2px 6px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--gd-steel);
    font-size: 26px;
    font-weight: 500;
  }

  button:hover {
    color: var(--gd-paper);
  }

  button.selected {
    color: var(--gd-paper);
    font-weight: 600;
    border-bottom-color: var(--gd-circuit);
  }
</style>
