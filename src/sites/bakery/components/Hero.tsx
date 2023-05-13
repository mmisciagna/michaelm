import React, { useEffect } from 'react';

function Hero() {
  useEffect(() => {
    const animatedEls = [...document.querySelectorAll('[data-animate]')];

    animatedEls.forEach((el: Element, i: number) => {
      const delay = (i + 2) * 200;

      setTimeout(() => {
        el.classList.add('animate-in')
      }, delay);
    });
  }, []);

  return (
    <section className="hero">
      <video
        className="video"
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/static/videos/bakery-hero.mp4" type="video/mp4"></source>
      </video>
      <div className="content">
        <div className="content__inner">
          <h1 className="display h1">
            <div data-animate style={{ whiteSpace: 'nowrap' }}>Bread Today,</div>
            <div data-animate style={{ whiteSpace: 'nowrap' }}>Gone Tomorrow</div>
          </h1>
          <p className="subhead" data-animate>
            Pizzeria & Bakery
          </p>
          <p data-animate>
            Delight Your Senses with Freshly Baked Goods and Delicious Pizza at Our One-Stop Shop!
          </p>
          <div className="smooth-scroll-arrow" data-animate>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                <path d="M480 712 240 472l43-43 197 197 197-197 43 43-240 240Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
