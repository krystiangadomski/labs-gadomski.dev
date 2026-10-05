<script>
  /**
   * @type {{
   *   todo: import('../lib/todos.js').Todo,
   *   ontoggle: (id: number) => void,
   *   ondelete: (id: number) => void,
   * }}
   */
  let { todo, ontoggle, ondelete } = $props()
</script>

<li class="todo" class:done={todo.done}>
  <label class="check">
    <input type="checkbox" checked={todo.done} onchange={() => ontoggle(todo.id)} />
    <span class="box" aria-hidden="true"></span>
    <span class="title">{todo.title}</span>
  </label>
  <button type="button" class="delete" aria-label={`Delete ${todo.title}`} onclick={() => ondelete(todo.id)}>
    Delete
  </button>
</li>

<style>
  .todo {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 16px 0 24px;
    min-height: 64px;
    border-bottom: 1px solid var(--gd-fog);
  }

  .todo:last-child {
    border-bottom: none;
  }

  .check {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 0;
    cursor: pointer;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  .box {
    flex: none;
    width: 28px;
    height: 28px;
    border: 2px solid var(--gd-ink);
    border-radius: 7px;
    display: grid;
    place-items: center;
  }

  input:focus-visible + .box {
    outline: 2px solid var(--gd-ink);
    outline-offset: 3px;
  }

  .done .box {
    background: var(--gd-ink);
  }

  .done .box::after {
    content: '';
    width: 7px;
    height: 13px;
    border: solid var(--gd-paper);
    border-width: 0 3px 3px 0;
    transform: translateY(-2px) rotate(45deg);
  }

  .title {
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: 24px;
  }

  .done .title {
    color: var(--gd-slate);
    text-decoration: line-through;
    text-decoration-thickness: 2px;
  }

  .delete {
    flex: none;
    padding: 8px 12px;
    background: none;
    border: none;
    border-radius: 8px;
    color: var(--gd-slate);
    font-size: 18px;
  }

  .delete:hover {
    background: var(--gd-mist);
    color: var(--gd-ink);
  }
</style>
