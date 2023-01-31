import * as React from 'react';
import {RESUME_CONTENT} from './resume';

const Intro = () => {
  return (
    <>
      <section className="mm-section mm-about__intro">
        <div className=" mm-grid">
          <div className="mm-grid__col-r">
            <h1 className="mm-page-title">Howdy, I am Michael Misciagna.</h1>
            <h2 className="mm-page-subtext">pronounced [mee-shah-nyah]</h2>
          </div>
        </div>
      </section>
      <section className="mm-section mm-section--full-bleed mm-about__tldr">
        <div className="mm-grid mm-section__inner">
          <div className="mm-grid__col-l">
            <img src="/static/imgs/profile-pic.webp" alt="Profile picture" />
          </div>
          <div className="mm-grid__col-r">
            <h2>Sr. UX Engineer at Google, with over 12+ years of experience.</h2>
            <p>I have developed and designed the front-ends of massively trafficked websites.</p>
            <p>The current state of web production requires developers to have a design eye and understanding of user experience. No longer does it suffice to have designers and developers work in silos. Instead, they need to collaborate and understand the other’s role and capabilities. Having worked as both a front-end developer and designer, I have a proven ability to bridge the gap between these cross-disciplinary teams.</p>
            <h2>Technical prowess</h2>
            <p>I am not beholden to any one front-end platform but am not against them either. I believe in using the right tool for the right project. I am proficient in JavaScript and TypeScript, and that affords me the ability to quickly become an expert in the platform du jour. The advantage of being an experienced developer is having the flexibility and wherewithal to find the best tool for the project.</p>
            <h2>Design experience</h2>
            <p>As someone with both UX and UI design experience, as well as engineering expertise, I am able to create designs that are responsive across all devices and screen sizes. Additionally, I am able to quickly create and test prototypes within the browser as needed.</p>
            <h2>I care about performance</h2>
            <p>I want to see our projects produce the desired results we set out to achieve, and not pat ourselves on the back just for launching something. I want to see them “land”.  When given a project, I will complete it from start to launch and see it through its lifetime.</p>
          </div>
        </div>
      </section>
    </>
  );
};

const Resume = () => {
  return (
    <section className="mm-section mm-grid mm-resume">
      {RESUME_CONTENT.map((section: any) => {
        return (
          <React.Fragment key={section.title}>
            <div className="mm-grid__col-l">
              <h2>{section.title}</h2>
            </div>
            <div className="mm-grid__col-r">
              {section.entries ? section.entries.map((entry: any) => {
                return (
                  <div className="mm-resume__entry" key={entry.header}>
                    {entry.header ? <h3>{entry.header}{entry.ancillaryHeader ? <span> / {entry.ancillaryHeader}</span> : ''}</h3> : ''}
                    {entry.dates ? <p className="mm-resume__dates">{entry.dates}</p> : ''}
                    {entry.details.map((details: any, i: number) => {
                      const isList = details.type && details.type === 'list';
                      return (
                        <React.Fragment key={i}>
                          {isList ?
                            <ul>
                              {details.description.map((li: string) => {
                                return <li key={li}>{li}</li>;
                              })}
                            </ul> :
                            <div>
                              {details.subhead ? <h4>{details.subhead}</h4> : ''}
                              {details.description.map((p: string) => {
                                return <p key={p}>{p}</p>;
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

export const About = () => {
  return (
    <>
      <Intro />
      <Resume />
    </>
  );
};
