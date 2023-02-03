import * as React from 'react';
import {useParams, Outlet} from 'react-router-dom';
import slugify from 'react-slugify';
import {getRouteDetails} from '../global/global.utils';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {About} from './about/about';
import {Work} from './work/work';
import {WORK} from './work/content';
import {Contact} from './contact/contact';


export const PATHS: PathDetails[] = [
  {
    path: '',
    element: <About />,
    label: 'About',
  },
  {
    path: 'work',
    element: <Work />,
    label: 'Work',
  },
  {
    path: 'contact',
    element: <Contact />,
    label: 'Contact',
  },
  {
    path: 'workDetails',
    element: <h1>Work details</h1>,
  },
];

export const Page = () => {
  let {path, work} = useParams();
  let workDetails: any = undefined;

  if (!path) path = '';

  if (work) {
    workDetails = WORK.find((item: any) => {
      return work === slugify(item.title);
    });

    if (workDetails && path === 'work') {
      path = 'workDetails';
    } else {
      // TODO: Update a state called "path" in order to re-render the
      // header and the footer.
      window.history.pushState({}, '', '/');
      path = '';
    }
  }

  const pageElement = getRouteDetails(path).element;
  return (pageElement);
};

export const Root = () => {
  let {path} = useParams();
  if (!path) path = '';
  const pageLabel = getRouteDetails(path).label;
  const className = slugify(pageLabel);

  return (
    <>
      <Header path={path} />
      <main className={`mm-main mm-${className}`}>
        <Outlet />
      </main>
      <Footer path={path} />
    </>
  );
};
