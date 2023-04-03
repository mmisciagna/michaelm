import React from 'react';
import { SHOWCASES } from '../../global/content/showcases';
import { Link, Outlet, useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { GlobalString } from '../../global/constants';
import { useInViewRef, useSetAnimateClassName } from '../../global/hooks';


function ShowcaseGridItem({showcase, currentId}: {showcase: Showcase, currentId: string|undefined}) {
  const slug = slugify(showcase.title);
  const isActive = slug === currentId;

  if (isActive) return null;

  const setRefs = useInViewRef();

  return (
    <div className={`mm-animate mm-projects-layout__grid-item ${useSetAnimateClassName(setRefs.inView)}`}
        ref={setRefs.ref}>
      <div className="mm-projects-layout__img-wrapper">
        <div className="mm-projects-layout__img-aspect-ratio"
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
            <Link className="mm-button"
                to={`/projects/${slug}`}
                arial-label={`View ${showcase.title} details`}>
              View details
            </Link>
          }
          {showcase.siteLink &&
            <a href={showcase.siteLink} target="_blank" rel="noopener noreferrer"
                className="mm-button mm-button--secondary"
                arial-label={`Launch ${showcase.title} site`}>
              Launch site
            </a>
          }
        </div>
      </div>
    </div>
  );
}

function Grid({id}: {id: string|undefined}) {
  return (
    <section className="mm-section mm-projects-layout mm-projects-layout--grid">
      <div className="mm-grid mm-grid--3-cols">
        {SHOWCASES.map((showcase: Showcase) => {
          return (
            <React.Fragment key={showcase.title}>
              <ShowcaseGridItem showcase={showcase} currentId={id!} />
            </React.Fragment>
          )
        })}
      </div>
    </section>
  )
}

function ShowcaseListItem({showcase, currentId}: {showcase: Showcase, currentId: string|undefined}) {
  const slug = slugify(showcase.title);
  const isActive = slug === currentId;

  if (isActive) return null;

  const setRefs = useInViewRef();

  return (
    <li className={`mm-animate mm-projects-layout__list-item ${useSetAnimateClassName(setRefs.inView)}`}
        ref={setRefs.ref}>
      <Link className="mm-projects-layout__list-link"
          to={`/projects/${slug}`}
          arial-label={`View ${showcase.title} details`}>
        <span className="mm-projects-layout__img-wrapper">
          <span className="mm-projects-layout__img-aspect-ratio"
              style={{
                backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img})`,
              }}>
          </span>
        </span>
        <span className="mm-projects-layout__list-details">
          <span className="mm-projects-layout__list-label">
            {showcase.title}
          </span>
        </span>
        <span className="mm-projects-layout__list-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
            <path d="m561 814-43-42 168-168H160v-60h526L517 375l43-42 241 241-240 240Z"/>
          </svg>
        </span>
      </Link>
    </li>
  );
}

function List({id}: {id: string|undefined}) {
  return (
    <section className="mm-section mm-projects-layout mm-projects-layout--list">
      <ul className="mm-projects-layout__list">
        {SHOWCASES.map((showcase: Showcase) => {
          return (
            <React.Fragment key={showcase.title}>
              <ShowcaseListItem showcase={showcase} currentId={id!} />
            </React.Fragment>
          )
        })}
      </ul>
    </section>
  )
}

function ProjectsLayout() {
  const {id} = useParams();

  return (
    <>
      <Outlet />
      <div id="all-projects"></div>
      <List id={id} />
      <Grid id={id} />
    </>
  )
}

export default ProjectsLayout;
