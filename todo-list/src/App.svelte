<script>
  import NewTodo from './components/NewTodo.svelte'
  import FilterBar from './components/FilterBar.svelte'
  import TodoItem from './components/TodoItem.svelte'
  import { addTodo, toggleTodo, removeTodo, filterTodos, countLeft, leftLabel } from './lib/todos.js'
  import { loadTodos, saveTodos } from './lib/storage.js'
  import { seedTodos } from './lib/seed.js'
  import wordmark from './assets/wordmark-mono-ink.svg'

  let todos = $state(loadTodos(localStorage, seedTodos))
  /** @type {import('./lib/todos.js').Filter} */
  let filter = $state('all')

  const visible = $derived(filterTodos(todos, filter))
  const left = $derived(countLeft(todos))

  $effect(() => {
    saveTodos(localStorage, todos)
  })
</script>

<div class="page">
  <header>
    <img class="wordmark" src={wordmark} alt="Gadomski.DEV" />
    <div class="heading">
      <h1>Todos</h1>
      <p class="left mono" aria-live="polite">{leftLabel(left)}</p>
    </div>
  </header>

  <NewTodo onadd={(title) => (todos = addTodo(todos, title))} />

  <FilterBar {filter} onchange={(next) => (filter = next)} />

  {#if visible.length > 0}
    <ul class="list">
      {#each visible as todo (todo.id)}
        <TodoItem
          {todo}
          ontoggle={(id) => (todos = toggleTodo(todos, id))}
          ondelete={(id) => (todos = removeTodo(todos, id))}
        />
      {/each}
    </ul>
  {:else}
    <p class="empty">Nothing here.</p>
  {/if}
</div>

<style>
  .page {
    max-width: 780px;
    margin: 0 auto;
    padding: 40px 32px;
    display: grid;
    gap: 24px;
  }

  header {
    display: grid;
    gap: 28px;
    margin-bottom: 8px;
  }

  .wordmark {
    height: 22px;
    width: auto;
    justify-self: start;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 24px;
  }

  h1 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 64px;
    line-height: 1;
    letter-spacing: -0.015em;
  }

  .left {
    font-size: 28px;
    font-weight: 500;
  }

  .list {
    list-style: none;
    background: var(--gd-paper);
    border: 1px solid var(--gd-fog);
    border-radius: 12px;
    overflow: hidden;
  }

  .empty {
    padding: 24px;
    background: var(--gd-paper);
    border: 1px solid var(--gd-fog);
    border-radius: 12px;
    color: var(--gd-slate);
  }
</style>
