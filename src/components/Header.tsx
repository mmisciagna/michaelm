'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { GlobalString } from '@/globals/constants';
import Nav from '@/components/Nav';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header({ classes }: { classes?: string }) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastScrollPosition = 0;

    const handleSlideAway = () => {
      const currentScrollPosition = window.scrollY;
      const headerOffsetTop = headerRef.current?.offsetTop;

      // Checks if the element is at the top of the page.
      // Do nothing if it's not.
      if (currentScrollPosition !== headerOffsetTop) return;

      headerRef.current!.classList.toggle(
        'translate-y-[-100%]',
        currentScrollPosition > lastScrollPosition
      );

      lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleSlideAway);

    return () => window.removeEventListener('scroll', handleSlideAway);
  }, []);

  return (
    <header
      className={`sticky left-0 top-0 z-50 flex flex-col items-center justify-between duration-300 ease-in-out [transition-property:transform] xs:h-[var(--header-height)] xs:flex-row ${classes}`}
      ref={headerRef}>
      <div className="relative flex w-full flex-1 basis-[var(--header-height)] items-center justify-start overflow-hidden bg-slate-800 italic text-white before:absolute before:left-24 before:top-1/2 before:-translate-y-1/2 before:bg-white before:[height:1px] before:[width:calc(100%-24px)] dark:bg-slate-900 xs:h-full xs:border-b xs:border-off-white xs:px-24 xs:dark:border-slate-800 sm:px-48 sm:before:[width:calc(100%-48px)] lg:px-80 lg:before:[width:calc(100%-80px)]">
        <Link
          href={`/`}
          aria-label="Home"
          className="z-10 bg-slate-800 font-display text-sm font-bold italic tracking-1 dark:bg-slate-900 xs:ml-[-12px]">
          <span className="bg-blue-slate-800 relative z-10 px-24 xs:px-12">
            {GlobalString.PRONUNCIATION}
          </span>
        </Link>
        <ThemeToggle />
      </div>
      <Nav isInHeader={true} />
    </header>
  );
}
