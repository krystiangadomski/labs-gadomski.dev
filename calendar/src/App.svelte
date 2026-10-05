<script>
  import MonthGrid from './components/MonthGrid.svelte'
  import DayPanel from './components/DayPanel.svelte'
  import UpcomingList from './components/UpcomingList.svelte'
  import { monthLabel, shiftMonth, toKey, toTime, fromKey } from './lib/dates.js'
  import { addEvent, removeEvent, eventsOn, countByDay, upcoming } from './lib/events.js'
  import { loadEvents, saveEvents } from './lib/storage.js'
  import { seedEvents } from './lib/seed.js'
  import wordmark from './assets/wordmark-mono-paper.svg'

  const now = new Date()
  const today = toKey(now)

  let events = $state(loadEvents(localStorage, seedEvents(now)))
  let selected = $state(today)
  let shown = $state({ year: now.getFullYear(), month: now.getMonth() })

  const dayEvents = $derived(eventsOn(events, selected))
  const counts = $derived(countByDay(events))
  const next = $derived(upcoming(events, today, toTime(now), 4))

  $effect(() => {
    saveEvents(localStorage, events)
  })

  /** @param {number} delta */
  function moveMonth(delta) {
    shown = shiftMonth(shown, delta)
  }

  /** @param {string} key */
  function select(key) {
    selected = key
    const date = fromKey(key)
    shown = { year: date.getFullYear(), month: date.getMonth() }
  }
</script>

<div class="page">
  <main class="calendar">
    <header>
      <img class="wordmark" src={wordmark} alt="Gadomski.DEV" />
      <div class="heading">
        <h1 aria-live="polite">{monthLabel(shown.year, shown.month)}</h1>
        <nav class="nav" aria-label="Change month">
          <button type="button" class="today" onclick={() => select(today)}>Today</button>
          <button type="button" class="arrow" aria-label="Previous month" onclick={() => moveMonth(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" class="arrow" aria-label="Next month" onclick={() => moveMonth(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </nav>
      </div>
    </header>

    <MonthGrid year={shown.year} month={shown.month} {today} {selected} {counts} onselect={select} />
  </main>

  <aside class="side">
    <DayPanel
      date={selected}
      isToday={selected === today}
      events={dayEvents}
      onadd={(draft) => (events = addEvent(events, { ...draft, date: selected }))}
      ondelete={(id) => (events = removeEvent(events, id))}
    />
    <UpcomingList events={next} {today} onselect={select} />
  </aside>
</div>

<style>
  .page {
    height: 100vh;
    max-width: 1720px;
    margin: 0 auto;
    padding: 32px 40px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 470px;
    gap: 40px;
  }

  .calendar {
    min-height: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 24px;
  }

  header {
    display: grid;
    gap: 22px;
  }

  .wordmark {
    height: 22px;
    width: auto;
    justify-self: start;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  h1 {
    font-family: var(--gd-font-display);
    font-weight: 700;
    font-size: 64px;
    line-height: 1;
    letter-spacing: -0.015em;
    padding-top: 6px;
  }

  .nav {
    display: flex;
    gap: 12px;
  }

  .nav button {
    height: 56px;
    background: none;
    border: 1px solid var(--gd-graphite-600);
    border-radius: 12px;
  }

  .nav button:hover {
    background: var(--gd-graphite-700);
  }

  .today {
    padding: 0 24px;
    font-weight: 600;
  }

  .arrow {
    width: 56px;
    display: grid;
    place-items: center;
  }

  .arrow svg {
    width: 26px;
    height: 26px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.25;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .side {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 24px;
  }
</style>
