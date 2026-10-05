<script>
  import { WEEKDAYS, monthGrid, dayLabel } from '../lib/dates.js'

  /** @type {{ year: number, month: number, today: string, selected: string, counts: Record<string, number>, onselect: (key: string) => void }} */
  let { year, month, today, selected, counts, onselect } = $props()

  const days = $derived(monthGrid(year, month))

  /** Up to three markers per day; more than that still shows three. */
  const MAX_MARKS = 3
</script>

<div class="month">
  <div class="weekdays" aria-hidden="true">
    {#each WEEKDAYS as name (name)}
      <span>{name}</span>
    {/each}
  </div>

  <div class="grid" style:grid-template-rows={`repeat(${days.length / 7}, minmax(0, 1fr))`}>
    {#each days as day (day.key)}
      {@const count = counts[day.key] ?? 0}
      <button
        type="button"
        class="day"
        class:outside={!day.inMonth}
        class:today={day.key === today}
        class:selected={day.key === selected}
        aria-pressed={day.key === selected}
        aria-label={`${dayLabel(day.key)}${count ? `, ${count} event${count === 1 ? '' : 's'}` : ''}`}
        onclick={() => onselect(day.key)}
      >
        <span class="number mono">{day.day}</span>
        {#if count > 0}
          <span class="marks" aria-hidden="true">
            {#each Array.from({ length: Math.min(count, MAX_MARKS) }) as _, index (index)}
              <i></i>
            {/each}
          </span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .month {
    min-height: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 12px;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    padding: 0 14px;
    color: var(--gd-steel);
    font-family: var(--gd-font-mono);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .grid {
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }

  .day {
    position: relative;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 14px 14px;
    background: none;
    border: 1px solid var(--gd-graphite-600);
    border-radius: 12px;
    text-align: left;
  }

  .day:hover {
    background: var(--gd-graphite-700);
  }

  .number {
    font-size: 26px;
    font-weight: 500;
    line-height: 1.2;
  }

  .outside {
    border-color: transparent;
    color: var(--gd-steel);
  }

  .outside:hover {
    background: none;
    border-color: var(--gd-graphite-600);
  }

  .marks {
    display: flex;
    gap: 6px;
  }

  .marks i {
    width: 12px;
    height: 12px;
    background: var(--gd-steel);
  }

  .today {
    border: 2px solid var(--gd-signal);
    padding: 9px 13px 13px;
  }

  .today .number {
    color: var(--gd-glow);
    font-weight: 600;
  }

  .selected,
  .selected:hover {
    background: var(--gd-signal);
    border-color: var(--gd-signal);
    color: var(--gd-ink);
  }

  .selected .number {
    color: var(--gd-ink);
    font-weight: 600;
  }

  .selected .marks i {
    background: var(--gd-ink);
  }
</style>
