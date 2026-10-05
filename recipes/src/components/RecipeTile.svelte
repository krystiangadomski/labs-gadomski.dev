<script>
  import RecipeArt from './RecipeArt.svelte'
  import { formatTime } from '../lib/recipes.js'

  /** @type {{ recipe: import('../lib/recipes.js').Recipe, active: boolean, onopen: (id: number) => void }} */
  let { recipe, active, onopen } = $props()
</script>

<li>
  <button type="button" class="tile" class:active onclick={() => onopen(recipe.id)}>
    <span class="art"><RecipeArt art={recipe.art} /></span>
    <span class="body">
      <span class="title">{recipe.title}</span>
      <span class="meta">
        <span class="mono">{formatTime(recipe.minutes)}</span>
        <span>{recipe.difficulty}</span>
      </span>
    </span>
  </button>
</li>

<style>
  li {
    list-style: none;
    display: flex;
    min-height: 0;
  }

  .tile {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
    text-align: left;
    background: var(--gd-graphite-700);
    border: 2px solid transparent;
    border-radius: 14px;
    overflow: hidden;
  }

  .tile:hover {
    border-color: var(--gd-graphite-600);
  }

  .tile.active {
    border-color: var(--gd-blueprint);
  }

  /* The image takes whatever height the grid row leaves after the text, so two rows always fit. */
  .art {
    display: block;
    flex: 1;
    min-height: 0;
    background: var(--gd-graphite-900);
    padding: 6px;
  }

  .body {
    display: grid;
    gap: 8px;
    padding: 14px 16px 16px;
  }

  .title {
    font-size: 21px;
    font-weight: 600;
    line-height: 1.2;
    min-height: 2.4em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 18px;
    white-space: nowrap;
  }
</style>
