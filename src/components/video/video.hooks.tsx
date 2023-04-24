import {useEffect} from 'react';


export let globalPlayer: any = null;

export function useIframeApi(loaded: boolean) {
  const loadPromise = new Promise((resolve) => {
    useEffect(() => {
      if (!loaded) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      resolve(true);
    }, []);
  });

  return loadPromise;
}

export function useRenderPlayer(ref: {current: HTMLElement|null}, showcase: Showcase) {
  useEffect(() => {
    if (window.YT) {
      globalPlayer = renderPlayer(ref.current!, showcase);
    } else {
      window.onYouTubeIframeAPIReady = () => {
        globalPlayer = renderPlayer(ref.current!, showcase);
      };
    }

    return destroyPlayer();
  }, []);
}

function renderPlayer(node: HTMLElement, showcase: Showcase) {
  return new window.YT.Player(node, {
    videoId: showcase.data.videoId,
    playerVars: {
      color: 'white',
      enablejsapi: 1,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      start: showcase.data.videoStart || '0',
    },
    events: {
      'onStateChange': window.onPlayerStateChange,
    },
  });
}

function destroyPlayer() {
  return () => {
    if (globalPlayer) {
      globalPlayer && globalPlayer.destroy();
      globalPlayer = null;
    }
  };
}
