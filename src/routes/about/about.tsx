import * as React from 'react';
import {GlobalString} from '../../global/global.constants';
import {useInViewRef, setAnimateInClassName} from '../../global/global.utils';
import {ResumeJumpLinks, Resume} from '../../components/resume/resume';


const INTRO_CONTENT = [
  {
    header: 'Sr. UX Engineer at Google, with 12+ years of experience.',
    paragraphs: [
      `I have developed and designed the front-ends of massively trafficked websites.`,
      `The current state of web production requires developers to have a design eye and understanding of user experience. No longer does it suffice to have designers and developers work in silos. Instead, they need to collaborate and understand the other's role and capabilities. Having worked as both a front-end developer and designer, I have a proven ability to bridge the gap between these cross-disciplinary teams.`,
    ],
  },
  {
    header: 'Technical prowess',
    paragraphs: [
      `I am not beholden to any one front-end platform but am not against them either. I believe in using the right tool for the right project. I am proficient in JavaScript and TypeScript, and that affords me the ability to quickly become an expert in the platform du jour. The advantage of being an experienced developer is having the flexibility and wherewithal to find the best tool for the project.`,
    ],
  },
  {
    header: 'Design experience',
    paragraphs: [
      `As someone with both UX and UI design experience, as well as engineering expertise, I am able to create designs that are responsive across all devices and screen sizes. Additionally, I am able to quickly create and test prototypes within the browser as needed.`,
    ],
  },
  {
    header: 'I care about performance',
    paragraphs: [
      `I want to see our projects produce the desired results we set out to achieve, and not pat ourselves on the back just for launching something. I want to see them “land”. When given a project, I will complete it from start to launch and see it through its lifetime.`,
    ],
  },
]

const Intro = () => {
  const setRefs = useInViewRef();

  return (
    <>
      <section className="mm-section mm-about__intro">
        <h1 className="mm-page-title">
          Hello, I am <span>Michael Misciagna.</span>
        </h1>
        <h2 className="mm-page-subtext">
          pronounced <span>{GlobalString.pronunciation}</span>
        </h2>
        <div className="mm-about__jump-links">
          <hr />
          {ResumeJumpLinks({
            prepend: [{
              hash: 'tldr',
              label: 'TL;DR',
            }]
          })}
        </div>
      </section>
      <section className="mm-section mm-section--full-bleed mm-about__tldr" id="tldr">
        <div className="mm-grid mm-section__inner">
          <div ref={setRefs.ref} className={`mm-animate ${setAnimateInClassName(setRefs.inView)} mm-grid__col-l`}>
            <img src="/static/imgs/profile-pic.webp" alt="Profile picture of Michael" />
          </div>
          <div className={`mm-grid__col-r`}>
            {INTRO_CONTENT.map((content: any) => {
              const setRefs = useInViewRef();
              return (
                <React.Fragment key={content.header}>
                  <h2 ref={setRefs.ref}
                      className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
                    {content.header}
                  </h2>
                  {content.paragraphs.map((p: string) => {
                    const setRefs = useInViewRef();
                    return (
                      <p ref={setRefs.ref} key={p}
                          className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
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
    </>
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
