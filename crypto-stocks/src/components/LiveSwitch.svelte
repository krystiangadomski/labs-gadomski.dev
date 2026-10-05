<script>
  /** @type {{ on: boolean, ontoggle: () => void }} */
  let { on, ontoggle } = $props()
</script>

<button type="button" role="switch" aria-checked={on} class:on onclick={ontoggle}>
  <span class="track" aria-hidden="true"><span class="knob"></span></span>
  Live prices
</button>

<style>
  button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
    background: none;
    border: none;
    font-size: 22px;
    font-weight: 500;
  }

  /* No accent here on purpose: the one accent is for the selected coin, range and the line. */
  .track {
    position: relative;
    width: 52px;
    height: 30px;
    border: 2px solid var(--gd-steel);
    border-radius: 15px;
  }

  .knob {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--gd-steel);
    transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .on .track {
    border-color: var(--gd-paper);
  }

  .on .knob {
    background: var(--gd-paper);
    transform: translateX(22px);
  }
</style>
