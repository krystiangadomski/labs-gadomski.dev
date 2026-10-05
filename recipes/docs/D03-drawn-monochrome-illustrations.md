# D03: Recipe images are drawn monochrome illustrations

- **Status:** Accepted
- **Applies to:** the recipes app (`recipes/`)
- **Scope:** every image shown for a recipe, on tiles and in the recipe panel

## Decision

Recipe images are inline SVG illustrations drawn for this app, in the grey tones of the palette
only. They live in `src/components/RecipeArt.svelte`, one per recipe. The app uses no photographs,
no stock images and no downloaded files.

## Context

A recipe tile needs an image so the grid can be scanned quickly. Photos are the usual choice, but
they bring problems here: they carry their own colour and break the monochrome direction in D01,
their lighting and style differ from one dish to the next, and they need licences, files and
storage. The app is also a demo that must be fully reproducible from the repository.

## Justification

1. **Consistent with D01.** Grey illustrations add no colour, so the single accent keeps its
   meaning.
2. **One visual style.** Every dish is drawn the same way, so the grid looks like one product
   instead of twelve unrelated photos.
3. **No licensing risk.** Everything is drawn in this repository, so there is nothing to credit
   or license.
4. **Small and sharp.** SVG is a few hundred bytes per image, stays crisp at any size and needs no
   network request.
5. **Scales with the layout.** The illustration grows or shrinks to the tile height without
   cropping or blur.

## Consequences

- A new recipe gets a new drawn illustration in the same style before it ships.
- Illustrations use only the palette tokens from `src/tokens.css`, in graphite, steel and paper
  tones. No blue, no other colours.
- No photographs or raster images are added to the repository.
- Text over an illustration keeps the contrast ratios recorded in `src/tokens.css`.
- Replacing the illustrations with photos requires a new decision that supersedes D03.
