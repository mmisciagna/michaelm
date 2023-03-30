import React, {useRef, useEffect, useState} from 'react';
import { Navigate, useParams }  from 'react-router-dom';
import slugify from 'react-slugify';
import { SHOWCASES } from '../../global/content/showcases';
import { usePageTitleEffect } from '../../global/hooks';


declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

let player: any = undefined;

function Video({showcase, ready}: {showcase: Showcase, ready: boolean}) {
  const playerRef = useRef(null);

  if (player) {
    player.cueVideoById(showcase.videoId);
  }

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(playerRef.current, {
        videoId: showcase.videoId,
        playerVars: {
          'playsinline': 1
        },
      });
    }
  }, [ready]);

  return (
    <section className="mm-section mm-section--full-bleed mm-showcase__video-bg">
      <div className="mm-section__inner">
        {ready ?
          <div className="mm-showcase__video">
            <div ref={playerRef}></div>
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
  useIframeApi(ytReady).then(() => setYTReady(true));

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
          <p className="mm-showcase__stack">
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
      </section>
      {showcase.videoId && <Video showcase={showcase} ready={ytReady} /> }
    </div>
  )
}

function useIframeApi(loaded: boolean) {
  const loadPromise = new Promise((resolve, reject) => {
    useEffect(() => {
      if (loaded) {
        reject();
        console.log('YT iframe API already loaded');
      } else {
        // setTimeout(() => {
          const tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
          resolve(true);
        // }, 2000);
      }
    }, []);
  });

  return loadPromise;
}

export default Showcase;
