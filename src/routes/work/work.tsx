import * as React from 'react';
import {Link} from 'react-router-dom';
import slugify from 'react-slugify';
import {usePageTitleEffect} from '../../global/global.utils';
import {GlobalString} from '../../global/global.constants';
import {SHOWCASES} from './showcases';


export const Work = () => {
  usePageTitleEffect('My Work');

  return (
    <section className="mm-section mm-grid mm-grid--50-50">
      {SHOWCASES.map((showcase: Showcase) => {
        return (
          <div key={showcase.title}>
            <Link to={slugify(showcase.title)}>
              {showcase.title}
            </Link>
            <img src={`${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img}`}
                aria-label={showcase.title} />
          </div>
        )
      })}
    </section>
  )
};
