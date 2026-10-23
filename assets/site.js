(() => {
  const storageKey = 'stackarmor-vdr-readiness-v1';
  const checks = [...document.querySelectorAll('[data-readiness]')];
  const status = document.querySelector('[data-progress-text]');
  const fill = document.querySelector('[data-progress-fill]');
  const update = () => {
    if (!checks.length) return;
    const done = checks.filter(input => input.checked).length;
    status.textContent = `${done} of ${checks.length} readiness steps complete`;
    fill.style.width = `${done / checks.length * 100}%`;
  };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    checks.forEach(input => { input.checked = saved[input.id] === true; });
  } catch { /* The checklist works without browser storage. */ }
  checks.forEach(input => input.addEventListener('change', () => {
    update();
    try { localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(checks.map(item => [item.id, item.checked])))); } catch { /* Storage is optional. */ }
  }));
  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    checks.forEach(input => { input.checked = false; });
    try { localStorage.removeItem(storageKey); } catch { /* Storage is optional. */ }
    update();
  });
  update();
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.copy);
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copied';
        document.querySelector('[data-copy-status]').textContent = 'Command copied to clipboard.';
        setTimeout(() => { button.textContent = 'Copy'; }, 2000);
      } catch {
        button.textContent = 'Select code to copy';
        document.querySelector('[data-copy-status]').textContent = 'Clipboard access is unavailable. Select and copy the command text.';
      }
    });
  });
})();
