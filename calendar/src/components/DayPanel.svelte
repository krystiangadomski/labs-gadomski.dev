<script>
  import { dayLabel } from '../lib/dates.js'
  import { isValidTime } from '../lib/events.js'

  /** @type {{ date: string, isToday: boolean, events: import('../lib/events.js').CalendarEvent[], onadd: (draft: { title: string, time: string }) => void, ondelete: (id: number) => void }} */
  let { date, isToday, events, onadd, ondelete } = $props()

  let title = $state('')
  let time = $state('09:00')

  /** @param {SubmitEvent} event */
  function submit(event) {
    event.preventDefault()
    if (title.trim() === '' || !isValidTime(time)) return
    onadd({ title, time })
    title = ''
  }
</script>

<section class="panel" aria-labelledby="day-heading">
  <div class="top">
    <p class="kicker mono">{isToday ? 'Today' : 'Selected day'}</p>
    <h2 id="day-heading">{dayLabel(date)}</h2>
  </div>

  <form class="add" onsubmit={submit}>
    <input
      class="title-input"
      type="text"
      bind:value={title}
      placeholder="New event"
      aria-label="Event title"
      autocomplete="off"
    />
    <input class="time-input mono" type="time" bind:value={time} aria-label="Event time" required />
    <button type="submit">Add</button>
  </form>

  {#if events.length > 0}
    <ul class="events">
      {#each events as event (event.id)}
        <li>
          <span class="time mono">{event.time}</span>
          <span class="title">{event.title}</span>
          <button type="button" class="delete" aria-label={`Delete ${event.title}`} onclick={() => ondelete(event.id)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty">No events yet.</p>
  {/if}
</section>

<style>
  .panel {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto minmax(0, 1fr);
    align-content: start;
    gap: 20px;
    padding: 26px 28px 28px;
    background: var(--gd-graphite-700);
    border-radius: 16px;
  }

  .kicker {
    color: var(--gd-glow);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h2 {
    margin-top: 6px;
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 40px;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }

  .events {
    list-style: none;
    min-height: 0;
    overflow-y: auto;
    align-self: start;
  }

  li {
    display: flex;
    align-items: center;
    gap: 18px;
    min-height: 60px;
    border-top: 1px solid var(--gd-graphite-600);
  }

  li:last-child {
    border-bottom: 1px solid var(--gd-graphite-600);
  }

  .time {
    font-size: 22px;
    font-weight: 500;
  }

  .title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .delete {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: none;
    border: none;
    border-radius: 8px;
    color: var(--gd-paper);
    opacity: 0;
  }

  li:hover .delete,
  .delete:focus-visible {
    opacity: 1;
  }

  .delete:hover {
    background: var(--gd-graphite-600);
  }

  .delete svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
  }

  .empty {
    align-self: start;
    color: var(--gd-steel);
    font-size: 24px;
  }

  .add {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
  }

  input {
    height: 60px;
    min-width: 0;
    padding: 0 16px;
    background: var(--gd-graphite-900);
    border: 1px solid var(--gd-graphite-600);
    border-radius: 12px;
  }

  input::placeholder {
    color: var(--gd-steel);
  }

  input:focus {
    outline: none;
    border-color: var(--gd-paper);
  }

  .title-input {
    grid-column: 1 / -1;
  }

  .time-input {
    width: 100%;
    padding: 0 12px;
    font-size: 21px;
    color-scheme: dark;
  }

  .add button {
    height: 60px;
    padding: 0 36px;
    background: var(--gd-paper);
    color: var(--gd-ink);
    border: none;
    border-radius: 12px;
    font-weight: 600;
  }
</style>
