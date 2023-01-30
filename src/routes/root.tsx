import * as React from 'react';
import {useParams, Outlet} from 'react-router-dom';
import {PATHS} from '../global/global.constants';
import {getHomepageDetails} from '../global/global.utils';
import {Header} from '../components/header';


const HOMEPAGE_DETAILS = getHomepageDetails();

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
  if (!path) path = HOMEPAGE_DETAILS.path;
  const pageElement = getPageDetails(path).element;
  return (pageElement);
};

export const Root = () => {
  let {path} = useParams();
  if (!path) path = '';

  return (
    <>
      <Header path={path} />
      <main className={`mm-main mm-main--${path || 'overview'}`}>
        <Outlet />
      </main>
    </>
  );
};
