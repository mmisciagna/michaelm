import React, { useEffect, useRef } from 'react';
import { Link as AutoScroll } from 'react-scroll';

function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animatedEls = [...document.querySelectorAll('[data-animate]')];

    new Promise((resolve: any) => {
      animatedEls.forEach((el: Element, i: number) => {
        const delay = (i + 2) * 200;

        setTimeout(() => {
          el.classList.add('animate-in');
          if (i + 1 === animatedEls.length) resolve();
        }, delay);
      });
    });
  }, []);

  return (
    <section className="hero" id="top">
      <video
        className="hero__video"
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/static/videos/bakery-hero.mp4" type="video/mp4"></source>
      </video>
      <div className="hero__content" ref={contentRef}>
        <div className="hero__content-inner">
          <h1 className="display h1">
            <div data-animate style={{ whiteSpace: 'nowrap' }}>Bread Today,</div>
            <div data-animate style={{ whiteSpace: 'nowrap' }}>Gone Tomorrow</div>
          </h1>
          <hr data-animate className="italian-hr" />
          <p className="subhead" data-animate style={{ color: 'var(--body-color)' }}>
            Pizzeria & Bakery
          </p>
          <p data-animate>
            Delight Your Senses with Freshly Baked Goods and Delicious Pizza at Our One-Stop Shop!
          </p>
          <nav data-animate style={{
            display: 'flex',
            gap: '1em',
            marginBottom: '1em',
          }}>
            <AutoScroll
                style={{  color: 'var(--subtle-color)' }}
                to={'about'}
                smooth={true}
                offset={-110}
                duration={500}
                href="">
              About
            </AutoScroll>
            <AutoScroll
                style={{  color: 'var(--subtle-color)' }}
                to={'shop'}
                smooth={true}
                offset={-110}
                duration={500}
                href="">
              Shop
            </AutoScroll>
            <AutoScroll
                style={{  color: 'var(--subtle-color)' }}
                to={'location'}
                smooth={true}
                offset={-110}
                duration={500}
                href="">
              Location
            </AutoScroll>
          </nav>
          <div className="button button--icon" data-animate>
            <AutoScroll
                style={{
                  color: 'var(--display-color)'
                }}
                to={'about'}
                smooth={true}
                offset={-100}
                duration={500}
                href="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                <path d="M480 712 240 472l43-43 197 197 197-197 43 43-240 240Z"/>
              </svg>
            </AutoScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
