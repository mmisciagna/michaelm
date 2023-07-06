import { useEffect } from 'react';
import { GlobalSelector } from '@/globals/constants';

export function useAnimateOnObserve(
  root: React.RefObject<HTMLElement>,
  dependencies: any[] = []
) {
  useEffect(() => {
    if (!root.current) return;

    const animatedEls = Array.from(
      root.current.querySelectorAll(GlobalSelector.ANIMATE_ON_OBSERVE)
    );

    function onIntersection(entries: IntersectionObserverEntry[]) {
      for (const entry of entries) {
        if (entry.intersectionRatio * 100 >= 0.3) {
          const el = entry.target as HTMLElement;
          el.dataset.animateOnObserve = 'observed';
        }
      }
    }

    const observer = new IntersectionObserver(onIntersection, {
      threshold: 0.3,
    });

    for (const el of animatedEls) {
      observer.observe(el);
    }

    return () => {
      for (const el of animatedEls) {
        observer.unobserve(el);
      }
    };
  }, [root, ...dependencies]);
}
