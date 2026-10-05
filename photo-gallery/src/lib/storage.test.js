import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { STORAGE_KEY, loadFavourites, saveFavourites } from './storage.js'
import { photos, seedFavourites } from './photos.js'

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, value),
  }
}

const fallback = ['fallback']

test('loadFavourites gives the fallback when nothing is saved', () => {
  assert.equal(loadFavourites(memoryStorage(), fallback), fallback)
})

test('saveFavourites then loadFavourites gives the same ids back', () => {
  const storage = memoryStorage()
  saveFavourites(storage, ['still-lake', 'night-train'])
  assert.deepEqual(loadFavourites(storage, fallback), ['still-lake', 'night-train'])
})

test('an empty saved list stays empty', () => {
  assert.deepEqual(loadFavourites(memoryStorage({ [STORAGE_KEY]: '[]' }), fallback), [])
})

test('loadFavourites gives the fallback for unreadable or wrong-shaped data', () => {
  assert.equal(loadFavourites(memoryStorage({ [STORAGE_KEY]: '{oops' }), fallback), fallback)
  assert.equal(loadFavourites(memoryStorage({ [STORAGE_KEY]: '{"id":1}' }), fallback), fallback)
  assert.equal(loadFavourites(memoryStorage({ [STORAGE_KEY]: '[1,2]' }), fallback), fallback)
})

test('the gallery has twelve photos with unique ids, four in each album', () => {
  assert.equal(photos.length, 12)
  assert.equal(new Set(photos.map((photo) => photo.id)).size, 12)
  for (const album of ['travel', 'home', 'nature']) {
    assert.equal(photos.filter((photo) => photo.album === album).length, 4)
  }
})

test('every photo has an image file, a title and a caption', () => {
  for (const photo of photos) {
    assert.ok(existsSync(new URL(`../assets/photos/${photo.id}.svg`, import.meta.url)), photo.id)
    assert.ok(photo.title.length > 0)
    assert.ok(photo.caption.length > 0)
  }
})

test('the seed favourites are real photo ids', () => {
  const known = new Set(photos.map((photo) => photo.id))
  for (const id of seedFavourites) assert.ok(known.has(id), id)
})
