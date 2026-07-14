# Kanban Board — Design

## Component Tree

```text
App
├── Header
└── Board
    ├── TaskForm (AddCardForm)
    └── Column (looped over distinct column values)
        └── Card (looped over cards filtered by column)
            └── EditCardForm (rendered conditionally when Card is in edit mode)
```

## State Ownership

| State                                               | Owner                                                           | Reason                                                                                                            |
| --------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `cards` (array of card objects)                     | `Board` (via `useBoardState` custom hook wrapping `useReducer`) | Mutates constantly (add/edit/delete/move); only `Board` needs the full set, children get filtered slices as props |
| `theme` ('light' \| 'dark')                         | `ThemeContext` (provider in `App`)                              | Broadcast/read-everywhere data — every component needs to read it for styling, but almost nothing writes it       |
| `isEditing` (boolean)                               | `Card` (local `useState`)                                       | Only that one `Card` instance cares; lifting it up would force re-renders of the whole board on every edit toggle |
| `newCardTitle` / `newCardDescription` (form drafts) | `AddCardForm` (local `useState`)                                | Transient input state, irrelevant to any other component until submit                                             |
| `editTitle` / `editDescription` (edit form drafts)  | `EditCardForm` (local `useState`)                               | Same as above — scoped to the in-progress edit, discarded on cancel                                               |

## Why Board State Stays Out of Context

- **Context broadcasts to every consumer on every change.** Board state changes on nearly every user action (typing, dragging, deleting). If it lived in Context, every component reading any slice of it would re-render on every keystroke, regardless of whether that slice changed.
- **Board state is consumed by specific components in specific shapes** (a `Column` needs its filtered cards, a `Card` needs one card). Prop-drilling one level (`Board` → `Column` → `Card`) is shallow enough that Context buys no ergonomic win, but costs re-render control.
- **A scoped reducer keeps mutation logic colocated and testable** — one `boardReducer` function with clear action types, independent of React's render tree.

## Why Theme Goes In Context

- **Theme is read broadly, written rarely.** Nearly every styled component needs to know light/dark, but only one control (probably in `Header`) ever changes it.
- **Prop-drilling theme through every level** (`App` → `Board` → `Header`/`Column`/`Card`/`EditCardForm`) would mean threading a prop through components that don't otherwise care about it, purely to pass it further down.
- **Infrequent writes mean the re-render cost of Context is a non-issue** — toggling theme twice a session doesn't create the perf problem that constant card mutation would.

## Card IDs

- Generated via `crypto.randomUUID()` at creation time, stored on the card object as `id`.
- Used directly as React `key` in the `Card` loop — never array index, since index shifts on delete/reorder and would cause React to misattribute local state (like `isEditing`) to the wrong card.

## Immutable Mutation Patterns

All mutations happen inside `boardReducer` (or equivalent handlers in `useBoardState`):

| Action               | Pattern                                                         |
| -------------------- | --------------------------------------------------------------- |
| Add card             | `[...cards, newCard]`                                           |
| Edit card            | `cards.map(c => c.id === id ? { ...c, ...updates } : c)`        |
| Delete card          | `cards.filter(c => c.id !== id)`                                |
| Move between columns | `cards.map(c => c.id === id ? { ...c, column: newColumn } : c)` |

No `.push()`, `.splice()`, or direct property assignment on card objects anywhere.

## `useLocalStorage(key, initialValue)` Hook Plan

```
useLocalStorage(key, initialValue):
  - useState initialized lazily: read localStorage[key], JSON.parse if present, else initialValue
  - useEffect on value change: JSON.stringify(value) → localStorage.setItem(key, ...)
  - return [value, setValue] — same interface as useState
```

**Usage:**

- Board state: `useBoardState` initializes its reducer's state from `useLocalStorage('kanban-cards', [])`, and writes back on every dispatch (or via the hook's built-in effect).
- Theme: `ThemeContext` provider uses `useLocalStorage('kanban-theme', 'light')` directly as its state, so theme persists across reloads with zero extra code.

## Open Decision

`useBoardState` is specified here as `useReducer`-based (action types: `ADD_CARD`, `EDIT_CARD`, `DELETE_CARD`, `MOVE_CARD`). If a plain `useState` + handler-functions approach is preferred instead (less boilerplate, less structure), swap the reducer for direct `setCards(prev => ...)` calls inside named handler functions — the state-ownership table and mutation patterns above stay identical either way.
