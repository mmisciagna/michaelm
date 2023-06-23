import Link from 'next/link';
import React from 'react';
import slugify from 'react-slugify';
import { GlobalString } from '@/globals/constants';
import { Showcases } from '@/content/showcases';
import { Icons } from '@/components/Icons';
import classNames from 'classnames';

const projectsTypes = ['Engineering', 'Design', 'Just For Fun'];

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <section
        className="mx-auto my-80 max-w-1200"
        id="all-projects">
        <TypeNav />
        <TypeNav isGrid={true} />
      </section>
      {projectsTypes.map((type: string) => {
        return (
          <React.Fragment key={type}>
            <List
              headline={type}
              type={type}
            />
            <Grid
              headline={type}
              type={type}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

function TypeNav({ isGrid = false }) {
  const displayClasses = classNames({
    'hidden xs:flex': isGrid,
    'flex xs:hidden': !isGrid,
  });

  return (
    <nav
      className={`items-center gap-24 border-b border-solid border-slate-blue dark:border-slate-blue-dk ${displayClasses}`}>
      {projectsTypes.map((type: string) => {
        return (
          <a
            key={type}
            href={isGrid ? `#${slugify(type)}-grid` : `#${slugify(type)}`}
            className="eyebrow text-bronze transition-colors duration-200 ease-in-out hover:text-slate-blue dark:hover:text-off-white">
            {type}
          </a>
        );
      })}
    </nav>
  );
}

function List({ headline, type }: { headline: string; type?: string }) {
  return (
    <section
      className="my-80 max-w-1200 xs:hidden"
      id={slugify(type)}>
      <h2 className="eyebrow mb-16">{headline}</h2>
      <ul className="negate-main-spacing-x">
        {Showcases.map((showcase: Showcase) => {
          const slug = slugify(showcase.data.title);

          if (type?.toLowerCase() === showcase.data.type?.toLowerCase()) {
            return (
              <li
                className="group/item"
                key={showcase.data.title}>
                <Link
                  className="main-spacing-x flex w-full items-center justify-between gap-16 py-16 transition-colors duration-200 group-even/item:bg-bronze-10 dark:border-off-white dark:group-even/item:bg-black-10"
                  href={`/projects/${slug}`}
                  arial-label={`View ${showcase.data.title} details`}>
                  <span className="block w-[35%] overflow-hidden rounded-[4px] bg-slate-blue">
                    <span
                      className="block aspect-square w-full overflow-hidden bg-cover bg-no-repeat mix-blend-exclusion"
                      style={{
                        backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
                      }}></span>
                  </span>
                  <span className="flex flex-1 items-center justify-between leading-tight">
                    <span className="block font-bold">
                      {showcase.data.title}
                    </span>
                  </span>
                  <span className="block rounded-[4px] bg-bronze leading-none">
                    <Icons
                      name="arrow-right"
                      className="w-32 fill-off-white dark:fill-slate-blue"
                    />
                  </span>
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </section>
  );
}

function Grid({ headline, type }: { headline: string; type?: string }) {
  return (
    <section
      className="my-80 hidden max-w-1200 xs:block"
      id={`${slugify(type)}-grid`}>
      <h2
        className="mm-eyebrow"
        style={{ marginBottom: '48px' }}>
        {headline}
      </h2>
      <div className="mm-grid mm-grid--3-cols">
        {Showcases.map((showcase: Showcase) => {
          const slug = slugify(showcase.data.title);

          if (type?.toLowerCase() === showcase.data.type?.toLowerCase()) {
            return (
              <div
                key={showcase.data.title}
                className={`mm-animate mm-projects-layout__grid-item`}>
                <div className="mm-projects-layout__img-wrapper">
                  <div
                    className="mm-projects-layout__img-aspect-ratio"
                    style={{
                      backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
                    }}></div>
                </div>
                <div className="mm-projects-layout__info-panel">
                  <div>
                    <h3>{showcase.data.title}</h3>
                    <h4>{showcase.data.role}</h4>
                  </div>
                  <div>
                    <Link
                      className="mm-button"
                      href={`/projects/${slug}`}
                      arial-label={`View ${showcase.data.title} details`}>
                      View details
                    </Link>
                    {showcase.data.siteLink && (
                      <a
                        href={showcase.data.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mm-button mm-button--secondary"
                        arial-label={`Launch ${showcase.data.title} site`}>
                        Launch site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}
