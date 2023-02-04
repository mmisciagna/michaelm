import * as React from 'react';
import {usePageTitleEffect} from '../../global/global.utils';
import {useAppSelector} from '../../global/global.store';


export const Showcase = () => {
  const details = useAppSelector((state) => state.store.showcase)!;
  usePageTitleEffect(details.title);

  return (
    <>
      <section className="mm-section">
        <h1>{details.title}</h1>
      </section>
    </>
  )
};
