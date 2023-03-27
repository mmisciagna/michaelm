import React from 'react';
import { SHOWCASES } from '../../global/content/showcases';
import { Link, Outlet } from 'react-router-dom';
import slugify from 'react-slugify';
import { GlobalString } from '../../global/global.constants';


function Showcase({showcase}) {
  return (
    <div className="mm-projects-layout__showcase">
      <div className="mm-projects-layout__img-wrapper">
        <div className="mm-projects-layout__img-aspect-ratio"
            aria-label={showcase.title}
            style={{
              backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img})`,
            }}>
        </div>
      </div>
      <div className="mm-projects-layout__info-panel">
        <div>
          <h3>{showcase.title}</h3>
          <h4>{showcase.role}</h4>
        </div>
        <Link className="mm-button mm-button--reverse"
            to={`/projects/${slugify(showcase.title)}`}>
          View details
        </Link>
      </div>
    </div>
  );
}

function ProjectsLayout() {
  return (
    <>
      <Outlet />
      <section className="mm-section mm-projects-layout">
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
}

export default ProjectsLayout;
