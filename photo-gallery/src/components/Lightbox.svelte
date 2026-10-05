<script>
  import Star from './Star.svelte'
  import { FILTER_LABELS, positionLabel } from '../lib/gallery.js'

  /**
   * @type {{
   *   photo: import('../lib/photos.js').Photo,
   *   src: string,
   *   index: number,
   *   total: number,
   *   favourite: boolean,
   *   onstep: (step: number) => void,
   *   ontogglefavourite: () => void,
   *   onclose: () => void,
   * }}
   */
  let { photo, src, index, total, favourite, onstep, ontogglefavourite, onclose } = $props()

  /** @type {HTMLDialogElement | undefined} */
  let dialog = $state()

  // Open as a modal, then focus the dialog itself rather than its first button, so the
  // arrow keys work at once and no focus ring sits on Close.
  $effect(() => {
    dialog?.showModal()
    dialog?.focus()
  })

  /** @param {KeyboardEvent} event */
  function keydown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onstep(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      onstep(1)
    }
  }
</script>

<dialog bind:this={dialog} class="lightbox" tabindex="-1" aria-label={photo.title} onkeydown={keydown} onclose={onclose}>
  <div class="top">
    <p class="position mono" aria-live="polite">{positionLabel(index, total)}</p>
    <button type="button" class="close" onclick={() => dialog?.close()}>Close <span class="key mono">Esc</span></button>
  </div>

  <div class="stage">
    <button type="button" class="step" aria-label="Previous photo" onclick={() => onstep(-1)} disabled={total < 2}>
      <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <img {src} alt={photo.title} width="1200" height="900" />
    <button type="button" class="step" aria-label="Next photo" onclick={() => onstep(1)} disabled={total < 2}>
      <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
  </div>

  <div class="bottom">
    <div class="text">
      <h2>{photo.title} <span class="album">{FILTER_LABELS[photo.album]}</span></h2>
      <p class="caption">{photo.caption}</p>
    </div>
    <button type="button" class="fav" aria-pressed={favourite} onclick={ontogglefavourite}>
      <span class="fav-label" class:highlight={favourite}>
        <Star filled={favourite} size={24} />
        {favourite ? 'Favourite' : 'Add to favourites'}
      </span>
    </button>
  </div>
</dialog>

<style>
  .lightbox {
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
    margin: 0;
    padding: 28px 40px 36px;
    border: none;
    background: var(--gd-studio);
    color: var(--gd-ink);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 20px;
  }

  .lightbox:focus {
    outline: none;
  }

  .lightbox::backdrop {
    background: var(--gd-studio);
  }

  .top,
  .bottom {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  .position {
    font-size: 24px;
    font-weight: 500;
  }

  .close {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 18px;
    background: var(--gd-paper);
    border: 1px solid var(--gd-fog);
    border-radius: 10px;
    font-size: 20px;
    font-weight: 600;
  }

  .close:hover {
    background: var(--gd-mist);
  }

  .key {
    font-size: 15px;
    color: var(--gd-slate);
    font-weight: 500;
  }

  .stage {
    min-height: 0;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 0;
    object-fit: contain;
  }

  .step {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    background: var(--gd-paper);
    border: 1px solid var(--gd-fog);
    border-radius: 50%;
  }

  .step:hover:not(:disabled) {
    background: var(--gd-mist);
  }

  .step:disabled {
    color: var(--gd-fog);
    cursor: default;
  }

  .text {
    display: grid;
    gap: 6px;
    min-width: 0;
  }

  h2 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 40px;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }

  .album {
    margin-left: 10px;
    font-family: var(--gd-font-text);
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0;
    color: var(--gd-slate);
  }

  .caption {
    font-size: 22px;
    color: var(--gd-slate);
  }

  .fav {
    flex: none;
    padding: 0;
    background: none;
    border: none;
    font-size: 22px;
    font-weight: 600;
  }

  .fav-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    border: 1px solid var(--gd-fog);
    border-radius: 10px;
    background: var(--gd-paper);
  }

  .fav:hover .fav-label {
    background: var(--gd-mist);
  }

  .fav .fav-label.highlight {
    border-color: var(--gd-volt);
    background: var(--gd-volt);
  }
</style>
