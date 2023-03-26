import * as React from 'react';
import {Link} from 'react-router-dom';
import slugify from 'react-slugify';
import {usePageTitleEffect} from '../../global/global.utils';
import {GlobalString} from '../../global/global.constants';
import {SHOWCASES} from '../../global/content/showcases';
import {useAppDispatch} from '../../global/global.store';
import {updateShowcase} from '../../global/global.store.slice';


const Showcase = ({showcase}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="mm-work__showcase">
      <div className="mm-work__img-wrapper">
        <div className="mm-work__img-aspect-ratio"
            aria-label={showcase.title}
            style={{
              backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img})`,
            }}>
        </div>
      </div>
      <div className="mm-work__info-panel">
        <div>
          <h3>{showcase.title}</h3>
          <h4>{showcase.role}</h4>
        </div>
        <Link className="mm-button mm-button--reverse"
            to={`/work/${slugify(showcase.title)}`}
            onClick={() => dispatch(updateShowcase(showcase))}>
          View details
        </Link>
      </div>
    </div>
  );
}

export const Work = () => {
  usePageTitleEffect('My Work');

  return (
    <>
      <h1 aria-hidden="true" style={{display: 'none'}}>
        Work
      </h1>
      <section className="mm-section">
        <div className="mm-grid mm-grid--3-cols">
          {SHOWCASES.map((showcase: Showcase) => {
            return (
              <React.Fragment key={showcase.title}>
                <Showcase showcase={showcase} />
              </React.Fragment>
            )
          })}
        </div>
      </section>
    </>
  )
};
