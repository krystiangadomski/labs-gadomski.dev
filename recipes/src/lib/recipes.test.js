import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  CATEGORIES,
  CATEGORY_LABELS,
  normalize,
  matchesQuery,
  filterRecipes,
  countByCategory,
  formatTime,
  countLabel,
  findRecipe,
} from './recipes.js'
import { seedRecipes } from './seed.js'

/** @returns {import('./recipes.js').Recipe[]} */
const sample = () => [
  { id: 1, title: 'Fluffy pancakes', category: 'breakfast', minutes: 25, difficulty: 'Easy', serves: 4, art: 'pancakes', ingredients: ['2 eggs', '300 ml milk'], steps: ['Mix.'] },
  { id: 2, title: 'Tomato soup', category: 'soups', minutes: 35, difficulty: 'Easy', serves: 4, art: 'tomatoSoup', ingredients: ['1 kg tomatoes', 'Basil'], steps: ['Cook.'] },
  { id: 3, title: 'Crème brûlée', category: 'desserts', minutes: 60, difficulty: 'Hard', serves: 4, art: 'mousse', ingredients: ['4 egg yolks', '500 ml cream'], steps: ['Bake.'] },
]

test('the filters are all, breakfast, mains, soups and desserts, in that order', () => {
  assert.deepEqual(CATEGORIES, ['all', 'breakfast', 'mains', 'soups', 'desserts'])
})

test('every filter has a label', () => {
  for (const category of CATEGORIES) assert.equal(typeof CATEGORY_LABELS[category], 'string')
})

test('normalize lower-cases, trims and drops accents', () => {
  assert.equal(normalize('  Crème Brûlée '), 'creme brulee')
})

test('matchesQuery finds a word in the title, ignoring case', () => {
  assert.equal(matchesQuery(sample()[1], 'SOUP'), true)
})

test('matchesQuery finds a word in the ingredients', () => {
  assert.equal(matchesQuery(sample()[1], 'basil'), true)
  assert.equal(matchesQuery(sample()[0], 'basil'), false)
})

test('matchesQuery ignores accents in either direction', () => {
  assert.equal(matchesQuery(sample()[2], 'creme'), true)
  assert.equal(matchesQuery(sample()[2], 'brûlée'), true)
})

test('an empty or blank search matches every recipe', () => {
  assert.equal(matchesQuery(sample()[0], ''), true)
  assert.equal(matchesQuery(sample()[0], '   '), true)
})

test('filterRecipes with all and no search returns every recipe in order', () => {
  assert.deepEqual(
    filterRecipes(sample(), { category: 'all', query: '' }).map((r) => r.id),
    [1, 2, 3],
  )
})

test('filterRecipes keeps only the chosen category', () => {
  assert.deepEqual(
    filterRecipes(sample(), { category: 'soups', query: '' }).map((r) => r.id),
    [2],
  )
})

test('filterRecipes applies the category and the search together', () => {
  assert.deepEqual(filterRecipes(sample(), { category: 'all', query: 'egg' }).map((r) => r.id), [1, 3])
  assert.deepEqual(filterRecipes(sample(), { category: 'desserts', query: 'egg' }).map((r) => r.id), [3])
  assert.deepEqual(filterRecipes(sample(), { category: 'soups', query: 'egg' }), [])
})

test('filterRecipes leaves the original list untouched', () => {
  const before = sample()
  filterRecipes(before, { category: 'soups', query: 'x' })
  assert.equal(before.length, 3)
})

test('countByCategory counts every filter for the current search', () => {
  assert.deepEqual(countByCategory(sample(), ''), { all: 3, breakfast: 1, mains: 0, soups: 1, desserts: 1 })
  assert.deepEqual(countByCategory(sample(), 'egg'), { all: 2, breakfast: 1, mains: 0, soups: 0, desserts: 1 })
})

test('formatTime shows minutes, hours, or both', () => {
  assert.equal(formatTime(25), '25 min')
  assert.equal(formatTime(60), '1 h')
  assert.equal(formatTime(70), '1 h 10 min')
  assert.equal(formatTime(140), '2 h 20 min')
})

test('countLabel reads naturally for none, one and many', () => {
  assert.equal(countLabel(0), 'No recipes')
  assert.equal(countLabel(1), '1 recipe')
  assert.equal(countLabel(12), '12 recipes')
})

test('findRecipe returns the recipe with the id, or null', () => {
  assert.equal(findRecipe(sample(), 2)?.title, 'Tomato soup')
  assert.equal(findRecipe(sample(), 99), null)
  assert.equal(findRecipe(sample(), null), null)
})

test('the seed has twelve recipes, three per category, with unique ids', () => {
  assert.equal(seedRecipes.length, 12)
  assert.equal(new Set(seedRecipes.map((r) => r.id)).size, 12)
  assert.deepEqual(countByCategory(seedRecipes, ''), { all: 12, breakfast: 3, mains: 3, soups: 3, desserts: 3 })
})

test('every seed recipe has ingredients, steps, a valid difficulty and a positive time', () => {
  for (const recipe of seedRecipes) {
    assert.ok(recipe.ingredients.length > 0, recipe.title)
    assert.ok(recipe.steps.length > 0, recipe.title)
    assert.ok(['Easy', 'Medium', 'Hard'].includes(recipe.difficulty), recipe.title)
    assert.ok(recipe.minutes > 0, recipe.title)
  }
})
