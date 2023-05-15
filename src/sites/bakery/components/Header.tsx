import React, { useRef } from 'react';
import { Link as AutoScroll } from 'react-scroll';
import { useSlideAwayHeader } from '../../../global/hooks';

function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useSlideAwayHeader(headerRef, 'header--slide-away');

  return (
    <header className="header" ref={headerRef}>
      <div className="header__inner">
        <div className="display header__branding">
          <span>Bread Today,</span> <span>Gone Tomorrow</span>
        </div>
        <nav className="header__nav">
          <AutoScroll
              className="header__nav-item flex-center"
              to={'about'}
              smooth={true}
              offset={-110}
              duration={500}
              href="">
            About
          </AutoScroll>
          <AutoScroll
              className="header__nav-item flex-center"
              to={'shop'}
              smooth={true}
              offset={-110}
              duration={500}
              href="">
            Shop
          </AutoScroll>
          <AutoScroll
              className="header__nav-item flex-center"
              to={'location'}
              smooth={true}
              offset={-110}
              duration={500}
              href="">
            Location
          </AutoScroll>
        </nav>
      </div>
    </header>
  );
}

export default Header;
