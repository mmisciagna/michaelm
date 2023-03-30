import React from 'react';
import { SHOWCASES } from '../../global/content/showcases';
import { Link, Outlet, useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { GlobalString } from '../../global/global.constants';


function Showcase({showcase, currentId}) {
  const slug = slugify(showcase.title);
  const isActive = slug === currentId;
  let classNames = 'mm-projects-layout__showcase';
  if (isActive) classNames += ' active';

  return (
    <div className={classNames}>
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
        {!isActive &&
          <Link className="mm-button mm-button--reverse"
              to={`/projects/${slug}`}>
            View details
          </Link>
        }
      </div>
    </div>
  );
}

function ProjectsLayout() {
  const {id} = useParams();

  return (
    <>
      <Outlet />
      <section className="mm-section mm-projects-layout">
        <div className="mm-grid mm-grid--3-cols">
          {SHOWCASES.map((showcase: Showcase) => {
            return (
              <React.Fragment key={showcase.title}>
                <Showcase showcase={showcase} currentId={id} />
              </React.Fragment>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ProjectsLayout;
