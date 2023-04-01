import React from 'react';
import { SHOWCASES } from '../../global/content/showcases';
import { Link, Outlet, useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { GlobalString } from '../../global/constants';
import { useInViewRef, useSetAnimateClassName } from '../../global/hooks';


function Showcase({showcase, currentId}: {showcase: Showcase, currentId: string}) {
  const slug = slugify(showcase.title);
  const isActive = slug === currentId;

  if (isActive) return null;

  const setRefs = useInViewRef();

  return (
    <div className={`mm-animate mm-projects-layout__showcase ${useSetAnimateClassName(setRefs.inView)}`}
        ref={setRefs.ref}>
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
        <div>
          {!isActive &&
            <Link className="mm-button mm-button--reverse"
                to={`/projects/${slug}`}>
              View details
            </Link>
          }
          {showcase.siteLink &&
            <a href={showcase.siteLink} target="_blank" rel="noopener noreferrer"
                className="mm-button mm-button--secondary">
              Launch site
            </a>
          }
        </div>
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
                <Showcase showcase={showcase} currentId={id!} />
              </React.Fragment>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ProjectsLayout;
