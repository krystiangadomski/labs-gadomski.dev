<script>
  import { FILTERS, FILTER_LABELS } from '../lib/gallery.js'

  /**
   * @type {{
   *   filter: import('../lib/gallery.js').Filter,
   *   counts: Record<import('../lib/gallery.js').Filter, number>,
   *   onchange: (filter: import('../lib/gallery.js').Filter) => void,
   * }}
   */
  let { filter, counts, onchange } = $props()
</script>

<nav class="albums" aria-label="Albums">
  {#each FILTERS as option (option)}
    <button
      type="button"
      class:selected={option === filter}
      aria-pressed={option === filter}
      onclick={() => onchange(option)}
    >
      <span class="label" class:highlight={option === filter}>{FILTER_LABELS[option]}</span>
      <span class="count mono">{counts[option]}</span>
    </button>
  {/each}
</nav>

<style>
  .albums {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 28px;
  }

  button {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 4px 0;
    background: none;
    border: none;
    color: var(--gd-slate);
    font-size: 24px;
    font-weight: 500;
  }

  .label {
    padding: 2px 8px;
    margin: 0 -8px;
  }

  .selected .label {
    margin: 0;
  }

  button:hover {
    color: var(--gd-ink);
  }

  button.selected {
    color: var(--gd-ink);
    font-weight: 600;
  }

  .count {
    font-size: 18px;
    color: var(--gd-slate);
    font-weight: 500;
  }
</style>
