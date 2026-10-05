// Draws the twelve gallery pictures as SVG files into src/assets/photos/.
// They are generated illustrations, not photographs: gradients and simple shapes, no real place.
// Run with `node scripts/make-photos.js`; the output is the same every time.

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const W = 1200
const H = 900
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'photos')

/** A small seeded random generator, so every run draws the same hills. */
function random(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/** A vertical gradient definition. */
function grad(id, stops) {
  const parts = stops.map(([at, color]) => `<stop offset="${at}" stop-color="${color}"/>`).join('')
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${parts}</linearGradient>`
}

/** A filled ridge from left to right around height y, closed along the bottom edge. */
function ridge(seed, y, amplitude, color, steps = 9) {
  const next = random(seed)
  const points = []
  for (let i = 0; i <= steps; i++) {
    const x = Math.round((W / steps) * i)
    points.push(`${x},${Math.round(y - next() * amplitude)}`)
  }
  return `<polygon points="0,${H} ${points.join(' ')} ${W},${H}" fill="${color}"/>`
}

/** A soft rolling hill line made of curves. */
function hill(y, rise, color, phase = 0) {
  const a = y - rise
  return `<path d="M0 ${y} C ${300 + phase} ${a}, ${600 + phase} ${a}, ${900 + phase} ${y - rise / 3} S ${W + 200} ${y}, ${W} ${y} L ${W} ${H} L 0 ${H} Z" fill="${color}"/>`
}

function svg(defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${defs}</defs>${body}</svg>\n`
}

function pine(x, base, size, color) {
  const h = size * 2.2
  return `<polygon points="${x},${base - h} ${x - size / 2},${base} ${x + size / 2},${base}" fill="${color}"/>`
}

const scenes = {
  'long-road': () =>
    svg(
      grad('sky', [[0, '#3B2F63'], [0.55, '#E5738A'], [1, '#FFC48A']]) + grad('land', [[0, '#5B3C55'], [1, '#2A2135']]),
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       <circle cx="600" cy="560" r="90" fill="#FFE2A8"/>
       <rect y="560" width="${W}" height="340" fill="url(#land)"/>
       <polygon points="560,560 640,560 980,900 220,900" fill="#1C1726"/>
       <polygon points="596,580 604,580 608,620 592,620" fill="#FFE2A8"/>
       <polygon points="588,660 612,660 622,730 578,730" fill="#FFE2A8"/>
       <polygon points="570,800 630,800 646,900 554,900" fill="#FFE2A8"/>`,
    ),

  'small-sailboat': () =>
    svg(
      grad('sky', [[0, '#8EC5E8'], [1, '#E6F3F8']]) + grad('sea', [[0, '#3C8DBC'], [1, '#174A73']]),
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       <circle cx="920" cy="190" r="70" fill="#FFF6D6"/>
       <rect y="540" width="${W}" height="360" fill="url(#sea)"/>
       <rect x="860" y="560" width="120" height="6" rx="3" fill="#FFF6D6" opacity="0.7"/>
       <rect x="830" y="600" width="180" height="6" rx="3" fill="#FFF6D6" opacity="0.5"/>
       <rect x="800" y="650" width="240" height="6" rx="3" fill="#FFF6D6" opacity="0.35"/>
       <polygon points="470,250 470,500 330,500" fill="#FFFFFF"/>
       <polygon points="490,290 490,500 610,500" fill="#F3E2C4"/>
       <rect x="474" y="240" width="10" height="290" fill="#2B2B2B"/>
       <polygon points="300,520 660,520 610,580 350,580" fill="#B5452F"/>`,
    ),

  'three-balloons': () =>
    svg(
      grad('sky', [[0, '#F9D9C4'], [1, '#FDF1E4']]),
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       ${hill(780, 120, '#C9B6A3')}
       ${hill(860, 90, '#A88F7B', 160)}
       <ellipse cx="330" cy="300" rx="110" ry="130" fill="#E4573D"/>
       <polygon points="260,390 400,390 360,450 300,450" fill="#E4573D"/>
       <rect x="305" y="475" width="50" height="40" rx="6" fill="#6B4A35"/>
       <ellipse cx="740" cy="220" rx="80" ry="95" fill="#2F7DA8"/>
       <polygon points="690,285 790,285 760,330 720,330" fill="#2F7DA8"/>
       <rect x="722" y="350" width="36" height="30" rx="5" fill="#6B4A35"/>
       <ellipse cx="1000" cy="420" rx="56" ry="66" fill="#E8A43A"/>
       <polygon points="965,466 1035,466 1015,496 985,496" fill="#E8A43A"/>
       <rect x="987" y="510" width="26" height="22" rx="4" fill="#6B4A35"/>`,
    ),

  'night-train': () =>
    svg(
      grad('sky', [[0, '#0E1A3A'], [1, '#2E3F72']]) +
        '<mask id="moon"><circle cx="930" cy="170" r="60" fill="#fff"/><circle cx="955" cy="155" r="55" fill="#000"/></mask>',
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       <circle cx="930" cy="170" r="60" fill="#F2EEDC" mask="url(#moon)"/>
       ${ridge(7, 620, 140, '#1A2550')}
       <rect y="600" width="${W}" height="300" fill="#0B1230"/>
       <rect y="560" width="${W}" height="24" fill="#070C20"/>
       ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${i * 220 - 40} 900 L${i * 220 - 40} 690 A 90 90 0 0 1 ${i * 220 + 140} 690 L${i * 220 + 140} 900 Z" fill="#16234A"/>`).join('')}
       ${[0, 1, 2, 3].map((i) => `<rect x="${170 + i * 210}" y="490" width="196" height="70" rx="10" fill="#070C20"/>${[0, 1, 2, 3].map((j) => `<rect x="${186 + i * 210 + j * 44}" y="508" width="30" height="24" rx="3" fill="#FFD98A"/>`).join('')}`).join('')}`,
    ),

  'window-plant': () =>
    svg(
      grad('sky', [[0, '#9ED0E6'], [1, '#DDEFF5']]),
      `<rect width="${W}" height="${H}" fill="#E9DFD2"/>
       <rect x="330" y="120" width="540" height="520" fill="url(#sky)"/>
       ${hill(560, 60, '#B9D9C0')}
       <rect x="0" y="0" width="330" height="${H}" fill="#E9DFD2"/>
       <rect x="870" y="0" width="330" height="${H}" fill="#E9DFD2"/>
       <rect x="0" y="640" width="${W}" height="260" fill="#E9DFD2"/>
       <rect x="330" y="120" width="540" height="520" fill="none" stroke="#FFFFFF" stroke-width="24"/>
       <rect x="590" y="120" width="20" height="520" fill="#FFFFFF"/>
       <rect x="300" y="640" width="600" height="30" fill="#FFFFFF"/>
       <rect x="300" y="670" width="600" height="14" fill="#D6CABB"/>
       <ellipse cx="470" cy="520" rx="40" ry="90" fill="#4F8A5B" transform="rotate(-25 470 520)"/>
       <ellipse cx="530" cy="500" rx="40" ry="100" fill="#3E7A4C"/>
       <ellipse cx="590" cy="525" rx="38" ry="85" fill="#5E9C69" transform="rotate(28 590 525)"/>
       <polygon points="460,560 600,560 580,640 480,640" fill="#C46A45"/>`,
    ),

  'reading-lamp': () =>
    svg(
      grad('wall', [[0, '#3C3A4A'], [1, '#2A2834']]),
      `<rect width="${W}" height="${H}" fill="url(#wall)"/>
       <rect y="700" width="${W}" height="200" fill="#4A3A33"/>
       <polygon points="760,250 880,250 1040,700 600,700" fill="#FFE7B0" opacity="0.18"/>
       <polygon points="760,180 880,180 920,250 720,250" fill="#F2C45A"/>
       <rect x="815" y="250" width="10" height="450" fill="#1C1B22"/>
       <rect x="760" y="690" width="120" height="16" rx="8" fill="#1C1B22"/>
       <rect x="200" y="420" width="380" height="160" rx="30" fill="#8C4B3E"/>
       <rect x="160" y="500" width="460" height="140" rx="30" fill="#A35A4A"/>
       <rect x="160" y="420" width="70" height="240" rx="30" fill="#8C4B3E"/>
       <rect x="550" y="420" width="70" height="240" rx="30" fill="#8C4B3E"/>
       <rect x="190" y="640" width="20" height="60" fill="#2A1E1A"/>
       <rect x="570" y="640" width="20" height="60" fill="#2A1E1A"/>`,
    ),

  'kitchen-shelf': () =>
    svg(
      '',
      `<rect width="${W}" height="${H}" fill="#DCE8E1"/>
       <rect x="120" y="380" width="960" height="22" fill="#8B6A4F"/>
       <rect x="120" y="700" width="960" height="22" fill="#8B6A4F"/>
       <rect x="180" y="240" width="110" height="140" rx="14" fill="#F2F0EA"/>
       <rect x="200" y="215" width="70" height="30" rx="6" fill="#C9C4B6"/>
       <rect x="330" y="270" width="90" height="110" rx="10" fill="#E07A5F"/>
       <path d="M420 300 a 30 30 0 0 1 0 50" fill="none" stroke="#E07A5F" stroke-width="14"/>
       <rect x="480" y="200" width="70" height="180" rx="26" fill="#3D5A80"/>
       <circle cx="680" cy="330" r="50" fill="#F2CC8F"/>
       <rect x="630" y="330" width="100" height="50" fill="#F2CC8F"/>
       <rect x="790" y="250" width="120" height="130" rx="12" fill="#81B29A"/>
       <rect x="950" y="290" width="80" height="90" rx="10" fill="#F2F0EA"/>
       <rect x="200" y="560" width="160" height="140" rx="18" fill="#3D5A80"/>
       <rect x="400" y="600" width="90" height="100" rx="10" fill="#F2F0EA"/>
       <path d="M490 625 a 28 28 0 0 1 0 46" fill="none" stroke="#F2F0EA" stroke-width="13"/>
       <rect x="560" y="520" width="60" height="180" rx="24" fill="#E07A5F"/>
       <rect x="660" y="580" width="130" height="120" rx="14" fill="#81B29A"/>
       <rect x="830" y="540" width="190" height="160" rx="18" fill="#F2CC8F"/>`,
    ),

  'morning-table': () =>
    svg(
      '',
      `<rect width="${W}" height="${H}" fill="#F3E9DA"/>
       <polygon points="640,80 1020,80 1120,460 740,460" fill="#FFF6E2"/>
       <rect y="560" width="${W}" height="340" fill="#B98A63"/>
       <rect y="560" width="${W}" height="18" fill="#A07350"/>
       <ellipse cx="420" cy="600" rx="170" ry="32" fill="#9C7352"/>
       <ellipse cx="420" cy="590" rx="160" ry="30" fill="#FFFFFF"/>
       <rect x="350" y="460" width="140" height="130" rx="16" fill="#2E6F8E"/>
       <path d="M490 490 a 40 40 0 0 1 0 70" fill="none" stroke="#2E6F8E" stroke-width="18"/>
       <path d="M690 560 Q 800 640 910 560 Z" fill="#E8B04B"/>
       <ellipse cx="800" cy="560" rx="110" ry="20" fill="#F0C873"/>
       <circle cx="770" cy="552" r="16" fill="#D9534F"/>
       <circle cx="810" cy="548" r="16" fill="#D9534F"/>
       <circle cx="840" cy="556" r="14" fill="#7FAF5A"/>`,
    ),

  'blue-ridges': () =>
    svg(
      grad('sky', [[0, '#C9DDF0'], [1, '#F4F1EA']]),
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       <circle cx="380" cy="300" r="80" fill="#FFF3D9"/>
       ${ridge(3, 460, 160, '#9DB6D3')}
       ${ridge(11, 560, 150, '#7896BD')}
       ${ridge(23, 670, 140, '#56739F')}
       ${ridge(41, 790, 120, '#3A537C')}`,
    ),

  'pine-forest': () =>
    svg(
      grad('sky', [[0, '#E3EFE6'], [1, '#F7F4EA']]),
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       ${hill(560, 80, '#B7CFB8')}
       ${Array.from({ length: 14 }, (_, i) => pine(40 + i * 86, 600, 70, '#8FB394')).join('')}
       ${hill(700, 70, '#6E9B76', 120)}
       ${Array.from({ length: 10 }, (_, i) => pine(70 + i * 120, 760, 100, '#4F7F5A')).join('')}
       <rect y="760" width="${W}" height="140" fill="#3B6446"/>
       ${Array.from({ length: 7 }, (_, i) => pine(100 + i * 170, 900, 130, '#2B4D35')).join('')}`,
    ),

  'warm-dunes': () =>
    svg(
      grad('sky', [[0, '#F6C9A0'], [1, '#FCE7CF']]),
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       <circle cx="860" cy="260" r="70" fill="#FFF4E0"/>
       <path d="M0 560 C 260 440, 480 460, 700 560 S 1060 520, 1200 470 L1200 900 L0 900 Z" fill="#E7A26B"/>
       <path d="M0 680 C 220 600, 420 620, 640 700 S 1000 640, 1200 600 L1200 900 L0 900 Z" fill="#D8864F"/>
       <path d="M0 800 C 300 720, 600 760, 820 820 S 1100 780, 1200 760 L1200 900 L0 900 Z" fill="#C06E3C"/>`,
    ),

  'still-lake': () =>
    svg(
      grad('sky', [[0, '#F2B8C6'], [1, '#FBE3D6']]) + grad('lake', [[0, '#E9B3C2'], [1, '#B98FB0']]),
      `<rect width="${W}" height="${H}" fill="url(#sky)"/>
       <circle cx="600" cy="420" r="80" fill="#FFF0E2"/>
       ${ridge(5, 520, 110, '#9C7C9E')}
       <rect y="500" width="${W}" height="400" fill="url(#lake)"/>
       <rect x="520" y="540" width="160" height="6" rx="3" fill="#FFF0E2" opacity="0.8"/>
       <rect x="550" y="580" width="100" height="6" rx="3" fill="#FFF0E2" opacity="0.6"/>
       <rect x="570" y="620" width="60" height="6" rx="3" fill="#FFF0E2" opacity="0.4"/>
       ${Array.from({ length: 9 }, (_, i) => `<rect x="${60 + i * 26}" y="${700 - (i % 3) * 40}" width="8" height="${200 + (i % 3) * 40}" rx="4" fill="#5E4B63"/>`).join('')}`,
    ),
}

mkdirSync(out, { recursive: true })
for (const [name, draw] of Object.entries(scenes)) {
  const text = draw().replace(/\n\s+/g, '')
  writeFileSync(join(out, `${name}.svg`), text)
  console.log(`${name}.svg  ${text.length} bytes`)
}
