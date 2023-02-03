import * as React from 'react';
import {Link} from 'react-router-dom';
import {usePageTitleEffect} from '../../global/global.utils';


export const Work = () => {
  usePageTitleEffect('My Work');

  return (
    <>
      <Link to="work-1">
        Work-1
      </Link>
      <br />
      <Link to="work-2">
        Work-2
      </Link>
      <br />
      <Link to="work-3">
        Work-3
      </Link>
    </>
  )
};
