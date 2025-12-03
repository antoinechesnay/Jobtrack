import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

window.addEventListener('error', (e) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="color: #ef4444; padding: 20px; font-family: sans-serif;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">Startup Error</h1>
        <p style="font-weight: bold;">${e.message}</p>
        <pre style="background: #f3f4f6; padding: 15px; border-radius: 8px; overflow: auto; margin-top: 10px;">${e.error?.stack || 'No stack trace'}</pre>
        <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px;">
          <p style="font-weight: bold; color: #1e40af;">Debug Info:</p>
          <p>API Key Present: ${!!import.meta.env.VITE_FIREBASE_API_KEY}</p>
          <p>Auth Domain Present: ${!!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}</p>
        </div>
      </div>
    `;
  }
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);