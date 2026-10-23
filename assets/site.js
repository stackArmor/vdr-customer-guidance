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
})();
