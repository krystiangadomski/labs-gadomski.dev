<script>
  /** @type {{ filled: boolean, size?: number }} */
  let { filled, size = 24 } = $props()
</script>

<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
  <path
    d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
  />
</svg>
