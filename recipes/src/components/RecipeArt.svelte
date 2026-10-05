<script>
  // Flat illustrations drawn for this app, one per recipe, in the Graphite palette only:
  // Spotlight #4A5059 and Graphite Raised #3A3F47 for plates and pans, Steel #9AA0A8 and Paper #FFFFFF
  // for the food. No photos and no outside assets. The blue accent is kept for selected states.

  /** @type {{ art: string }} */
  let { art } = $props()
</script>

<svg viewBox="0 0 240 150" aria-hidden="true" focusable="false">
  {#if art === 'pancakes'}
    <ellipse cx="120" cy="122" rx="92" ry="14" fill="#4A5059" />
    <rect x="62" y="100" width="116" height="18" rx="9" fill="#9AA0A8" />
    <rect x="58" y="82" width="124" height="18" rx="9" fill="#FFFFFF" />
    <rect x="64" y="64" width="112" height="18" rx="9" fill="#9AA0A8" />
    <rect x="60" y="46" width="120" height="18" rx="9" fill="#FFFFFF" />
    <rect x="108" y="34" width="26" height="14" rx="3" fill="#9AA0A8" />
    <circle cx="44" cy="116" r="7" fill="#FFFFFF" />
    <circle cx="196" cy="118" r="7" fill="#FFFFFF" />
    <circle cx="208" cy="110" r="5" fill="#9AA0A8" />
  {:else if art === 'shakshuka'}
    <rect x="164" y="68" width="66" height="14" rx="7" fill="#4A5059" />
    <circle cx="112" cy="75" r="62" fill="#4A5059" />
    <circle cx="112" cy="75" r="52" fill="#3A3F47" />
    <circle cx="88" cy="58" r="16" fill="#FFFFFF" />
    <circle cx="88" cy="58" r="7" fill="#9AA0A8" />
    <circle cx="134" cy="62" r="16" fill="#FFFFFF" />
    <circle cx="134" cy="62" r="7" fill="#9AA0A8" />
    <circle cx="110" cy="100" r="16" fill="#FFFFFF" />
    <circle cx="110" cy="100" r="7" fill="#9AA0A8" />
    <circle cx="70" cy="92" r="3" fill="#9AA0A8" />
    <circle cx="146" cy="96" r="3" fill="#9AA0A8" />
    <circle cx="112" cy="36" r="3" fill="#9AA0A8" />
  {:else if art === 'porridge'}
    <path d="M44 66 H196 A76 62 0 0 1 44 66 Z" fill="#4A5059" />
    <ellipse cx="120" cy="66" rx="76" ry="14" fill="#FFFFFF" />
    <circle cx="96" cy="62" r="8" fill="#9AA0A8" />
    <circle cx="114" cy="66" r="8" fill="#3A3F47" />
    <circle cx="132" cy="61" r="8" fill="#9AA0A8" />
    <circle cx="150" cy="66" r="6" fill="#3A3F47" />
    <rect x="96" y="124" width="48" height="8" rx="4" fill="#4A5059" />
    <path d="M100 28 q8 -10 0 -20 M120 32 q8 -10 0 -20 M140 28 q8 -10 0 -20" stroke="#4A5059" stroke-width="4" fill="none" stroke-linecap="round" />
  {:else if art === 'spaghetti'}
    <circle cx="120" cy="75" r="64" fill="#3A3F47" />
    <circle cx="120" cy="75" r="50" fill="#4A5059" />
    <path d="M125.0 75.0 L125.2 75.7 L125.3 76.4 L125.2 77.2 L125.1 78.0 L124.7 78.8 L124.3 79.6 L123.6 80.3 L122.9 80.9 L122.0 81.5 L121.0 81.9 L119.9 82.2 L118.8 82.4 L117.6 82.3 L116.3 82.2 L115.1 81.8 L113.9 81.3 L112.8 80.6 L111.8 79.7 L110.9 78.6 L110.2 77.5 L109.7 76.2 L109.3 74.8 L109.2 73.4 L109.3 71.9 L109.7 70.4 L110.3 69.0 L111.1 67.6 L112.2 66.4 L113.5 65.2 L115.0 64.2 L116.7 63.5 L118.5 62.9 L120.4 62.6 L122.3 62.5 L124.3 62.8 L126.3 63.2 L128.2 64.0 L130.0 65.0 L131.7 66.3 L133.1 67.8 L134.3 69.5 L135.3 71.4 L136.0 73.4 L136.3 75.5 L136.3 77.7 L136.0 79.9 L135.3 82.1 L134.2 84.1 L132.8 86.1 L131.1 87.8 L129.2 89.4 L126.9 90.7 L124.5 91.6 L121.9 92.3 L119.1 92.6 L116.4 92.5 L113.6 92.1 L110.9 91.3 L108.3 90.1 L105.9 88.6 L103.7 86.7 L101.8 84.6 L100.3 82.2 L99.1 79.6 L98.4 76.8 L98.1 73.9 L98.2 71.0 L98.8 68.1 L99.9 65.3 L101.4 62.6 L103.3 60.1 L105.7 57.8 L108.4 55.9 L111.4 54.4 L114.6 53.2 L118.0 52.5 L121.6 52.2 L125.1 52.4 L128.7 53.1 L132.1 54.3 L135.4 55.9 L138.4 58.0 L141.0 60.4 L143.3 63.2 L145.1 66.3 L146.5 69.7 L147.3 73.2 L147.6 76.8 L147.2 80.5 L146.3 84.1 L144.9 87.6 L142.9 90.9 L140.4 93.9 L137.4 96.6 L133.9 98.8 L130.2 100.7 L126.1 102.0 L121.9 102.7 L117.5 102.9 L113.2 102.5 L108.9 101.6 L104.7 100.1 L100.8 98.0 L97.3 95.4 L94.1 92.3 L91.5 88.8 L89.4 85.0 L87.9 80.9 L87.0 76.6 L86.8 72.3 L87.4 67.9 L88.6 63.6 L90.5 59.4 L93.0 55.5 L96.1 52.0 L99.8 48.9 L103.9 46.3 L108.5 44.3 L113.3 42.8 L118.4 42.0 L123.6 41.9 L128.7 42.5 L133.8 43.8 L138.6 45.7 L143.2 48.3 L147.3 51.4 L150.9 55.1 L153.9 59.3 L156.2 63.8 L157.8 68.7 L158.7 73.7 L158.7 78.9 L158.0 84.0 L156.4 89.0 L154.1 93.7 L151.0 98.2 L147.3 102.2 L142.9 105.7 L138.0 108.6 L132.7 110.9" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M156 75 C164 92 150 112 128 114" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
    <circle cx="112" cy="64" r="14" fill="#9AA0A8" />
    <circle cx="107" cy="61" r="3" fill="#3A3F47" />
    <circle cx="117" cy="68" r="3" fill="#3A3F47" />
    <rect x="200" y="20" width="6" height="110" rx="3" fill="#4A5059" />
  {:else if art === 'curry'}
    <circle cx="120" cy="75" r="64" fill="#3A3F47" />
    <circle cx="120" cy="75" r="50" fill="#4A5059" />
    <path d="M120 25 A50 50 0 0 0 120 125 Z" fill="#FFFFFF" />
    <path d="M120 25 A50 50 0 0 1 120 125 Z" fill="#9AA0A8" />
    <rect x="132" y="50" width="16" height="14" rx="4" fill="#4A5059" />
    <rect x="148" y="78" width="14" height="14" rx="4" fill="#4A5059" />
    <rect x="128" y="92" width="16" height="14" rx="4" fill="#4A5059" />
    <ellipse cx="152" cy="58" rx="6" ry="3" fill="#FFFFFF" transform="rotate(-30 152 58)" />
    <circle cx="100" cy="60" r="3" fill="#9AA0A8" />
    <circle cx="94" cy="88" r="3" fill="#9AA0A8" />
    <circle cx="106" cy="104" r="3" fill="#9AA0A8" />
  {:else if art === 'pizza'}
    <circle cx="120" cy="75" r="64" fill="#9AA0A8" />
    <circle cx="120" cy="75" r="54" fill="#4A5059" />
    <circle cx="96" cy="56" r="11" fill="#FFFFFF" />
    <circle cx="142" cy="58" r="11" fill="#FFFFFF" />
    <circle cx="94" cy="98" r="11" fill="#FFFFFF" />
    <circle cx="146" cy="100" r="11" fill="#FFFFFF" />
    <ellipse cx="104" cy="80" rx="7" ry="4" fill="#9AA0A8" transform="rotate(30 104 80)" />
    <ellipse cx="132" cy="94" rx="7" ry="4" fill="#9AA0A8" transform="rotate(-30 132 94)" />
    <g stroke="#1C1F23" stroke-width="3">
      <line x1="120" y1="11" x2="120" y2="139" />
      <line x1="56" y1="75" x2="184" y2="75" />
    </g>
  {:else if art === 'tomatoSoup'}
    <circle cx="120" cy="75" r="62" fill="#FFFFFF" />
    <circle cx="120" cy="75" r="50" fill="#4A5059" />
    <path d="M96 76 C96 56 132 54 136 72 C140 88 112 94 108 80" stroke="#9AA0A8" stroke-width="5" fill="none" stroke-linecap="round" />
    <ellipse cx="146" cy="56" rx="12" ry="6" fill="#9AA0A8" transform="rotate(-35 146 56)" />
    <ellipse cx="156" cy="70" rx="10" ry="5" fill="#9AA0A8" transform="rotate(15 156 70)" />
    <rect x="186" y="62" width="44" height="10" rx="5" fill="#4A5059" />
  {:else if art === 'pumpkinSoup'}
    <path d="M40 68 H200 A80 60 0 0 1 40 68 Z" fill="#9AA0A8" />
    <ellipse cx="120" cy="68" rx="80" ry="14" fill="#4A5059" />
    <path d="M92 66 q28 -10 56 0" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="104" cy="70" rx="5" ry="3" fill="#FFFFFF" />
    <ellipse cx="128" cy="72" rx="5" ry="3" fill="#FFFFFF" />
    <ellipse cx="142" cy="68" rx="5" ry="3" fill="#FFFFFF" />
    <rect x="98" y="126" width="44" height="8" rx="4" fill="#4A5059" />
    <path d="M100 32 q8 -10 0 -20 M120 36 q8 -10 0 -20 M140 32 q8 -10 0 -20" stroke="#4A5059" stroke-width="4" fill="none" stroke-linecap="round" />
  {:else if art === 'noodleSoup'}
    <circle cx="120" cy="75" r="62" fill="#9AA0A8" />
    <circle cx="120" cy="75" r="50" fill="#4A5059" />
    <g fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round">
      <path d="M80 60 q10 -8 20 0 t20 0 t20 0 t20 0" />
      <path d="M76 76 q10 -8 20 0 t20 0 t20 0 t20 0 t8 0" />
      <path d="M84 92 q10 -8 20 0 t20 0 t20 0 t16 0" />
    </g>
    <circle cx="98" cy="104" r="7" fill="#9AA0A8" />
    <circle cx="136" cy="44" r="7" fill="#9AA0A8" />
    <circle cx="150" cy="104" r="6" fill="#3A3F47" />
    <ellipse cx="200" cy="100" rx="12" ry="16" fill="#4A5059" />
    <rect x="196" y="20" width="8" height="70" rx="4" fill="#4A5059" />
  {:else if art === 'crumble'}
    <rect x="36" y="64" width="168" height="60" rx="14" fill="#4A5059" />
    <rect x="24" y="74" width="16" height="10" rx="5" fill="#4A5059" />
    <rect x="200" y="74" width="16" height="10" rx="5" fill="#4A5059" />
    <path d="M44 72 q10 -16 20 -4 q10 -14 22 -2 q10 -16 22 -2 q10 -14 22 -2 q12 -16 22 -2 q10 -14 22 -2 q8 -12 18 0 v8 H44 Z" fill="#FFFFFF" />
    <circle cx="70" cy="74" r="3" fill="#9AA0A8" />
    <circle cx="118" cy="72" r="3" fill="#9AA0A8" />
    <circle cx="164" cy="74" r="3" fill="#9AA0A8" />
    <path d="M96 40 q8 -10 0 -20 M120 44 q8 -10 0 -20 M144 40 q8 -10 0 -20" stroke="#4A5059" stroke-width="4" fill="none" stroke-linecap="round" />
  {:else if art === 'mousse'}
    <path d="M78 34 H162 L148 112 H92 Z" fill="#3A3F47" />
    <path d="M84 60 H156 L148 112 H92 Z" fill="#4A5059" />
    <ellipse cx="120" cy="54" rx="34" ry="12" fill="#FFFFFF" />
    <circle cx="128" cy="44" r="6" fill="#9AA0A8" />
    <rect x="114" y="112" width="12" height="16" fill="#3A3F47" />
    <ellipse cx="120" cy="132" rx="34" ry="6" fill="#3A3F47" />
    <rect x="170" y="40" width="8" height="84" rx="4" fill="#4A5059" transform="rotate(12 174 82)" />
  {:else if art === 'bananaBread'}
    <path d="M40 72 Q40 40 110 40 Q170 40 170 72 V118 H40 Z" fill="#9AA0A8" />
    <path d="M62 56 q20 -12 40 0 M108 54 q20 -12 40 0" stroke="#4A5059" stroke-width="4" fill="none" stroke-linecap="round" />
    <rect x="178" y="58" width="22" height="60" rx="4" fill="#9AA0A8" />
    <rect x="183" y="64" width="12" height="48" rx="3" fill="#FFFFFF" />
    <circle cx="189" cy="78" r="2" fill="#4A5059" />
    <circle cx="189" cy="96" r="2" fill="#4A5059" />
    <rect x="28" y="118" width="184" height="8" rx="4" fill="#4A5059" />
  {:else}
    <circle cx="120" cy="75" r="62" fill="#3A3F47" />
    <circle cx="120" cy="75" r="48" fill="#4A5059" />
  {/if}
</svg>

<style>
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
