'use strict';

// ── Store Demo ──────────────────────────────────────────────────────────────

const keyInput    = document.getElementById('store-key');
const valueInput  = document.getElementById('store-value');
const btnSet      = document.getElementById('btn-set');
const btnGet      = document.getElementById('btn-get');
const resultEl    = document.getElementById('store-result');

btnSet.addEventListener('click', async () => {
  const key   = keyInput.value.trim();
  const value = valueInput.value.trim();
  if (!key) return;

  await window.electronAPI.storeSet(key, value);
  resultEl.textContent = `✅ Saved "${key}" = "${value}"`;
});

btnGet.addEventListener('click', async () => {
  const key = keyInput.value.trim();
  if (!key) return;

  const value = await window.electronAPI.storeGet(key);
  resultEl.textContent = value !== undefined
    ? `🔍 "${key}" = "${value}"`
    : `⚠️  Key "${key}" not found`;
});

// ── System Info ─────────────────────────────────────────────────────────────

const sysInfo = document.getElementById('sys-info');

const info = {
  Platform: window.electronAPI.platform,
  'User Agent': navigator.userAgent.split(' ').slice(-1)[0],
  Language: navigator.language,
  'Hardware Concurrency': navigator.hardwareConcurrency + ' cores',
  'Device Memory': navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'N/A',
};

for (const [label, value] of Object.entries(info)) {
  const li = document.createElement('li');
  li.innerHTML = `<span>${label}</span><span>${value}</span>`;
  sysInfo.appendChild(li);
}
