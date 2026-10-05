<script>
  import Star from './Star.svelte'

  /**
   * @type {{
   *   photo: import('../lib/photos.js').Photo,
   *   src: string,
   *   favourite: boolean,
   *   onopen: () => void,
   *   ontogglefavourite: () => void,
   * }}
   */
  let { photo, src, favourite, onopen, ontogglefavourite } = $props()
</script>

<li class="tile">
  <button type="button" class="open" aria-label={`Open ${photo.title}`} onclick={onopen}>
    <img {src} alt={photo.title} width="1200" height="900" />
  </button>
  <div class="meta">
    <span class="title">{photo.title}</span>
    <button
      type="button"
      class="fav"
      class:highlight={favourite}
      aria-pressed={favourite}
      aria-label={favourite ? `Remove ${photo.title} from favourites` : `Add ${photo.title} to favourites`}
      onclick={ontogglefavourite}
    >
      <Star filled={favourite} size={22} />
    </button>
  </div>
</li>

<style>
  .tile {
    display: grid;
    gap: 10px;
    min-width: 0;
  }

  .open {
    display: block;
    padding: 0;
    border: 1px solid var(--gd-fog);
    border-radius: 10px;
    overflow: hidden;
    background: var(--gd-paper);
    aspect-ratio: 4 / 3;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 160ms ease-out;
  }

  .open:hover img {
    transform: scale(1.03);
  }

  .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .title {
    min-width: 0;
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fav {
    flex: none;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    background: none;
    border: none;
    border-radius: 6px;
    color: var(--gd-slate);
  }

  .fav:hover {
    color: var(--gd-ink);
    background: var(--gd-mist);
  }

  .fav.highlight,
  .fav.highlight:hover {
    color: var(--gd-ink);
    background: var(--gd-volt);
  }
</style>
