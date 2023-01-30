import * as React from 'react';
import {useParams, Outlet} from 'react-router-dom';
import {Header} from '../components/header';


export const Root = () => {
  const {path} = useParams();

  return (
    <>
      <Header path={path} />
      <main className={`mm-main mm-main--${path || 'overview'}`}>
        <Outlet />
      </main>
    </>
  );
};
