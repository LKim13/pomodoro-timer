# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the app in development mode (electron-vite dev server + Electron window)
- `npm run build` — compile all three layers (main, preload, renderer) to `out/`
- `npm run preview` — run the built app locally
- `npm run package` — create a Windows NSIS installer (Chinese language, `dist-electron/`)

No test runner is configured. There are no automated tests in this project.

## Architecture

This is an Electron + React Pomodoro timer app (Chinese UI, "番茄钟"). It uses **electron-vite** to build three separate targets that cannot import from each other directly:

- **main** (`src/main/`) — Node.js process. Uses `externalizeDepsPlugin()`, so Electron/Node deps stay external. Output: `out/main/index.js`
- **preload** (`src/preload/`) — Sandboxed bridge. Also uses `externalizeDepsPlugin()`. Output: `out/preload/index.js`
- **renderer** (`src/renderer/`) — React web app. Built with `@vitejs/plugin-react()`. Has aliases `@renderer` → `src/renderer/src`, `@shared` → `src/shared`. Output: `out/renderer/`

### Shared types problem

`src/shared/types.ts` and `src/renderer/src/types/timer.ts` contain **identical** content because the renderer build cannot import from `../shared/` (it's outside the renderer root). When modifying types, constants, or IPC channels, you must update **both files** to keep them in sync. The main and preload processes import from `src/shared/types.ts`.

### IPC communication

All renderer ↔ main communication goes through the preload `contextBridge` (`window.api`). Channel names are defined in `IPC_CHANNELS` (shared types). Pattern:

- **invoke/handle** (async RPC): `store:getSettings`, `store:updateSettings`, `store:getStatistics`, `store:recordPomodoro`, `timer:notify`
- **send/on** (fire-and-forget): `tray:updateTooltip`

The renderer never has direct Node/Electron access (`contextIsolation: true`, `nodeIntegration: false`).

### Timer engine

The timer uses **Date.now-based timing** — `startedAt` captures the start timestamp, and `tick()` computes `timeRemaining = totalDuration - floor((Date.now() - startedAt) / 1000)` each 100ms interval. This prevents drift when the window is backgrounded or the system sleeps. `pause()` clears `startedAt`, so resuming must call `start()` with the remaining duration.

### Persistence

- **Main process**: `electron-store` (v8, CJS-compatible) stores `settings` and `statistics` in `%APPDATA%/pomodoro-timer/`. All writes go through IPC to the main process — the renderer never writes to disk directly.
- **Renderer process**: Three zustand stores (`timerStore`, `settingsStore`, `statsStore`) hold live state. `settingsStore` and `statsStore` hydrate from main-process data on mount via `useStoreSync()` hook, then persist changes back through IPC.

### Key constraints

- **Close-to-tray**: Window `close` event is intercepted (`e.preventDefault()` + `hide`) unless `app.isQuitting` is true. The tray menu "退出" button sets `isQuitting` and calls `app.quit()`.
- **Single instance**: `app.requestSingleInstanceLock()` prevents duplicate windows; `second-instance` event shows the existing window.
- **Sound protocol**: A custom `sound://` protocol registered in the main process serves audio files from `resources/` via `net.fetch()`, because `<audio>` elements cannot play files inside an ASAR archive.
- **electron-store v8**: Must remain at v8.x. v10+ is pure ESM and cannot be `require()`d by the CJS main process output.