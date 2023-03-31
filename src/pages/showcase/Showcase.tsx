import React, { useRef, useState } from 'react';
import { Navigate, useParams }  from 'react-router-dom';
import slugify from 'react-slugify';
import { SHOWCASES } from '../../global/content/showcases';
import { GlobalString } from '../../global/constants';
import { usePageTitleEffect } from '../../global/hooks';
import { useRenderPlayer, useIframeApi, globalPlayer } from './showcase.hooks';


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

  if (globalPlayer) {
    toggleBtn(true);
    globalPlayer.cueVideoById(showcase.videoId);
  }

  useRenderPlayer(playerRef, showcase.videoId!);

  return (
    <section className="mm-section mm-section--full-bleed mm-showcase__video-bg">
      <div className="mm-section__inner" style={{
        maxWidth: '1440px',
      }}>
        {ready ?
          <div className="mm-showcase__video">
            <div ref={playerRef}></div>
            <button className="mm-showcase__play-btn"
                style={{
                  backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img})`,
                }}
                ref={btnRef}
                onClick={() => {globalPlayer.playVideo()}}>
              <span className="mm-showcase__play-icon" >
                <svg viewBox="0 0 13 14" version="1.1">
                  <g transform="translate(-39.000000, 0.000000)">
                    <path d="M46.8944272,1.78885438 L52.2763932,12.5527864 C52.5233825,13.0467649 52.3231581,13.6474379 51.8291796,13.8944272 C51.6903242,13.9638549 51.5372111,14 51.381966,14 L40.618034,14 C40.0657492,14 39.618034,13.5522847 39.618034,13 C39.618034,12.8447549 39.6541791,12.6916418 39.7236068,12.5527864 L45.1055728,1.78885438 C45.3525621,1.29487588 45.9532351,1.09465154 46.4472136,1.34164079 C46.640741,1.43840449 46.7976635,1.59532698 46.8944272,1.78885438 Z" id="Triangle" transform="translate(46.000000, 7.000000) rotate(90.000000) translate(-46.000000, -7.000000) "></path>
                  </g>
                </svg>
              </span>
            </button>
          </div> :
          <div className="mm-showcase__video-placeholder"></div>
        }
      </div>
    </section>
  )
}

function Showcase() {
  const {id} = useParams();
  const [ytReady, setYTReady] = useState(window.YT !== undefined);

  const showcase = SHOWCASES.find((showcase) => {
    return slugify(showcase.title) === id;
  });

  // Redirects to 404 if no showcase is found.
  if (!showcase) return <Navigate to="/404" />

  // Updates page title.
  usePageTitleEffect(`Showcase - ${showcase.title}`, [showcase.title]);

  // Loads YT Iframe API, if not present already.
  useIframeApi(ytReady).then(() => {
    setYTReady(true);
  });

  return (
    <div className="mm-showcase">
      <section className="mm-section mm-section--full-bleed"
          style={{
            marginBottom: 'unset',
            marginTop: 'unset',
            paddingBottom: 'unset',
          }}>
        <div className="mm-section__inner">
          <h1 className="mm-showcase__title">
            {showcase.title}
          </h1>
          <div className="mm-showcase__stack">
            <p className="mm-showcase__stack-title">
              <span className="mm-showcase__stack-label">
                Stack
              </span>
            </p>
            <p className="mm-showcase__stack-list">
              {showcase.stack.map((label: string) => {
                return (
                  <span key={label}
                      className="mm-showcase__stack-label">
                    {label}
                  </span>
                )
              })}
            </p>
          </div>
        </div>
      </section>
      {showcase.videoId && <Video showcase={showcase} ready={ytReady} />}
    </div>
  )
}

export default Showcase;
