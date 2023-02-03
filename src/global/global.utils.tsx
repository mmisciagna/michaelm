import {useCallback, useRef, useEffect} from 'react';
import {redirect} from 'react-router-dom';
import {useInView} from 'react-intersection-observer';
import {GlobalClassNames, GlobalString} from './global.constants';
import type {AppDispatch} from './global.store';
import {updatePath} from './global.store.slice';
import {PATHS} from '../routes/root';


export const usePageTitleEffect = (pageTitle: string) => {
  return useEffect(() => {
    document.title = `${pageTitle} - ${GlobalString.PRONUNCIATION}`;
  }, []);
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
  if (inView) return GlobalClassNames.ANIMATE_IN;
  return '';
};

export const getRouteDetails = (path: string): PathDetails|undefined => {
  let details = PATHS.find((details: PathDetails) => {
    return details.path === path;
  });

  return details;
};

export const redirectRoute = (path: string, dispatch: AppDispatch) => {
  window.history.pushState({}, '', path || '/');
  dispatch(updatePath(path));
  redirect(`/${path}`);
};
