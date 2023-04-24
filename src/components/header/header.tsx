import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalString } from '../../global/constants';
import Nav from '../nav/Nav';


function ThemeToggle() {
  const defaultChecked =
      document.documentElement.getAttribute('theme') === 'dark';

  const [checked, setChecked] = useState(defaultChecked);

  const classNames = checked ?
      'mm-theme-toggle mm-theme-toggle--checked' : 'mm-theme-toggle';

  const handleCheck = (e: any) => {
    setChecked(e.target.checked);
  }

  useEffect(() => {
    document.documentElement.setAttribute('theme', checked ? 'dark' : 'light');
  }, [checked]);

  return (
    <div className={classNames}>
      <input type="checkbox" checked={checked} onChange={(e: any) => handleCheck(e)} />
      <div className="mm-theme-toggle__panels">
        <div className="mm-theme-toggle__panel mm-theme-toggle__panel--light">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M480 776q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170 606H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606H790ZM479.825 296Q467 296 458.5 287.375T450 266V166q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38V886q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 886v100q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM240 378l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217 270 226 279l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5 774q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743 882 734 873Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786 313 777 322l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897 873.103q-8.897-8.896-8.897-21.5Q174 839 183 830l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291 783 291 795t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526Z"/></svg>
        </div>
        <div className="mm-theme-toggle__panel mm-theme-toggle__panel--dark">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M480 936q-150 0-255-105T120 576q0-135 79.5-229T408 226q41-8 56 14t-1 60q-9 23-14 47t-5 49q0 90 63 153t153 63q25 0 48.5-4.5T754 595q43-16 64 1.5t11 59.5q-27 121-121 200.5T480 936Z"/></svg>
        </div>
      </div>
    </div>
  )
}

function Header() {
  const headerRef = useRef<HTMLElement>(null);

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
