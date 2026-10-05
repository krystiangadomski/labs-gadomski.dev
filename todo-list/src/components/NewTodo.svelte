<script>
  /** @type {{ onadd: (title: string) => void }} */
  let { onadd } = $props()

  let title = $state('')

  /** @param {SubmitEvent} event */
  function submit(event) {
    event.preventDefault()
    if (title.trim() === '') return
    onadd(title)
    title = ''
  }
</script>

<form class="new-todo" onsubmit={submit}>
  <input
    type="text"
    bind:value={title}
    placeholder="What needs doing?"
    aria-label="New todo"
    autocomplete="off"
  />
  <button type="submit">Add</button>
</form>

<style>
  .new-todo {
    display: flex;
    gap: 12px;
  }

  input {
    flex: 1;
    min-width: 0;
    height: 64px;
    padding: 0 22px;
    background: var(--gd-paper);
    border: 1px solid var(--gd-fog);
    border-radius: 12px;
    font-size: 24px;
  }

  input::placeholder {
    color: var(--gd-slate);
  }

  input:focus {
    outline: none;
    border-color: var(--gd-ink);
  }

  button {
    height: 64px;
    padding: 0 30px;
    background: var(--gd-ink);
    color: var(--gd-paper);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 22px;
  }
</style>
