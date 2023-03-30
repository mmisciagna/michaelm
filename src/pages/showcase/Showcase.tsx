import React from 'react';
import { Navigate, useParams }  from 'react-router-dom';
import slugify from 'react-slugify';
import { SHOWCASES } from '../../global/content/showcases';
import { usePageTitleEffect } from '../../global/global.utils';


function Video({showcase}: {showcase: Showcase}) {
  const src = `https://www.youtube-nocookie.com/embed/${showcase.videoId}`;

  return (
    <section className="mm-section mm-section--full-bleed mm-showcase__video-bg">
      <div className="mm-section__inner">
        <div className="mm-showcase__video">
          <iframe
            src={src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
          </iframe>
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const {id} = useParams();

  const showcase = SHOWCASES.find((showcase) => {
    return slugify(showcase.title) === id;
  });

  // Redirect to 404 if no showcase is found.
  if (!showcase) return <Navigate to="/404" />

  usePageTitleEffect(`Showcase - ${showcase.title}`, [showcase.title]);

  return (
    <div className="mm-showcase">
      <section className="mm-section">
        <h1 className="mm-showcase__title">
          {showcase.title}
        </h1>
        <p className="mm-showcase__stack">
          {showcase.stack.map((label: string) => {
            return (
              <span key={label}
                  className="mm-showcase__stack-label">
                {label}
              </span>
            )
          })}
        </p>
      </section>
      {showcase.videoId ? <Video showcase={showcase} /> : 'No video'}
    </div>
  )
}

export default Showcase;
