import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider, useParams} from 'react-router-dom';
import {Header} from './components/header';
import {Error} from './routes/error';
import {Root} from './routes/root';
import {Work} from './routes/work';


const router = createBrowserRouter([
  {
    path: '/:path?',
    element: <Root />,
    errorElement: <Error />,
  },
]);

const rootEL = document.querySelector('.mm-root') as HTMLElement;
const root = createRoot(rootEL);

root.render(
  <>
    <Header />
    <main className="mm-main">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </main>
  </>
);
