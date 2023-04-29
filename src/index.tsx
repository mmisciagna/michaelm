import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalSelector } from './global/constants';
import App from './App';


const doc = document.documentElement;
const rootEL = document.querySelector(GlobalSelector.ROOT) as HTMLElement;
const root = createRoot(rootEL);

// Checks if user's preference is dark mode.
const isDarkTheme = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

const theme = isDarkTheme ? 'dark': 'light';

// Sets theme based on user's preference.
doc.setAttribute('theme', theme);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
