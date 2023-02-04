import * as React from 'react';
import {usePageTitleEffect} from '../../global/global.utils';
import {GlobalString} from '../../global/global.constants';
import {SHOWCASES} from '../../global/content/showcases';


export const Work = () => {
  usePageTitleEffect('My Work');

  return (
    <section className="mm-section mm-grid mm-grid--50-50">
      <>
        {SHOWCASES.map((showcase: Showcase) => {
          return (
            <div key={showcase.title}>
              {showcase.title}
              <img src={`${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img}`}
                  aria-label={showcase.title} />
            </div>
          )
        })}
      </>
    </section>
  )
};
