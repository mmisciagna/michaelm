'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { GlobalString } from '@/global/constants';
import Nav from '@/components/Nav';
// import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  // useSlideAwayHeader(headerRef, 'mm-header--slide-away');
  let lastScrollPosition = 0;

  const handleSlideAway = () => {
    const currentScrollPosition = window.pageYOffset;
    const headerOffsetTop = headerRef.current!.offsetTop;

    // Checks if the element is at the top of the page.
    // Do nothing if it's not.
    if (currentScrollPosition !== headerOffsetTop) return;

    headerRef.current!.classList.toggle(
      'mm-header--slide-away',
      currentScrollPosition > lastScrollPosition
    );
    console.log(lastScrollPosition);

    lastScrollPosition = currentScrollPosition;
  };

  window.addEventListener('scroll', handleSlideAway);

  return (
    <header
      className="mm-header"
      ref={headerRef}
    >
      <div className="mm-header__branding">
        <Link
          href={`/`}
          aria-label="Home"
        >
          <span>{GlobalString.PRONUNCIATION}</span>
        </Link>
        {/* <ThemeToggle /> */}
      </div>
      <Nav />
    </header>
  );
}
