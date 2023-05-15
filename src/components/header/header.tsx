import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalString } from '../../global/constants';
import Nav from '../nav/Nav';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { useSlideAwayHeader } from '../../global/hooks';


function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useSlideAwayHeader(headerRef, 'mm-header--slide-away');

  return (
    <header className="mm-header" ref={headerRef}>
      <div className="mm-header__branding">
        <NavLink to={`/`}
            aria-label='Home'>
          <span>{GlobalString.PRONUNCIATION}</span>
        </NavLink>
        <ThemeToggle />
      </div>
      <Nav />
    </header>
  )
}

export default Header;
