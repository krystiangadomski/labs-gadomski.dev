<script>
  import { shortDayLabel } from '../lib/dates.js'

  /** @type {{ events: import('../lib/events.js').CalendarEvent[], today: string, onselect: (key: string) => void }} */
  let { events, today, onselect } = $props()
</script>

<section class="upcoming" aria-labelledby="upcoming-heading">
  <h2 id="upcoming-heading" class="mono">Upcoming</h2>
  {#if events.length > 0}
    <ul>
      {#each events as event (event.id)}
        <li>
          <button type="button" onclick={() => onselect(event.date)}>
            <span class="when mono">{event.date === today ? 'Today' : shortDayLabel(event.date)}</span>
            <span class="time mono">{event.time}</span>
            <span class="title">{event.title}</span>
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty">Nothing coming up.</p>
  {/if}
</section>

<style>
  .upcoming {
    display: grid;
    gap: 10px;
  }

  h2 {
    color: var(--gd-steel);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
  }

  button {
    width: 100%;
    display: grid;
    grid-template-columns: 128px 76px minmax(0, 1fr);
    align-items: center;
    gap: 12px;
    min-height: 52px;
    padding: 0 4px;
    background: none;
    border: none;
    border-top: 1px solid var(--gd-graphite-600);
    text-align: left;
  }

  li:last-child button {
    border-bottom: 1px solid var(--gd-graphite-600);
  }

  button:hover {
    background: var(--gd-graphite-700);
  }

  .when {
    color: var(--gd-steel);
    font-size: 19px;
  }

  .time {
    font-size: 19px;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .empty {
    color: var(--gd-steel);
  }
</style>
