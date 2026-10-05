<script>
  /** @type {{ query: string, oninput: (query: string) => void }} */
  let { query, oninput } = $props()
</script>

<div class="search">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2" />
    <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
  <input
    type="search"
    placeholder="Search recipes or ingredients"
    aria-label="Search recipes or ingredients"
    value={query}
    oninput={(event) => oninput(event.currentTarget.value)}
  />
</div>

<style>
  .search {
    position: relative;
    width: 420px;
    max-width: 100%;
  }

  .icon {
    position: absolute;
    left: 18px;
    top: 50%;
    width: 22px;
    height: 22px;
    transform: translateY(-50%);
    color: var(--gd-steel);
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 11px 18px 12px 52px;
    background: var(--gd-graphite-900);
    border: 1px solid var(--gd-graphite-600);
    border-radius: 999px;
    font-size: 21px;
  }

  /* Chromium's own clear button is blue, a second accent; hide it. */
  input::-webkit-search-cancel-button {
    appearance: none;
  }

  input::placeholder {
    color: var(--gd-steel);
  }

  input:focus {
    outline: none;
    border-color: var(--gd-blueprint);
  }
</style>
