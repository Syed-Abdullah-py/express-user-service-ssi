const App = {
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  personIcon(size = 22) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.31 0-6 1.79-6 4v1h12v-1c0-2.21-2.69-4-6-4z"/>
    </svg>`;
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  },

  showErrorFromQuery(elementId, fallbackPath) {
    const error = this.getQueryParam('error');
    if (!error?.trim()) return;

    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = decodeURIComponent(error);
    element.hidden = false;
    history.replaceState({}, '', fallbackPath);
  },

  confirmDelete(name) {
    return confirm(`Delete ${name}? This action cannot be undone.`);
  },

  setSubmitLoading(formId, buttonId, textId, loadingText) {
    document.getElementById(formId)?.addEventListener('submit', () => {
      const button = document.getElementById(buttonId);
      const text = document.getElementById(textId);
      if (button) button.disabled = true;
      if (text) text.textContent = loadingText;
    });
  },
};
