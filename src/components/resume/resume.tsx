import React from 'react';
import slugify from 'react-slugify';
import { RESUME } from '../../global/content/resume';
import { useInViewRef, useSetAnimateClassName } from '../../global/hooks';


export const Resume = () => {
  return (
    <section className="mm-section mm-grid mm-resume">
      {RESUME.map((section: any) => {
        const setRefs = useInViewRef();
        return (
          <React.Fragment key={section.title}>
            <div ref={setRefs.ref}
                className={`mm-animate ${useSetAnimateClassName(setRefs.inView)} mm-grid__col-l`}
                id={slugify(section.title)}>
              <h2>{section.title}</h2>
            </div>
            <div className="mm-grid__col-r">
              {section.entries && section.entries.map((entry: any) => {
                const setRefs = useInViewRef();
                return (
                  <div className="mm-resume__entry" key={entry.header}>
                    {entry.header &&
                      <h3 ref={setRefs.ref}
                          className={`mm-animate ${useSetAnimateClassName(setRefs.inView)}`}>
                        {entry.header}{entry.ancillaryHeader && <span><br />{entry.ancillaryHeader}</span>}
                      </h3>
                    }
                    {entry.dates &&
                      <p ref={setRefs.ref}
                          className={`mm-animate ${useSetAnimateClassName(setRefs.inView)} mm-resume__dates`}>
                        {entry.dates}
                      </p>
                    }
                    {entry.details.map((details: any, i: number) => {
                      const isList = details.type && details.type === 'list';
                      const setRefs = useInViewRef();
                      return (
                        <React.Fragment key={i}>
                          {isList ?
                            <ul>
                              {details.description.map((li: string) => {
                                const setRefs = useInViewRef();
                                return (
                                  <li key={li} ref={setRefs.ref}
                                      className={`mm-animate ${useSetAnimateClassName(setRefs.inView)}`}>
                                    {li}
                                  </li>
                                );
                              })}
                            </ul> :
                            <div>
                              {details.subhead &&
                                <h4 ref={setRefs.ref} className={`mm-animate ${useSetAnimateClassName(setRefs.inView)}`}>
                                  {details.subhead}
                                </h4>
                              }
                              {details.description.map((p: string) => {
                                const setRefs = useInViewRef();
                                return (
                                  <p key={p} ref={setRefs.ref}
                                      className={`mm-animate ${useSetAnimateClassName(setRefs.inView)}`}>
                                    {p}
                                  </p>
                                );
                              })}
                            </div>
                          }
                        </React.Fragment>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </React.Fragment>
        )
      })}
    </section>
  );
};
