import React, { useRef } from 'react';
import { GlobalString } from '../../global/constants';
import { useRenderPlayer, globalPlayer } from './video.hooks';


declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
    onPlayerStateChange: any;
  }
}

interface VideoProps {
  showcase: Showcase;
  ready: boolean;
}

function Video({showcase, ready}: VideoProps) {
  const playerRef = useRef(null);
  const btnRef = useRef(null);

  function toggleBtn(show: boolean = false) {
    (btnRef.current! as HTMLElement).classList.toggle('active', !show);
  }

  window.onPlayerStateChange = (e: any) => {
    if (e.data == window.YT.PlayerState.PLAYING) {
      toggleBtn();
    }
  };

  if (globalPlayer && globalPlayer.cueVideoById) {
    toggleBtn(true);
    globalPlayer.cueVideoById(showcase.videoId);
  }

  useRenderPlayer(playerRef, showcase.videoId!);

  return (
    <section className="mm-section mm-section--full-bleed mm-video">
      <div className="mm-section__inner" style={{
        maxWidth: '1440px',
      }}>
        {ready ?
          <div className="mm-video__player">
            <div ref={playerRef}></div>
            <button className="mm-video__play-btn"
                style={{
                  backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img})`,
                }}
                ref={btnRef}
                onClick={() => {globalPlayer.playVideo()}}>
              <span className="mm-video__play-icon" >
                <svg viewBox="0 0 13 14" version="1.1">
                  <g transform="translate(-39.000000, 0.000000)">
                    <path d="M46.8944272,1.78885438 L52.2763932,12.5527864 C52.5233825,13.0467649 52.3231581,13.6474379 51.8291796,13.8944272 C51.6903242,13.9638549 51.5372111,14 51.381966,14 L40.618034,14 C40.0657492,14 39.618034,13.5522847 39.618034,13 C39.618034,12.8447549 39.6541791,12.6916418 39.7236068,12.5527864 L45.1055728,1.78885438 C45.3525621,1.29487588 45.9532351,1.09465154 46.4472136,1.34164079 C46.640741,1.43840449 46.7976635,1.59532698 46.8944272,1.78885438 Z" id="Triangle" transform="translate(46.000000, 7.000000) rotate(90.000000) translate(-46.000000, -7.000000) "></path>
                  </g>
                </svg>
              </span>
            </button>
          </div> :
          <div className="mm-video__placeholder"></div>
        }
      </div>
    </section>
  )
}

export default Video;
