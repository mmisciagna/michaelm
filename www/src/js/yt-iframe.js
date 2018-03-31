/** @private @enum {string} */
const Selectors_ = {
  ROOT: '[data-video]',
};

/** @private @enum {!YT.Player} */
const Players_ = {};


/**
 * ...
 * @final
 */
class YTIframe {
  constructor(player) {
    /** @private @const {!YT.Player} */
    this.player_ = player;

    /** @private @const {string} */
    this.playerId_ = this.player_.dataset.video;

    this.renderPlayer_();
  }

  /**
   * Renders a YT player with this instance's player ID.
   * @private
   */
  renderPlayer_() {
    const player = new window.YT.Player(this.player_, {
      height: '100',
      width: '100',
      videoId: this.playerId_,
      // Learn more about events here:
      // https://developers.google.com/youtube/iframe_api_reference#Events
      events: {
        onReady: () => {
          Players_[this.playerId_] = player;
        },
        onStateChange: (e) => {
          this.pauseAllOtherVideos_(e);
        },
      },
      // See all supported player vars here:
      // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters
      playerVars: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    });
  }

  /**
   * Pauses all other players when one is played.
   * @param {{
   *   data: !YT.PlayerState,
   *   target: !YT.Player,
   * }} e
   */
  pauseAllOtherVideos_(e) {
    if (e.data == window.YT.PlayerState.PLAYING) {
      for (let key in Players_) {
        if (e.target != Players_[key]) {
          Players_[key].pauseVideo();
        }
      }
    }
  }
}


module.exports.init = () => {
  if (!window.YT) {
    window.onYouTubeIframeAPIReady = () => {
      const players = Array.from(document.querySelectorAll(Selectors_.ROOT));
      players.forEach((player) => new YTIframe(player));
    };

    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];

    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}
