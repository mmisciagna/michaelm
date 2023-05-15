import React from 'react';
import { SHOWCASES } from '../../content/showcases';
import { Link, Outlet, useParams } from 'react-router-dom';
import slugify from 'react-slugify';
import { GlobalString } from '../../global/constants';
import { useInViewRef, useSetAnimateClassName } from '../../global/hooks';


function ShowcaseGridItem({showcase, currentId}: {
  showcase: Showcase,
  currentId: string|undefined,
}) {
  const slug = slugify(showcase.data.title);

  const setRefs = useInViewRef();

  return (
    <div className={`mm-animate mm-projects-layout__grid-item ${useSetAnimateClassName(setRefs.inView)}`}
        ref={setRefs.ref}>
      <div className="mm-projects-layout__img-wrapper">
        <div className="mm-projects-layout__img-aspect-ratio"
            style={{
              backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
            }}>
        </div>
      </div>
      <div className="mm-projects-layout__info-panel">
        <div>
          <h3>{showcase.data.title}</h3>
          <h4>{showcase.data.role}</h4>
        </div>
        <div>
          <Link className="mm-button"
              to={`/projects/${slug}`}
              arial-label={`View ${showcase.data.title} details`}>
            View details
          </Link>
          {showcase.data.siteLink &&
            <a href={showcase.data.siteLink} target="_blank" rel="noopener noreferrer"
                className="mm-button mm-button--secondary"
                arial-label={`Launch ${showcase.data.title} site`}>
              Launch site
            </a>
          }
        </div>
      </div>
    </div>
  );
}

function Grid({
  id,
  headline,
  type,
}: {
  id: string|undefined,
  headline: string,
  type?: string,
}) {
  return (
    <section className="mm-section mm-projects-layout mm-projects-layout--grid">
      <h2 className="mm-eyebrow" style={{ marginBottom: '48px' }}>
        {headline}
      </h2>
      <div className="mm-grid mm-grid--3-cols">
        {SHOWCASES.map((showcase: Showcase) => {
          if (type?.toLowerCase() === showcase.data.type?.toLowerCase()) {
            return (
              <React.Fragment key={showcase.data.title}>
                <ShowcaseGridItem showcase={showcase} currentId={id!} />
              </React.Fragment>
            )
          }
          return null;
        })}
      </div>
    </section>
  )
}

function ShowcaseListItem({showcase, currentId}: {
  showcase: Showcase,
  currentId: string|undefined,
}) {
  const slug = slugify(showcase.data.title);

  const setRefs = useInViewRef();

  return (
    <li className={`mm-animate mm-projects-layout__list-item ${useSetAnimateClassName(setRefs.inView)}`}
        ref={setRefs.ref}>
      <Link className="mm-projects-layout__list-link"
          to={`/projects/${slug}`}
          arial-label={`View ${showcase.data.title} details`}>
        <span className="mm-projects-layout__img-wrapper">
          <span className="mm-projects-layout__img-aspect-ratio"
              style={{
                backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
              }}>
          </span>
        </span>
        <span className="mm-projects-layout__list-details">
          <span className="mm-projects-layout__list-label">
            {showcase.data.title}
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

function List({
  id,
  headline,
  type,
}: {
  id: string|undefined,
  headline: string,
  type?: string,
}) {
  return (
    <section className="mm-section mm-projects-layout mm-projects-layout--list">
      <h2 className="mm-eyebrow" style={{ marginBottom: '16px' }}>
        {headline}
      </h2>
      <ul className="mm-projects-layout__list">
        {SHOWCASES.map((showcase: Showcase) => {
          if (type?.toLowerCase() === showcase.data.type?.toLowerCase()) {
            return (
              <React.Fragment key={showcase.data.title}>
                <ShowcaseListItem showcase={showcase} currentId={id!} />
              </React.Fragment>
            )
          }
          return null;
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
      <List id={id} headline="Engineering Work" />
      <List id={id} headline="Design Work" type="design" />
      <List id={id} headline="For Fun" type="for fun" />
      <Grid id={id} headline="Engineering Work" />
      <Grid id={id} headline="Design Work" type="design" />
      <Grid id={id} headline="For Fun" type="for fun" />
    </>
  )
}

export default ProjectsLayout;
