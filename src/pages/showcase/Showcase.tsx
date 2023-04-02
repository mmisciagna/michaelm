import React, { useState } from 'react';
import { Link, Navigate, useParams }  from 'react-router-dom';
import slugify from 'react-slugify';
import { Link as AutoScroll } from 'react-scroll';
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

  const resetSectionSpacing = {
    marginBottom: 'unset',
    marginTop: 'unset',
    paddingTop: 'unset',
  };

  const index = SHOWCASES.indexOf(showcase);

  return (
    <div className="mm-showcase">
      <section className="mm-section mm-section--full-bleed"
          style={{...resetSectionSpacing, paddingTop: '24px'}}>
        <div className="mm-section__inner">
          <BreadCrumbs showcase={showcase} index={index + 1} />
          <Pagination index={index} />
          <h1 className="mm-showcase__title">
            {showcase.title}
          </h1>
          {showcase.client && <Details title="Client" list={[showcase.client]} />}
          {showcase.role && <Details title="Role" list={[showcase.role]} />}
          {showcase.stack && <Details title="Stack" list={showcase.stack} />}
        </div>
      </section>
      {showcase.videoId && <Video showcase={showcase} ready={ytReady} />}
      <section className="mm-section mm-section--full-bleed"
          style={{...resetSectionSpacing, overflow: 'hidden'}}>
        <div className="mm-section__inner">
          {showcase.siteLink &&
            <p style={{
              marginTop: 'unset',
            }}>
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

function Pagination({index}: {index: number}) {
  return (
    <div className="mm-showcase__pagination">
      <Link className={`mm-button ${index === 0 ? 'disabled' : ''}`}
          to={`/projects/${slugify(SHOWCASES[index - 1]?.title)}`}>
        Previous
      </Link>
      <AutoScroll className="mm-showcase__pagination-grid-icon"
          to="projects-grid"
          smooth={true}
          offset={-96}
          duration={500}
          aria-label="Go to projects grid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
          <path d="M226 896q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226 642q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226 388q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"/>
        </svg>
      </AutoScroll>
      <Link className={`mm-button ${index + 1 === SHOWCASES.length ? 'disabled' : ''}`}
          to={`/projects/${slugify(SHOWCASES[index + 1]?.title)}`}>
        Next
      </Link>
    </div>
  )
}

function BreadCrumbs({showcase, index}: {showcase: Showcase, index: number}) {
  return (
    <div className="mm-showcase__breadcrumbs">
      <ul className="mm-showcase__breadcrumbs-list">
        <li className="mm-showcase__breadcrumbs-item">
          <Link to="/projects">Projects</Link>
        </li>
        <li className="mm-showcase__breadcrumbs-item">
          {showcase.title}
        </li>
      </ul>
      <div className="mm-showcase__breadcrumbs-count">
        {index} / {SHOWCASES.length}
      </div>
    </div>
  )
}

export default Showcase;
