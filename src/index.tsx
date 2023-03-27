import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalSelector } from './global/global.constants';
import App from './App';


const rootEL = document.querySelector(GlobalSelector.ROOT) as HTMLElement;
const root = createRoot(rootEL);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
