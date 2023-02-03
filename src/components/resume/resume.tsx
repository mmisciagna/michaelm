import * as React from 'react';
import slugify from 'react-slugify';
import {Link} from 'react-scroll';
import {RESUME_CONTENT} from './resume-content';
import {useInViewRef, setAnimateInClassName} from '../../global/global.utils';


interface JumpLink {
  hash: string;
  label: string;
}

interface ExtraJumpLinks {
  prepend?: JumpLink[];
  append?: JumpLink[];
}

export const ResumeJumpLinks = (extraLinks: ExtraJumpLinks = {}) => {
  const prepend = extraLinks.prepend;
  const append = extraLinks.append;

  const listItem = (label: string, hash?: string) => {
    return (
      <li key={hash || label}>
        <Link to={slugify(hash || label)}
            smooth={true}
            offset={-96}
            duration={500}>
          {label}
        </Link>
      </li>
    )
  }

  return (
    <ul>
      {prepend && prepend.map((link: JumpLink) => {
        return listItem(link.label, link.hash);
      })}
      {RESUME_CONTENT.map((section: any) => {
        return listItem(section.title);
      })}
      {append && append.map((link: JumpLink) => {
        return listItem(link.label, link.hash);
      })}
    </ul>
  )
};

export const Resume = () => {
  return (
    <section className="mm-section mm-grid mm-resume">
      {RESUME_CONTENT.map((section: any) => {
        const setRefs = useInViewRef();
        return (
          <React.Fragment key={section.title}>
            <div ref={setRefs.ref}
                className={`mm-animate ${setAnimateInClassName(setRefs.inView)} mm-grid__col-l`}
                id={slugify(section.title)}>
              <h2>{section.title}</h2>
            </div>
            <div className="mm-grid__col-r">
              {section.entries ? section.entries.map((entry: any) => {
                const setRefs = useInViewRef();
                return (
                  <div className="mm-resume__entry" key={entry.header}>
                    {entry.header ?
                      <h3 ref={setRefs.ref}
                          className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
                        {entry.header}{entry.ancillaryHeader ? <span> / {entry.ancillaryHeader}</span> : ''}
                      </h3> :
                      ''
                    }
                    {entry.dates ?
                      <p ref={setRefs.ref}
                          className={`mm-animate ${setAnimateInClassName(setRefs.inView)} mm-highlight mm-resume__dates`}>
                        {entry.dates}
                      </p> :
                      ''
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
                                      className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
                                    {li}
                                  </li>
                                );
                              })}
                            </ul> :
                            <div>
                              {details.subhead ?
                                <h4 ref={setRefs.ref} className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
                                  {details.subhead}
                                </h4> :
                                ''
                              }
                              {details.description.map((p: string) => {
                                const setRefs = useInViewRef();
                                return (
                                  <p key={p} ref={setRefs.ref}
                                      className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
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
              }) : ''}
            </div>
          </React.Fragment>
        )
      })}
    </section>
  );
};
