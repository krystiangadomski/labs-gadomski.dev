<script>
  import RecipeArt from './RecipeArt.svelte'
  import { CATEGORY_LABELS, formatTime } from '../lib/recipes.js'

  /** @type {{ recipe: import('../lib/recipes.js').Recipe, onclose: () => void }} */
  let { recipe, onclose } = $props()

  /** @type {HTMLDialogElement | undefined} */
  let dialog = $state()

  $effect(() => {
    if (dialog && !dialog.open) dialog.showModal()
  })

  /** A click on the dimmed backdrop lands on the dialog element itself, not on its content. */
  function closeOnBackdrop(/** @type {MouseEvent} */ event) {
    if (event.target === dialog) dialog?.close()
  }
</script>

<dialog bind:this={dialog} aria-labelledby="recipe-title" {onclose} onclick={closeOnBackdrop}>
  <div class="panel">
    <header>
      <div class="art"><RecipeArt art={recipe.art} /></div>
      <div class="heading">
        <p class="category">{CATEGORY_LABELS[recipe.category]}</p>
        <h2 id="recipe-title">{recipe.title}</h2>
        <dl class="facts">
          <div><dt>Total time</dt><dd class="mono">{formatTime(recipe.minutes)}</dd></div>
          <div><dt>Difficulty</dt><dd>{recipe.difficulty}</dd></div>
          <div><dt>Serves</dt><dd class="mono">{recipe.serves}</dd></div>
        </dl>
      </div>
      <button type="button" class="close" aria-label="Close recipe" onclick={() => dialog?.close()}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      </button>
    </header>

    <div class="content">
      <section>
        <h3>Ingredients</h3>
        <ul class="ingredients">
          {#each recipe.ingredients as ingredient (ingredient)}
            <li>{ingredient}</li>
          {/each}
        </ul>
      </section>
      <section>
        <h3>Steps</h3>
        <ol class="steps">
          {#each recipe.steps as step, index (index)}
            <li><span class="number mono">{index + 1}</span><span>{step}</span></li>
          {/each}
        </ol>
      </section>
    </div>
  </div>
</dialog>

<style>
  dialog {
    margin: auto;
    width: min(1120px, calc(100vw - 64px));
    max-height: calc(100vh - 64px);
    background: var(--gd-graphite-800);
    color: var(--gd-paper);
    border: 1px solid var(--gd-graphite-600);
    border-radius: 18px;
  }

  dialog::backdrop {
    background: rgb(28 31 35 / 0.82);
  }

  .panel {
    padding: 32px 36px 36px;
    display: grid;
    gap: 28px;
  }

  header {
    display: grid;
    grid-template-columns: 240px 1fr auto;
    gap: 28px;
    align-items: center;
  }

  .art {
    aspect-ratio: 16 / 10;
    background: var(--gd-graphite-900);
    border-radius: 12px;
    padding: 10px;
  }

  .heading {
    display: grid;
    gap: 10px;
  }

  .category {
    color: var(--gd-steel);
    font-size: 19px;
    font-weight: 500;
  }

  h2 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 48px;
    line-height: 1;
    letter-spacing: -0.015em;
  }

  .facts {
    display: flex;
    gap: 36px;
    margin-top: 6px;
  }

  dt {
    color: var(--gd-steel);
    font-size: 17px;
  }

  dd {
    font-size: 22px;
    font-weight: 600;
  }

  .close {
    align-self: start;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: none;
    border: 1px solid var(--gd-graphite-600);
    border-radius: 999px;
  }

  .close:hover {
    border-color: var(--gd-steel);
  }

  .close svg {
    width: 22px;
    height: 22px;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1.7fr;
    gap: 36px;
    border-top: 1px solid var(--gd-graphite-600);
    padding-top: 24px;
  }

  h3 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 14px;
  }

  .ingredients {
    list-style: none;
    display: grid;
    gap: 2px;
  }

  .ingredients li {
    padding: 7px 0;
    border-bottom: 1px solid var(--gd-graphite-600);
    font-size: 20px;
  }

  .steps {
    list-style: none;
    display: grid;
    gap: 12px;
  }

  .steps li {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 12px;
    font-size: 20px;
    line-height: 1.4;
  }

  .number {
    color: var(--gd-steel);
    font-weight: 600;
  }
</style>
