'use strict';

const { contextBridge, ipcRenderer } = require('electron');

/**
 * Exposes a safe, typed API to the renderer process via window.electronAPI.
 * Only explicitly listed methods are exposed — no raw ipcRenderer access.
 */
contextBridge.exposeInMainWorld('electronAPI', {
  // ── Store ──────────────────────────────────────────────────────────────────
  /**
   * Gets a value from the persistent store.
   * @param {string} key
   * @returns {Promise<any>}
   */
  storeGet: (key) => ipcRenderer.invoke('store:get', key),

  /**
   * Sets a value in the persistent store.
   * @param {string} key
   * @param {any} value
   * @returns {Promise<void>}
   */
  storeSet: (key, value) => ipcRenderer.invoke('store:set', key, value),

  // ── Platform Info ──────────────────────────────────────────────────────────
  /**
   * The current platform (win32, darwin, linux).
   * @type {string}
   */
  platform: process.platform,
});
