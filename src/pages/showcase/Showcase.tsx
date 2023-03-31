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
      <div className="mm-section__inner">
        {ready ?
          <div className="mm-showcase__video">
            <div ref={playerRef}></div>
            <button className="mm-showcase__play-btn"
                style={{
                  backgroundImage: `url(${GlobalString.SHOWCASE_IMG_SRC_BASE}/${showcase.img})`,
                }}
                ref={btnRef}
                onClick={() => {globalPlayer.playVideo()}}>
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
