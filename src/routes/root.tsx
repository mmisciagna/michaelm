import * as React from 'react';
import {useParams, Outlet} from 'react-router-dom';
import slugify from 'react-slugify';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {About} from './about/about';
import {Projects} from './projects/projects';


export const PATHS: PathDetails[] = [
  {
    path: '',
    element: <Projects />,
    label: 'Projects',
  },
  {
    path: 'about',
    element: <About />,
    label: 'About',
  },
];

export const getHomepageDetails = (): PathDetails => {
  let homepageDetails = PATHS.find((details: PathDetails) => {
    return details.path === '';
  });

  if (homepageDetails) {
    return homepageDetails;
  } else {
    return PATHS[0];
  }
};

const getPageDetails = (path: string): PathDetails => {
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
  if (!path) path = getHomepageDetails().path;
  const pageElement = getPageDetails(path).element;
  return (pageElement);
};

export const Root = () => {
  let {path} = useParams();
  if (!path) path = '';
  const pageLabel = getPageDetails(path).label;
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
