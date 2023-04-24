import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalSelector } from './global/constants';
import App from './App';


const doc = document.documentElement;
const rootEL = document.querySelector(GlobalSelector.ROOT) as HTMLElement;
const root = createRoot(rootEL);

// Set theme on HTML element based on the user's preference.
let theme = 'light';

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  theme = 'dark';
}
doc.setAttribute('theme', theme);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
