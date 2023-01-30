import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Root, Page} from './routes/root';
import {Error} from './routes/error';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/:path?',
        element: <Page />
      },
    ]
  },
]);

const rootEL = document.querySelector('.mm-root') as HTMLElement;
const root = createRoot(rootEL);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
