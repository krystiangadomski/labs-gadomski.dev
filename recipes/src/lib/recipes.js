// Plain functions over the list of recipes. Nothing here touches the screen, so every rule can be
// tested with `node --test` and no browser.

/**
 * @typedef {'breakfast' | 'mains' | 'soups' | 'desserts'} Category
 * @typedef {'Easy' | 'Medium' | 'Hard'} Difficulty
 * @typedef {{
 *   id: number,
 *   title: string,
 *   category: Category,
 *   minutes: number,
 *   difficulty: Difficulty,
 *   serves: number,
 *   art: string,
 *   ingredients: string[],
 *   steps: string[],
 * }} Recipe
 */

/** The category filters, in the order the filter bar shows them. `all` shows every recipe. */
export const CATEGORIES = /** @type {const} */ (['all', 'breakfast', 'mains', 'soups', 'desserts'])

/** @typedef {typeof CATEGORIES[number]} CategoryFilter */

/** The label each filter shows. */
export const CATEGORY_LABELS = {
  all: 'All',
  breakfast: 'Breakfast',
  mains: 'Mains',
  soups: 'Soups',
  desserts: 'Desserts',
}

/**
 * Lower case, accents removed and spaces trimmed, so "Crème " matches "creme".
 * @param {string} text
 */
export function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

/**
 * Whether a recipe matches the search text: in its title or in any ingredient.
 * An empty search matches everything.
 * @param {Recipe} recipe
 * @param {string} query
 */
export function matchesQuery(recipe, query) {
  const needle = normalize(query)
  if (needle === '') return true
  return [recipe.title, ...recipe.ingredients].some((text) => normalize(text).includes(needle))
}

/**
 * The recipes the grid shows for a category and a search text, in their original order.
 * @param {Recipe[]} recipes
 * @param {{ category: CategoryFilter, query: string }} filter
 * @returns {Recipe[]}
 */
export function filterRecipes(recipes, { category, query }) {
  return recipes.filter(
    (recipe) => (category === 'all' || recipe.category === category) && matchesQuery(recipe, query),
  )
}

/**
 * How many recipes each filter would show for the current search text, for the counts on the chips.
 * @param {Recipe[]} recipes
 * @param {string} query
 * @returns {Record<CategoryFilter, number>}
 */
export function countByCategory(recipes, query) {
  const counts = /** @type {Record<CategoryFilter, number>} */ (
    Object.fromEntries(CATEGORIES.map((category) => [category, 0]))
  )
  for (const recipe of recipes) {
    if (!matchesQuery(recipe, query)) continue
    counts.all += 1
    counts[recipe.category] += 1
  }
  return counts
}

/**
 * Total time as the tile shows it: "25 min", "1 h", "1 h 10 min".
 * @param {number} minutes
 */
export function formatTime(minutes) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`
}

/**
 * The heading counter: "12 recipes", "1 recipe", "No recipes".
 * @param {number} count
 */
export function countLabel(count) {
  if (count === 0) return 'No recipes'
  return count === 1 ? '1 recipe' : `${count} recipes`
}

/**
 * The recipe with this id, or null when there is none.
 * @param {Recipe[]} recipes
 * @param {number | null} id
 * @returns {Recipe | null}
 */
export function findRecipe(recipes, id) {
  return recipes.find((recipe) => recipe.id === id) ?? null
}
