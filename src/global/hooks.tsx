import React, { useCallback, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { GlobalString } from './constants';

export const useSeoData = (
  pageTitle: string,
  path: string = '',
  props: any[] = [],
) => {
  return useEffect(() => {
    document.title = `${pageTitle} - ${GlobalString.PRONUNCIATION}`;

    const existingCanonicalLink = document.querySelector('[rel="canonical"]');
    existingCanonicalLink?.remove();

    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://michaelm.site/${path}`);

    const head = document.querySelector('head')!;
    head.appendChild(canonicalLink);
  }, props);
};

export const useInViewRef = (r?: any) => {
  const ref = r || useRef();

  const {ref: inViewRef, inView} = useInView({
    triggerOnce: true,
    threshold: .3,
  });

  // Use `useCallback` so we don't recreate the function on each render.
  const setRefs = useCallback(
    (node: any) => {
      // Ref's from useRef needs to have the node assigned to `current`.
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes
      // the node as an argument.
      inViewRef(node);
    }, [inViewRef],
  );

  return {
    inView,
    ref: setRefs,
  };
};

export const useSetAnimateClassName = (inView: boolean): string => {
  if (inView) return 'mm-animate--in';
  return '';
};

export const useSlideAwayHeader = (
  headerRef: React.RefObject<HTMLElement>,
  slideAwayClass: string,
) => {
  useEffect(() => {
    let lastScrollPosition = 0;

    const handleSlideAway = () => {
      const currentScrollPosition = window.pageYOffset;
      const headerOffsetTop = headerRef.current!.offsetTop;

      // Checks if the element is at the top of the page.
      // Do nothing if it's not.
      if (currentScrollPosition !== headerOffsetTop) return;

      headerRef.current!.classList.toggle(slideAwayClass,
          currentScrollPosition > lastScrollPosition);

      lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleSlideAway);

    return () => {
      window.removeEventListener('scroll', handleSlideAway);
    };
  }, []);
};
