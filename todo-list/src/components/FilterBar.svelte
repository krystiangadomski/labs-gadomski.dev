<script>
  import { FILTERS } from '../lib/todos.js'

  /** @type {{ filter: import('../lib/todos.js').Filter, onchange: (filter: import('../lib/todos.js').Filter) => void }} */
  let { filter, onchange } = $props()

  const labels = { all: 'All', active: 'Active', done: 'Done' }
</script>

<nav class="filters" aria-label="Filter todos">
  {#each FILTERS as option (option)}
    <button
      type="button"
      class:selected={option === filter}
      aria-pressed={option === filter}
      onclick={() => onchange(option)}
    >
      {labels[option]}
    </button>
  {/each}
</nav>

<style>
  .filters {
    display: flex;
    gap: 8px;
  }

  button {
    padding: 6px 4px 8px;
    margin-right: 20px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--gd-slate);
    font-size: 22px;
    font-weight: 500;
  }

  button:hover {
    color: var(--gd-ink);
  }

  button.selected {
    color: var(--gd-ink);
    font-weight: 600;
    border-bottom-color: var(--gd-signal);
  }
</style>
