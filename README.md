# Agent Harness — Electron.js Boilerplate

A modern, secure Electron.js starter with best practices baked in.

## Features

- ✅ **Context Isolation** + **Preload bridge** — no direct Node.js access in renderer
- ✅ **Persistent store** via `electron-store`
- ✅ **IPC** pattern with `ipcMain.handle` / `ipcRenderer.invoke`
- ✅ **Window bounds memory** — restores size/position on relaunch
- ✅ **Native application menu**
- ✅ **electron-builder** config for Windows, macOS & Linux
- ✅ **Content-Security-Policy** header in HTML
- ✅ Dark UI with CSS custom properties

## Project Structure

```
Agent Harness/
├── assets/
│   └── icons/          # App icons (.ico, .icns, .png)
├── src/
│   ├── main/
│   │   └── main.js     # Main process (Node.js / Electron APIs)
│   ├── preload/
│   │   └── preload.js  # Secure IPC bridge
│   └── renderer/
│       ├── index.html  # UI entry point
│       ├── styles/
│       │   └── main.css
│       └── scripts/
│           └── app.js  # Renderer logic
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Install & Run

```bash
# Install dependencies
npm install

# Start the app
npm start

# Start with hot-reload (requires nodemon)
npm run dev
```

### Build Distributable

```bash
npm run build:win    # Windows (.exe installer)
npm run build:mac    # macOS (.dmg)
npm run build:linux  # Linux (.AppImage)
```

## Security Notes

- The renderer process has **no direct Node.js access** (`nodeIntegration: false`)
- All Node.js/Electron APIs are exposed explicitly through the **preload script** via `contextBridge`
- A strict **Content-Security-Policy** is set in `index.html`

## Adding IPC Channels

1. Add a handler in `src/main/main.js`:
   ```js
   ipcMain.handle('my-channel', async (_event, ...args) => {
     // do something
     return result;
   });
   ```
2. Expose it in `src/preload/preload.js`:
   ```js
   myMethod: (...args) => ipcRenderer.invoke('my-channel', ...args),
   ```
3. Call it from the renderer:
   ```js
   const result = await window.electronAPI.myMethod(...args);
   ```
