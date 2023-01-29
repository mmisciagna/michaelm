import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Header} from './components/header';
import {HomePage} from './pages/homepage';

const rootEL = document.querySelector('.mm-root') as HTMLElement;
const root = createRoot(rootEL);

root.render(
  <>
    <Header />
    <HomePage />
  </>
);
