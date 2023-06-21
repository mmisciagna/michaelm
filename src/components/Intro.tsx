import React from 'react';
import { INTRO } from '@/content/intro';

export default function Intro() {
  return (
    <section
      className="negate-main-spacing-x main-spacing-x mb-80 bg-slate-blue py-80 text-off-white dark:bg-slate-blue-dk"
      id="tldr">
      <div className="mx-auto block w-full max-w-1200 sm:grid sm:grid-cols-12 sm:gap-48">
        <div className="col-span-12 hidden text-right sm:col-span-3 sm:block">
          <figure className="bg-slate-blue">
            <img
              className="w-full align-middle mix-blend-exclusion"
              src="/static/imgs/profile-pic.jpg"
              alt="Profile picture of Michael"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="sm:col-span-9 sm:col-start-4">
          {INTRO.map((content: any) => {
            return (
              <React.Fragment key={content.header}>
                <h2 className="mb-[0.5em] font-display text-h2 font-medium tracking-[1px]">
                  {content.header}
                </h2>
                {content.paragraphs.map((p: string) => {
                  return (
                    <p
                      key={p}
                      className="my-[1em] font-body">
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
