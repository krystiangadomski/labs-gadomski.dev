<script>
  import CategoryFilter from './components/CategoryFilter.svelte'
  import SearchBox from './components/SearchBox.svelte'
  import RecipeTile from './components/RecipeTile.svelte'
  import RecipeDetail from './components/RecipeDetail.svelte'
  import { filterRecipes, countByCategory, countLabel, findRecipe } from './lib/recipes.js'
  import { seedRecipes } from './lib/seed.js'
  import wordmark from './assets/wordmark-mono-paper.svg'

  const recipes = seedRecipes

  /** @type {import('./lib/recipes.js').CategoryFilter} */
  let category = $state('all')
  let query = $state('')
  /** @type {number | null} */
  let openId = $state(null)

  const visible = $derived(filterRecipes(recipes, { category, query }))
  const counts = $derived(countByCategory(recipes, query))
  const open = $derived(findRecipe(recipes, openId))
</script>

<div class="page">
  <header>
    <img class="wordmark" src={wordmark} alt="Gadomski.DEV" />
    <div class="heading">
      <h1>Recipes</h1>
      <p class="count mono" aria-live="polite">{countLabel(visible.length)}</p>
    </div>
  </header>

  <div class="toolbar">
    <CategoryFilter {category} {counts} onchange={(next) => (category = next)} />
    <SearchBox {query} oninput={(next) => (query = next)} />
  </div>

  {#if visible.length > 0}
    <ul class="grid">
      {#each visible as recipe (recipe.id)}
        <RecipeTile {recipe} active={recipe.id === openId} onopen={(id) => (openId = id)} />
      {/each}
    </ul>
  {:else}
    <p class="empty">No recipe matches “{query.trim()}”.</p>
  {/if}
</div>

{#if open}
  {#key open.id}
    <RecipeDetail recipe={open} onclose={() => (openId = null)} />
  {/key}
{/if}

<style>
  /* One screen: the page is exactly the window's height and the grid gets what is left. */
  .page {
    max-width: 1760px;
    height: 100vh;
    margin: 0 auto;
    padding: 32px 40px;
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr);
    gap: 24px;
  }

  header {
    display: grid;
    gap: 20px;
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
    font-size: 60px;
    line-height: 1;
    letter-spacing: -0.015em;
  }

  .count {
    font-size: 26px;
    font-weight: 500;
    color: var(--gd-steel);
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .empty {
    align-self: start;
    padding: 24px;
    background: var(--gd-graphite-700);
    border-radius: 14px;
  }
</style>
