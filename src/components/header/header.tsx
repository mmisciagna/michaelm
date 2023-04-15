import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { GlobalString } from '../../global/constants';
import Nav from '../nav/Nav';


function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    let lastScrollPosition = 0;

    const handleSlideAway = () => {
      const currentScrollPosition = window.pageYOffset;
      const headerOffsetTop = headerRef.current!.offsetTop;

      // Checks if the element is at the top of the page.
      // Do nothing if it's not.
      if (currentScrollPosition !== headerOffsetTop) return;

      headerRef.current!.classList.toggle('mm-header--slide-away',
          currentScrollPosition > lastScrollPosition);

      lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleSlideAway);

    return () => {
      window.removeEventListener('scroll', handleSlideAway);
    };
  }, []);

  return (
    <>
      <header className="mm-header" ref={headerRef}>
        <div className="mm-header__branding">
          <NavLink to={`/`}
              aria-label='Home'>
            <span>{GlobalString.PRONUNCIATION}</span>
          </NavLink>
        </div>
        <Nav />
      </header>
    </>
  )
}

export default Header;
