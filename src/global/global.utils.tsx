import { useCallback, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { GlobalString } from './global.constants';

export const usePageTitleEffect = (pageTitle: string, props: any[] = []) => {
  return useEffect(() => {
    document.title = `${pageTitle} - ${GlobalString.PRONUNCIATION}`;
  }, props);
};

export const useInViewRef = () => {
  const ref = useRef();

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
    },
    [inViewRef],
  );

  return {
    inView,
    ref: setRefs,
  };
};

export const setAnimateInClassName = (inView: boolean): string => {
  if (inView) return 'mm-animate--in';
  return '';
};
