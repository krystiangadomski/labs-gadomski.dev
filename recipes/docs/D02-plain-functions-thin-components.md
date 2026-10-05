# D02: Logic in plain functions, components kept thin

- **Status:** Accepted
- **Applies to:** the recipes app (`recipes/`)
- **Scope:** code structure, state, dependencies and tests

## Decision

All logic lives in plain JavaScript functions in `src/lib/`. Svelte components in
`src/components/` only render data and report user actions. The app has no runtime dependencies:
Svelte 5 and Vite are build-time tools only. State lives in `src/App.svelte` and flows down as
props.

## Context

The app is small: a filterable grid of recipe tiles, a search box and a recipe panel. It ships
twelve recipes as seed data and has no server. The logic is also small: filtering by category,
searching titles and ingredients, counting chips and formatting time labels. The risk is not
scale. The risk is that logic gets mixed into markup and becomes hard to read, test and change.

## Justification

1. **Testable without a browser.** Pure functions run under `node --test` with no DOM, no
   framework and no extra packages. The whole suite runs in well under a second.
2. **Readable for a newcomer.** A change to search behaviour touches `src/lib/recipes.js` and its
   test, not a component.
3. **Components stay replaceable.** Because components hold no rules, a tile or the panel can be
   redesigned without risking behaviour.
4. **No dependency upkeep.** With no runtime packages there is nothing to update, audit or break
   between releases.
5. **One place for state.** Category, search text and the open recipe live in `App.svelte`. There is
   no store layer and no global state to trace.

## Consequences

- New behaviour is written first as a function in `src/lib/` with a `*.test.js` file beside it.
- Components do not filter, sort, search or format. They receive ready values.
- Components do not import each other's state. Data moves down as props, actions move up as
  callbacks.
- No runtime dependency is added without a new decision. State libraries, UI kits and utility
  libraries are all covered by this.
- Seed data stays in `src/lib/seed.js`, separate from the logic that reads it.
