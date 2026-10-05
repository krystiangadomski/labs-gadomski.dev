// The twelve pictures the gallery shows. They are generated illustrations (scripts/make-photos.js),
// not photographs: no real place, no real event, nobody's personal photo.

/** @typedef {'travel' | 'home' | 'nature'} Album */
/** @typedef {{ id: string, album: Album, title: string, caption: string }} Photo */

/** @type {Photo[]} */
export const photos = [
  { id: 'long-road', album: 'travel', title: 'Long road', caption: 'A straight road running towards a low sun. Drawn, not photographed.' },
  { id: 'small-sailboat', album: 'travel', title: 'Small sailboat', caption: 'Two white sails on a calm sea at midday. Drawn, not photographed.' },
  { id: 'three-balloons', album: 'travel', title: 'Three balloons', caption: 'Hot-air balloons drifting over soft hills. Drawn, not photographed.' },
  { id: 'night-train', album: 'travel', title: 'Night train', caption: 'Lit carriages crossing an arched bridge. Drawn, not photographed.' },
  { id: 'window-plant', album: 'home', title: 'Window plant', caption: 'A potted plant on a white sill, sky outside. Drawn, not photographed.' },
  { id: 'reading-lamp', album: 'home', title: 'Reading lamp', caption: 'A yellow lamp beside a red armchair. Drawn, not photographed.' },
  { id: 'kitchen-shelf', album: 'home', title: 'Kitchen shelf', caption: 'Jars, mugs and tins on two wooden shelves. Drawn, not photographed.' },
  { id: 'morning-table', album: 'home', title: 'Morning table', caption: 'A cup and a bowl of fruit in a patch of sun. Drawn, not photographed.' },
  { id: 'blue-ridges', album: 'nature', title: 'Blue ridges', caption: 'Four layers of hills fading into haze. Drawn, not photographed.' },
  { id: 'pine-forest', album: 'nature', title: 'Pine forest', caption: 'Rows of pines on rolling green slopes. Drawn, not photographed.' },
  { id: 'warm-dunes', album: 'nature', title: 'Warm dunes', caption: 'Orange dunes under a pale afternoon sky. Drawn, not photographed.' },
  { id: 'still-lake', album: 'nature', title: 'Still lake', caption: 'Reeds and a pink sky mirrored in still water. Drawn, not photographed.' },
]

/** The favourites a first visit starts with, so the favourite state is visible straight away. */
export const seedFavourites = ['three-balloons', 'pine-forest']
