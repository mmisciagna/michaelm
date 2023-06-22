'use client';

import React, { useRef } from 'react';
import slugify from 'react-slugify';
import { RESUME } from '@/content/resume';
import { useAnimateOnObserve } from '@/hooks/useAnimateOnObserve';
import { Icons } from '@/components/Icons';
import { Colors } from '@/globals/constants';

export default function Resume() {
  const rootRef = useRef(null);
  useAnimateOnObserve(rootRef);

  return (
    <section
      className="mx-auto my-80 block max-w-1200 sm:grid sm:grid-cols-12 sm:gap-48"
      ref={rootRef}>
      {RESUME.map((section: any, i: number) => {
        return (
          <React.Fragment key={i}>
            <div
              className="col-span-12 text-left sm:col-span-3 sm:text-right"
              id={slugify(section.title)}
              data-animate-on-observe>
              <h2 className="mb-48 overflow-hidden text-ellipsis font-display text-h2 tracking-1">
                {section.title}
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-9 sm:col-start-4">
              {section.entries &&
                section.entries.map((entry: any, i: number) => {
                  return (
                    <div
                      className="mb-48"
                      key={i}>
                      {entry.header && (
                        <h3
                          className="relative font-display text-h3 font-bold leading-[1.4em] tracking-1 after:absolute after:-top-8 after:left-0 after:h-[2px] after:w-24 after:bg-slate-blue after:dark:bg-off-white"
                          data-animate-on-observe>
                          {entry.link ? (
                            <a
                              className="inline-flex gap-4 transition-colors duration-300 ease-in-out hover:text-bronze"
                              href={entry.link}
                              target="blank">
                              {entry.header}
                              <Icons
                                type="new-window"
                                color={Colors.bronze}
                                className="mt-4 h-20 w-16 md:h-24 md:w-24"
                              />
                            </a>
                          ) : (
                            <>{entry.header}</>
                          )}
                          {entry.ancillaryHeader && (
                            <>
                              <br />
                              <span
                                className="font-normal"
                                data-animate-on-observe>
                                {entry.ancillaryHeader}
                              </span>
                            </>
                          )}
                        </h3>
                      )}
                      {entry.dates && (
                        <p
                          className="my-[1em] font-body font-bold"
                          data-animate-on-observe>
                          {entry.dates}
                        </p>
                      )}
                      {entry.details.map((details: any, i: number) => {
                        const isList = details.type && details.type === 'list';
                        return (
                          <React.Fragment key={i}>
                            {isList ? (
                              <ul className="my-[1em] list-outside list-disc pl-24">
                                {details.description.map(
                                  (li: string, i: number) => {
                                    return (
                                      <li
                                        key={i}
                                        className="my-[0.5em]"
                                        data-animate-on-observe>
                                        {li}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : (
                              <div>
                                {details.subhead && (
                                  <h4
                                    className="mb-[0.5em] mt-[2em] font-display text-h4 font-bold uppercase leading-[1.4em] tracking-1"
                                    data-animate-on-observe>
                                    {details.subhead}
                                  </h4>
                                )}
                                {details.description.map(
                                  (p: string, i: number) => {
                                    return (
                                      <p
                                        key={i}
                                        className="my-[1em] font-body"
                                        data-animate-on-observe>
                                        {p}
                                      </p>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </React.Fragment>
        );
      })}
    </section>
  );
}
