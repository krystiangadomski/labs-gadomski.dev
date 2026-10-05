<script>
  import AlbumBar from './components/AlbumBar.svelte'
  import PhotoTile from './components/PhotoTile.svelte'
  import Lightbox from './components/Lightbox.svelte'
  import { photos, seedFavourites } from './lib/photos.js'
  import { filterPhotos, countByFilter, toggleFavourite, stepIndex } from './lib/gallery.js'
  import { loadFavourites, saveFavourites } from './lib/storage.js'
  import wordmark from './assets/wordmark-mono-ink.svg'

  /** Image URLs by file path, e.g. './assets/photos/long-road.svg'. */
  const images = /** @type {Record<string, string>} */ (
    import.meta.glob('./assets/photos/*.svg', { eager: true, query: '?url', import: 'default' })
  )

  /** @param {string} id */
  const srcOf = (id) => images[`./assets/photos/${id}.svg`]

  let favourites = $state(loadFavourites(localStorage, seedFavourites))
  /** @type {import('./lib/gallery.js').Filter} */
  let filter = $state('all')

  /**
   * The open lightbox: the photos it steps through, fixed when it opens, and which one shows.
   * Fixing the list means un-favouriting inside the Favourites album does not pull the photo away.
   * @type {{ list: import('./lib/photos.js').Photo[], index: number } | null}
   */
  let lightbox = $state(null)

  const visible = $derived(filterPhotos(photos, filter, favourites))
  const counts = $derived(countByFilter(photos, favourites))
  const current = $derived(lightbox ? lightbox.list[lightbox.index] : null)

  /** @param {string} id */
  const flip = (id) => (favourites = toggleFavourite(favourites, id))

  $effect(() => {
    saveFavourites(localStorage, favourites)
  })
</script>

<div class="page">
  <header>
    <img class="wordmark" src={wordmark} alt="Gadomski.DEV" />
    <div class="heading">
      <h1>Gallery</h1>
      <p class="summary mono">{photos.length} photos · {favourites.length} favourite{favourites.length === 1 ? '' : 's'}</p>
    </div>
  </header>

  <AlbumBar {filter} {counts} onchange={(next) => (filter = next)} />

  {#if visible.length > 0}
    <ul class="grid">
      {#each visible as photo, index (photo.id)}
        <PhotoTile
          {photo}
          src={srcOf(photo.id)}
          favourite={favourites.includes(photo.id)}
          onopen={() => (lightbox = { list: visible, index })}
          ontogglefavourite={() => flip(photo.id)}
        />
      {/each}
    </ul>
  {:else}
    <p class="empty">No favourites yet. Tap the star under a photo to add one.</p>
  {/if}
</div>

{#if lightbox && current}
  <Lightbox
    photo={current}
    src={srcOf(current.id)}
    index={lightbox.index}
    total={lightbox.list.length}
    favourite={favourites.includes(current.id)}
    onstep={(step) => lightbox && (lightbox.index = stepIndex(lightbox.index, lightbox.list.length, step))}
    ontogglefavourite={() => flip(current.id)}
    onclose={() => (lightbox = null)}
  />
{/if}

<style>
  .page {
    max-width: 1840px;
    margin: 0 auto;
    padding: 40px 48px;
    display: grid;
    gap: 28px;
  }

  header {
    display: grid;
    gap: 28px;
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

  .summary {
    font-size: 26px;
    font-weight: 500;
  }

  .grid {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 24px 20px;
  }

  @media (max-width: 1100px) {
    .grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (max-width: 800px) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 560px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .empty {
    padding: 24px;
    background: var(--gd-paper);
    border: 1px solid var(--gd-fog);
    border-radius: 12px;
    color: var(--gd-slate);
  }
</style>
