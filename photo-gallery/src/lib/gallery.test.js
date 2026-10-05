import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FILTERS,
  FILTER_LABELS,
  filterPhotos,
  countByFilter,
  toggleFavourite,
  stepIndex,
  positionLabel,
} from './gallery.js'

const sample = () => [
  { id: 'a', album: 'travel', title: 'A', caption: '' },
  { id: 'b', album: 'home', title: 'B', caption: '' },
  { id: 'c', album: 'nature', title: 'C', caption: '' },
  { id: 'd', album: 'travel', title: 'D', caption: '' },
]

const ids = (photos) => photos.map((photo) => photo.id)

test('the filters are all, the three albums, then favourites, each with a label', () => {
  assert.deepEqual(FILTERS, ['all', 'travel', 'home', 'nature', 'favourites'])
  for (const filter of FILTERS) assert.equal(typeof FILTER_LABELS[filter], 'string')
})

test('filterPhotos with all gives every photo in order', () => {
  assert.deepEqual(ids(filterPhotos(sample(), 'all', [])), ['a', 'b', 'c', 'd'])
})

test('filterPhotos with an album gives only that album', () => {
  assert.deepEqual(ids(filterPhotos(sample(), 'travel', [])), ['a', 'd'])
  assert.deepEqual(ids(filterPhotos(sample(), 'home', [])), ['b'])
})

test('filterPhotos with favourites keeps gallery order, not the order they were added', () => {
  assert.deepEqual(ids(filterPhotos(sample(), 'favourites', ['d', 'a'])), ['a', 'd'])
  assert.deepEqual(filterPhotos(sample(), 'favourites', []), [])
})

test('countByFilter counts what each filter would show', () => {
  assert.deepEqual(countByFilter(sample(), ['c']), { all: 4, travel: 2, home: 1, nature: 1, favourites: 1 })
})

test('toggleFavourite adds a photo, and a second toggle takes it out', () => {
  const once = toggleFavourite(['a'], 'b')
  assert.deepEqual(once, ['a', 'b'])
  assert.deepEqual(toggleFavourite(once, 'b'), ['a'])
})

test('toggleFavourite leaves the original list untouched', () => {
  const before = ['a']
  toggleFavourite(before, 'b')
  toggleFavourite(before, 'a')
  assert.deepEqual(before, ['a'])
})

test('stepIndex moves one step and wraps at both ends', () => {
  assert.equal(stepIndex(1, 4, 1), 2)
  assert.equal(stepIndex(3, 4, 1), 0)
  assert.equal(stepIndex(0, 4, -1), 3)
  assert.equal(stepIndex(2, 4, -1), 1)
})

test('stepIndex on a single photo or an empty list stays at zero', () => {
  assert.equal(stepIndex(0, 1, 1), 0)
  assert.equal(stepIndex(0, 1, -1), 0)
  assert.equal(stepIndex(0, 0, 1), 0)
})

test('positionLabel reads "N / total", counting from one', () => {
  assert.equal(positionLabel(0, 12), '1 / 12')
  assert.equal(positionLabel(11, 12), '12 / 12')
})
