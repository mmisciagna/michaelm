import * as React from 'react';
import {useParams, Outlet} from 'react-router-dom';
import slugify from 'react-slugify';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {About} from './about/about';
import {Work} from './work/work';


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
    element: <Work />,
    label: 'Contact',
  },
];

export const getRouteDetails = (path: string): PathDetails => {
  let details = PATHS.find((details: PathDetails) => {
    return details.path === path;
  });

  if (details) {
    return details;
  } else {
    return PATHS[0];
  }
};

export const Page = () => {
  let {path} = useParams();
  if (!path) path = '';
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
