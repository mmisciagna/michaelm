'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import slugify from 'react-slugify';
import classNames from 'classnames';
import { GlobalString } from '@/globals/constants';
import { Showcases } from '@/content/showcases';
import { Icons } from '@/components/Icons';
import { useAnimateOnObserve } from '@/hooks/useAnimateOnObserve';

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
  const rootRef = useRef(null);
  useAnimateOnObserve(rootRef);

  return (
    <section
      className="relative left-1/2 my-80 max-w-600 -translate-x-1/2 sm:hidden"
      id={slugify(type)}
      ref={rootRef}>
      <h2
        className="eyebrow mb-16"
        data-animate-on-observe>
        {headline}
      </h2>
      <ul className="negate-main-spacing-x">
        {Showcases.map((showcase: Showcase) => {
          const slug = slugify(showcase.data.title);

          if (type?.toLowerCase() === showcase.data.type?.toLowerCase()) {
            return (
              <li
                className="group/item overflow-hidden rounded"
                key={showcase.data.title}
                data-animate-on-observe>
                <Link
                  className="main-spacing-x flex w-full items-center justify-between gap-16 py-16 transition-colors duration-200 group-even/item:bg-bronze-10 dark:border-off-white dark:group-even/item:bg-black-10"
                  href={`/projects/${slug}`}
                  arial-label={`View ${showcase.data.title} details`}>
                  <span className="block w-[35%] overflow-hidden rounded bg-slate-blue">
                    <span
                      className="block aspect-square w-full overflow-hidden bg-cover bg-no-repeat mix-blend-exclusion"
                      style={{
                        backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
                      }}></span>
                  </span>
                  <span className="flex flex-1 items-center justify-end text-right leading-tight">
                    <span className="block font-display font-bold">
                      {showcase.data.title}
                    </span>
                  </span>
                  <span className="block rounded bg-bronze leading-none">
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
  const rootRef = useRef(null);
  useAnimateOnObserve(rootRef);

  return (
    <section
      className="mx-auto my-80 hidden max-w-900 sm:block lg:max-w-1200"
      id={`${slugify(type)}-grid`}
      ref={rootRef}>
      <h2
        className="eyebrow mb-48"
        data-animate-on-observe>
        {headline}
      </h2>

      <div className="xs:grid xs:grid-cols-1 xs:gap-[2px] sm:grid-cols-2 lg:grid-cols-3">
        {Showcases.map((showcase: Showcase) => {
          const slug = slugify(showcase.data.title);

          if (type?.toLowerCase() === showcase.data.type?.toLowerCase()) {
            return (
              <div
                key={showcase.data.title}
                className="group/grid-item relative my-24 flex flex-col items-center xs:m-0"
                data-animate-on-observe
                tabIndex={0}>
                <div className="block w-full overflow-hidden rounded bg-slate-blue">
                  <div
                    className="block aspect-square w-full bg-cover  bg-no-repeat mix-blend-exclusion"
                    style={{
                      backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
                    }}></div>
                </div>
                {/* Panel overlay */}
                <div className="absolute inset-0 flex flex-col justify-between rounded bg-slate-blue-90 px-24 pb-24 pt-48 text-off-white opacity-0 backdrop-blur-sm transition-all clip-path-project-panel after:absolute after:right-0 after:top-0 after:rounded-bl after:border-16 after:border-solid after:border-b-bronze after:border-l-bronze after:border-r-off-white after:border-t-off-white group-hover/grid-item:opacity-100 group-hover/grid-item:clip-path-project-panel-reveal group-focus/grid-item:opacity-100 group-focus/grid-item:clip-path-project-panel-reveal dark:bg-slate-blue-dk-90 dark:after:border-r-slate-blue dark:after:border-t-slate-blue">
                  <div>
                    <h3 className="font-display text-h3 leading-snug tracking-1">
                      {showcase.data.title}
                    </h3>
                    <h4 className="mt-16 font-display text-h4 leading-snug tracking-1">
                      {showcase.data.role}
                    </h4>
                  </div>
                  <div>
                    <Link
                      className="button mt-12 !block"
                      href={`/projects/${slug}`}
                      arial-label={`View ${showcase.data.title} details`}>
                      View details
                      <span></span>
                    </Link>
                    {showcase.data.siteLink && (
                      <a
                        href={showcase.data.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button--secondary mt-12 !block !border-white-10 !text-white hover:!bg-white-10"
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
