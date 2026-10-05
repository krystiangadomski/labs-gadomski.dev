<script>
  import { CATEGORIES, CATEGORY_LABELS } from '../lib/recipes.js'

  /** @type {{
   *   category: import('../lib/recipes.js').CategoryFilter,
   *   counts: Record<import('../lib/recipes.js').CategoryFilter, number>,
   *   onchange: (category: import('../lib/recipes.js').CategoryFilter) => void,
   * }} */
  let { category, counts, onchange } = $props()
</script>

<nav class="filters" aria-label="Filter by category">
  {#each CATEGORIES as option (option)}
    <button
      type="button"
      class:selected={option === category}
      aria-pressed={option === category}
      onclick={() => onchange(option)}
    >
      {CATEGORY_LABELS[option]}
      <span class="count mono">{counts[option]}</span>
    </button>
  {/each}
</nav>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  button {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    padding: 9px 20px 10px;
    background: none;
    border: 1px solid var(--gd-graphite-600);
    border-radius: 999px;
    font-size: 21px;
    font-weight: 500;
  }

  button:hover {
    border-color: var(--gd-steel);
  }

  .count {
    font-size: 17px;
    color: var(--gd-steel);
  }

  button.selected {
    background: var(--gd-blueprint);
    border-color: var(--gd-blueprint);
    color: var(--gd-graphite-900);
    font-weight: 600;
  }

  button.selected .count {
    color: var(--gd-graphite-900);
  }
</style>
