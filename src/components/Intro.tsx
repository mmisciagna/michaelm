'use client';

import React, { useRef } from 'react';
import { INTRO } from '@/content/intro';
import { useAnimateOnObserve } from '@/hooks/useAnimateOnObserve';

interface Content {
  header: string;
  paragraphs: string[];
}

export default function Intro() {
  const rootRef = useRef(null);
  useAnimateOnObserve(rootRef);

  return (
    <section
      ref={rootRef}
      className="negate-main-spacing-x main-spacing-x mb-80 bg-slate-800 py-80 text-off-white dark:bg-slate-900"
      id="tldr">
      <div className="mx-auto block w-full max-w-1200 sm:grid sm:grid-cols-12 sm:gap-48">
        <div className="col-span-12 hidden text-right sm:col-span-3 sm:block">
          <figure
            className="bg-slate-800"
            data-animate-on-observe>
            <img
              className="w-full align-middle mix-blend-exclusion"
              src="/static/imgs/profile-pic.jpg"
              alt="Profile picture of Michael"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="sm:col-span-9 sm:col-start-4">
          {INTRO.map((content: Content, i: number) => {
            return (
              <React.Fragment key={i}>
                <h2
                  className="mb-[0.5em] font-display text-h2 tracking-1"
                  data-animate-on-observe>
                  {content.header}
                </h2>
                {content.paragraphs.map((p: string, i: number) => {
                  return (
                    <p
                      key={i}
                      className="my-[1em]"
                      data-animate-on-observe>
                      {p}
                    </p>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
