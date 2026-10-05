// Plain functions over the photos and the favourites. Nothing here changes what it was given,
// so the screen can replace its state in one assignment.

/** The album filters, in the order the album bar shows them. */
export const FILTERS = /** @type {const} */ (['all', 'travel', 'home', 'nature', 'favourites'])

/** @typedef {typeof FILTERS[number]} Filter */

/** The label the album bar shows for each filter. */
export const FILTER_LABELS = {
  all: 'All',
  travel: 'Travel',
  home: 'Home',
  nature: 'Nature',
  favourites: 'Favourites',
}

/**
 * The photos a filter shows: every photo, one album, or only the favourites.
 * @param {import('./photos.js').Photo[]} photos
 * @param {Filter} filter
 * @param {string[]} favourites ids of the favourite photos
 * @returns {import('./photos.js').Photo[]}
 */
export function filterPhotos(photos, filter, favourites) {
  if (filter === 'all') return photos
  if (filter === 'favourites') return photos.filter((photo) => favourites.includes(photo.id))
  return photos.filter((photo) => photo.album === filter)
}

/**
 * How many photos each filter would show, for the numbers in the album bar.
 * @param {import('./photos.js').Photo[]} photos
 * @param {string[]} favourites
 * @returns {Record<Filter, number>}
 */
export function countByFilter(photos, favourites) {
  return /** @type {Record<Filter, number>} */ (
    Object.fromEntries(FILTERS.map((filter) => [filter, filterPhotos(photos, filter, favourites).length]))
  )
}

/**
 * Adds a photo to the favourites, or takes it out if it is already there.
 * @param {string[]} favourites
 * @param {string} id
 * @returns {string[]}
 */
export function toggleFavourite(favourites, id) {
  return favourites.includes(id) ? favourites.filter((fav) => fav !== id) : [...favourites, id]
}

/**
 * The position one step forward (+1) or back (-1), wrapping from the last photo to the first
 * and from the first to the last. The lightbox uses it for previous, next and the arrow keys.
 * @param {number} index
 * @param {number} length
 * @param {number} step
 */
export function stepIndex(index, length, step) {
  if (length === 0) return 0
  return (((index + step) % length) + length) % length
}

/**
 * The lightbox position text: "3 / 12".
 * @param {number} index zero-based
 * @param {number} length
 */
export function positionLabel(index, length) {
  return `${index + 1} / ${length}`
}
