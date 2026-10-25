import React from 'react';
import ReactDOM from 'react-dom/client';
// Vazirmatn is bundled locally (no CDN), so it works offline after the first load.
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/700.css';
import './styles.css';
import App from './App';

// Service worker (offline + install) only in production builds, so development caching never gets in the way.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error: unknown) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
