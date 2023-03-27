import React from 'react';
import { Link as AutoScroll } from 'react-scroll';
import slugify from 'react-slugify';
import Header from '../../components/header/Header';
import { GlobalString } from '../../global/global.constants';
import { usePageTitleEffect, useInViewRef, setAnimateInClassName } from '../../global/global.utils';
import { INTRO } from '../../global/content/intro';
import { RESUME } from '../../global/content/resume';
import { Resume } from '../../components/resume/resume';


function JumpLinks() {
  return (
    <div className="mm-about__jump-links">
      <hr />
      <ul>
        <li>
          <AutoScroll to={'tldr'}
              smooth={true}
              offset={-48}
              duration={500}>
            TL;DR
          </AutoScroll>
        </li>
        {RESUME.map((section: any) => {
          return (
            <li key={slugify(section.title)}>
              <AutoScroll to={slugify(section.title)}
                  smooth={true}
                  offset={-48}
                  duration={500}>
                {section.title}
              </AutoScroll>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

function Hero() {
  return (
    <div className="mm-about">
      <section className="mm-section mm-about__intro">
        <h1 className="mm-page-title">
          Hello, I am <span className="mm-tooltip mm-highlight">
            Michael Misciagna
            <span className="mm-tooltip__bubble">
              Pronounced <span>{GlobalString.PRONUNCIATION}</span>
            </span>
          </span>
        </h1>
        <h2 className="mm-page-subtext">
          <span className="mm-highlight">Frontend engineer</span> and <span className="mm-highlight">designer</span> extraordinaire
        </h2>
        <JumpLinks />
      </section>
    </div>
  )
}

function Intro() {
  const setRefs = useInViewRef();

  return (
    <section className="mm-section mm-section--full-bleed mm-about__tldr" id="tldr">
      <div className="mm-grid mm-section__inner">
        <div ref={setRefs.ref} className={`mm-animate ${setAnimateInClassName(setRefs.inView)} mm-grid__col-l mm-about__profile-pic`}>
          <figure>
            <img src="/static/imgs/profile-pic.webp" alt="Profile picture of Michael" />
            <figcaption>
              My son, Theo, at age one. They say we look alike.
            </figcaption>
          </figure>

        </div>
        <div className={`mm-grid__col-r`}>
          {INTRO.map((content: any) => {
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
  )
}

function About() {
  usePageTitleEffect('About');

  return (
    <div className="mm-about">
      <Hero />
      <Header />
      <Intro />
      <Resume />
    </div>
  )
}

export default About;
