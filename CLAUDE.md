# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Course exercise (HUST, Web Technology, 20261): a user-management CRUD app in React. Spec: `Ex. React-CRUD - 20261.pdf` (in Vietnamese). The PDF's structure is damaged and the Read tool renders blank pages, but text extracts with `pdftotext -enc UTF-8 -layout "Ex. React-CRUD - 20261.pdf" -`.

## Stack (mandated by the spec)

- A single HTML file with `<div id="root">`, React 18 + ReactDOM 18 UMD + `@babel/standalone` loaded from unpkg CDN, and the code in `<script type="text/babel">`. No bundler, no npm, no build step: open the HTML in a browser (or serve it statically) to run it.
- Functional components with `React.useState` / `React.useEffect` (globals, not imports).
- Data: `GET https://jsonplaceholder.typicode.com/users`, fetched once on mount. All create/update/delete operations are local state only (nothing is persisted).
- Deploy as a static site (any static host). The report must include the live URL.

## Architecture (graded; keep the names and the data flow)

```
App
├── SearchForm   props: onChangeValue = setKeyword
├── AddUser      props: onAdd = setNewUser
└── ResultTable  props: keyword = kw, user = newUser, onAdded = () => setNewUser(null)
```

- `App` holds only the shared state: `kw` and `newUser` (state lifting). Data flows SearchForm → App → ResultTable and AddUser → App → ResultTable.
- `ResultTable` owns `users`, `loading` and `editing`. It filters by `keyword` on `name`/`username`, case-insensitive. `useEffect([user])` appends the new user, then calls `onAdded()` to reset `newUser`.
- `AddUser` is a controlled form with a nested `address {street, suite, city}`. Updates must spread both levels: `{...user, address: {...user.address, [id]: value}}`. Name and Username are required (`alert` otherwise).
- Edit: `editUser` deep-copies `{...u, address: {...u.address}}` into `editing`. Save uses `users.map` to replace by id.
- Delete: `setUsers(prev => prev.filter(u => u.id !== id))`, with no confirmation.
- The add and edit forms render in a modal (`.modal-overlay` / `.modal-content` CSS from the spec).

## Bugs in the spec's sample code (fix them; they are good material for report item 4)

- `onClick={setAdding(false)}` calls the setter during render, which causes a "Too many re-renders" error. Use `onClick={() => setAdding(false)}`.
- New ids use `prev.length + 1`, which duplicates an existing id after a delete (duplicate `key` warning, wrong row edited or deleted). Use `Math.max(0, ...prev.map(u => u.id)) + 1`.
- `useEffect([user])` omits `onAdded` from its deps (only matters if a linter is added).

## Report deliverables

1. Component tree diagram.
2. Data-flow / state-lifting diagram: why `kw` and `newUser` live in `App` (their sibling `ResultTable` consumes them).
3. Table of props passed from `App` to each child.
4. At least one Warning/Error hit while coding: symptom, cause, fix.
5. Hosted app URL and report URL.
