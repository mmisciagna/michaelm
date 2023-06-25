'use client';

import { Colors, GlobalString } from '@/globals/constants';
import { useEffect, useRef } from 'react';
import { Icons } from './Icons';

const IFRAME_API_SCRIPT_ID = 'iframe-api-script';

let player: YT.Player;

export default function Video({ showcase }: { showcase: Showcase }) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player(playerRef.current!, {
        height: '100%',
        width: '100%',
        videoId: showcase.data.videoId,
        playerVars: {
          playsinline: 1,
        },
      });
    };

    if (document.getElementById(IFRAME_API_SCRIPT_ID)) {
      window.onYouTubeIframeAPIReady();
      return;
    }

    loadIframeApi();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="aspect-video w-full bg-bronze-10"
        ref={playerRef}></div>
      <button
        className="group/btn absolute inset-0 bg-slate-blue bg-cover bg-center bg-no-repeat bg-blend-exclusion"
        aria-label={`Play ${showcase.data.title} video`}
        style={{
          backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.data.img})`,
        }}
        onClick={(e: React.MouseEvent) => {
          playVideo(e.target as HTMLButtonElement);
        }}>
        <span className="pointer-events-none absolute left-1/2 top-1/2 flex w-1/2 max-w-[320px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white-25 px-48 py-24 uppercase backdrop-blur-sm transition-all duration-200 ease-in-out group-hover/btn:bg-white-50">
          <Icons
            name="play"
            color={Colors['white-70']}
            className="pointer-events-none w-48 transition-colors duration-200 ease-in-out group-hover/btn:fill-white sm:w-64"
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
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode?.insertBefore(script, firstScriptTag);
}

/**
 * Hides the poster image and plays the videos.
 */
function playVideo(posterImg: HTMLButtonElement) {
  if (player == null) return;

  posterImg.classList.add('hidden');
  player.playVideo();
}
