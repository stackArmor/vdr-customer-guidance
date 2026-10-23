(() => {
  const storageKey = 'stackarmor-vdr-readiness-v2';
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
    const originalLabel = button.textContent;
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.copy);
      if (!code) return;
      const copyStatus = document.querySelector('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copied';
        if (copyStatus) copyStatus.textContent = button.dataset.copySuccess || 'Copied to clipboard.';
        setTimeout(() => { button.textContent = originalLabel; }, 2000);
      } catch {
        button.textContent = 'Select text to copy';
        if (copyStatus) copyStatus.textContent = 'Clipboard access is unavailable. Select and copy the text.';
      }
    });
  });
})();
