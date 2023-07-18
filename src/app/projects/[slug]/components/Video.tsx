'use client';

import { useEffect, useRef, useState } from 'react';
import { GlobalString } from '@/globals/constants';
import { Icons } from '@/components/Icons';

const IFRAME_API_SCRIPT_ID = 'iframe-api-script';

export default function Video({ showcase }: { showcase: Showcase }) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  let ytApiExists = false;

  useEffect(() => {
    ytApiExists = document.getElementById(IFRAME_API_SCRIPT_ID) != null;

    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      const YTPlayer = new window.YT.Player(playerRef.current!, {
        height: '100%',
        width: '100%',
        videoId: showcase.data.videoId,
        playerVars: {
          color: 'white',
          enablejsapi: 1,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          start: showcase.data.videoStart || 0,
        },
      });

      setPlayer(YTPlayer);
    };

    if (ytApiExists) {
      window.onYouTubeIframeAPIReady();
      return;
    }

    loadIframeApi();

    return () => {
      if (player) {
        player.destroy();
        setPlayer(null);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden lg-plus:rounded-xl">
      <div
        className="aspect-video w-full bg-bronze-300/10"
        ref={playerRef}
      ></div>
      <button
        className="group/btn absolute inset-0 bg-slate-800 bg-cover bg-center bg-no-repeat bg-blend-exclusion"
        aria-label={`Play ${showcase.data.title} video`}
        style={{
          backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
        }}
        onClick={(e: React.MouseEvent) => {
          if (player === null) return;
          playVideo(e.target as HTMLButtonElement, player);
        }}
      >
        <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-64 w-64 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[50%] bg-white/25 uppercase backdrop-blur-sm transition-all duration-200 ease-in-out group-hover/btn:bg-white/50 sm:h-80 sm:w-80">
          <Icons
            name="play"
            className="pointer-events-none w-24 translate-x-[3px] fill-white/70 transition-colors duration-200 ease-in-out group-hover/btn:fill-white sm:w-32"
          />
        </span>
      </button>
    </div>
  );
}

/**
 * Loads the IFrame Player API code asynchronously.
 */
function loadIframeApi() {
  const script = document.createElement('script');
  script.id = IFRAME_API_SCRIPT_ID;
  script.src = 'https://www.youtube.com/iframe_api';
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

/**
 * Hides the poster image and plays the videos.
 */
function playVideo(posterImg: HTMLButtonElement, player: YT.Player) {
  if (player == null) return;

  posterImg.classList.add('hidden');
  player.playVideo();
}
