import React, { useState } from 'react';
import { Link, Navigate, useParams }  from 'react-router-dom';
import slugify from 'react-slugify';
import { SHOWCASES } from '../../global/content/showcases';
import { usePageTitleEffect } from '../../global/hooks';
import { useIframeApi } from '../../components/video/video.hooks';
import Details from '../../components/details/Details';
import Video from '../../components/video/Video';


function Showcase() {
  const {id} = useParams();

  const showcase = SHOWCASES.find((showcase) => {
    return slugify(showcase.title) === id;
  });

  // Redirects to 404 if no showcase is found.
  if (!showcase) return <Navigate to="/404" />

  const [ytReady, setYTReady] = useState(window.YT !== undefined);

  // Updates page title.
  usePageTitleEffect(showcase.title, [showcase.title]);

  // Loads YT Iframe API, if not present already.
  useIframeApi(ytReady).then(() => {
    setYTReady(true);
  });

  const resetMargins = {
    marginBottom: 'unset',
    marginTop: 'unset',
  };

  return (
    <div className="mm-showcase">
      <section className="mm-section mm-section--full-bleed"
          style={{...resetMargins, paddingTop: '24px'}}>
        <div className="mm-section__inner">
          <ul className="mm-showcase__breadcrumbs">
            <li className="mm-showcase__breadcrumbs-item">
              <Link to="/projects">Projects</Link>
            </li>
            <li className="mm-showcase__breadcrumbs-item">
              {showcase.title}
            </li>
          </ul>
          <h1 className="mm-showcase__title">
            {showcase.title}
          </h1>
          <Details title="Client" list={[showcase.client]} />
          <Details title="Role" list={[showcase.role]} />
          <Details title="Stack" list={showcase.stack} />
        </div>
      </section>
      {showcase.videoId && <Video showcase={showcase} ready={ytReady} />}
      <section className="mm-section mm-section--full-bleed"
          style={resetMargins}>
        <div className="mm-section__inner">
          {showcase.siteLink &&
            <p>
              <a href={showcase.siteLink} target="_blank" rel="noopener noreferrer"
                  className="mm-button">
                Launch site
              </a>
            </p>
          }
          <div className="mm-showcase__description"
              dangerouslySetInnerHTML={{__html: showcase.description}} />
        </div>
      </section>
    </div>
  )
}

export default Showcase;
