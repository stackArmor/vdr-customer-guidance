(() => {
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

  const checklist = document.querySelector('[data-readiness-checklist]');
  if (!checklist) return;

  const storageKey = 'stackarmor-vdr-readiness-v1';
  const steps = [...checklist.querySelectorAll('[data-readiness-step]')];
  const exceptions = [...checklist.querySelectorAll('[data-readiness-na]')];
  const progress = checklist.querySelector('[data-readiness-progress]');
  const status = checklist.querySelector('[data-readiness-status]');
  const storageNotice = checklist.querySelector('[data-readiness-storage]');

  const restore = raw => {
    let saved = {};
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === 1) saved = parsed;
    } catch {
      // Invalid or older data starts a fresh checklist.
    }
    steps.forEach(input => {
      input.checked = saved.completed?.[input.dataset.readinessStep] === true;
    });
    exceptions.forEach(input => {
      input.checked = saved.notApplicable?.[input.dataset.readinessNa] === true;
    });
  };

  const render = () => {
    let excluded = 0;
    exceptions.forEach(input => {
      const step = steps.find(item => item.dataset.readinessStep === input.dataset.readinessNa);
      if (!step) return;
      step.disabled = input.checked;
      if (input.checked) {
        excluded += 1;
        step.checked = false;
      }
    });
    const applicable = steps.length - excluded;
    const completed = steps.filter(input => input.checked && !input.disabled).length;
    progress.max = applicable;
    progress.value = completed;
    status.textContent = `${completed} of ${applicable} applicable steps complete${excluded ? ` (${excluded} not applicable)` : ''}.`;
  };

  const save = () => {
    const saved = {
      version: 1,
      completed: Object.fromEntries(steps.map(input => [input.dataset.readinessStep, input.checked])),
      notApplicable: Object.fromEntries(exceptions.map(input => [input.dataset.readinessNa, input.checked])),
    };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(saved));
      storageNotice.hidden = true;
    } catch {
      storageNotice.hidden = false;
    }
  };

  try {
    restore(window.localStorage.getItem(storageKey));
  } catch {
    storageNotice.hidden = false;
  }
  render();

  checklist.addEventListener('change', event => {
    if (!event.target.matches('[data-readiness-step], [data-readiness-na]')) return;
    render();
    save();
  });
  checklist.querySelector('[data-readiness-reset]').addEventListener('click', () => {
    restore(null);
    render();
    save();
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    restore(event.newValue);
    render();
  });
})();
