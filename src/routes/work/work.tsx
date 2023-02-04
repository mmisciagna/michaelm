import * as React from 'react';
import {usePageTitleEffect} from '../../global/global.utils';
import {GlobalString} from '../../global/global.constants';
import {SHOWCASES} from '../../global/content/showcases';


const Showcase = (props: Record<string, Showcase>) => {
  const details = props.showcase;

  return (
    <div className="mm-work__showcase">
      <div className="mm-work__img-wrapper">
        <div className="mm-work__img-aspect-ratio"
            aria-label={details.title}
            style={{
              backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${details.img})`,
            }}>
        </div>
      </div>
      <div className="mm-work__info-panel">
        <h3>{details.title}</h3>
        <span>{details.role}</span>
        <span>Tools</span>
        <button className="mm-button mm-button--reverse">View details</button>
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
