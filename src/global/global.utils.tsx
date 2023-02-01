import {useCallback, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import {GlobalClassNames} from './global.constants';


export const setAnimateInClassName = (inView: boolean): string => {
  if (inView) return GlobalClassNames.ANIMATE_IN;
  return '';
};

export const useInViewRef = () => {
  const ref = useRef();
  const {ref: inViewRef, inView} = useInView({
    triggerOnce: true,
    threshold: .3,
  });

  // Use `useCallback` so we don't recreate the function on each render
  const setRefs = useCallback(
    (node: any) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes
      // the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );

  return {
    inView,
    ref: setRefs,
  };
};
