const utils = require('./utils');


/** @private @enum {string} */
const Attrs_ = {
  PLAY: 'data-play',
};

/** @private @enum {string} */
const Selectors_ = {
  PLAY: `[${Attrs_.PLAY}]`,
  ROOT: '[data-video]',
};

/** @private @enum {string} */
const ClassNames_ = {
  HIDE: 'hide',
};

/** @private @enum {!YT.Player} */
const Players_ = {};


/**
 * Renders and stores YT videos via the YT Iframe API.
 * @final
 */
class YTIframe {
  constructor(player) {
    /** @private @const {!YT.Player} */
    this.player_ = player;

    /** @private @const {string} */
    this.playerId_ = this.player_.dataset.video;

    /** @private @const {!Element} */
    this.poster_ = document.querySelector(
      `[${Attrs_.PLAY}='${this.playerId_}']`
    );

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
          this.poster_.classList.remove(ClassNames_.HIDE);
          this.registerEvents_();
        },
        onStateChange: (e) => {
          this.pauseAllOtherPlayers_(e);
          this.reset_(e);
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
  pauseAllOtherPlayers_(e) {
    if (e.data == window.YT.PlayerState.PLAYING) {
      for (let key in Players_) {
        if (e.target != Players_[key]) {
          Players_[key].pauseVideo();
        }
      }
    }
  }

  /**
   * Removes the hide class name from the poster image when the video either
   * ends or is stopped.
   * @param {{
   *   data: !YT.PlayerState,
   *   target: !YT.Player,
   * }} e
   */
  reset_(e) {
    if (e.data == window.YT.PlayerState.STOP ||
        e.data == window.YT.PlayerState.ENDED) {
      this.poster_.classList.remove(ClassNames_.HIDE);
    }
  }

  /**
   * Gets the video's ID from a data attribute on the target element. Then finds
   * the corresponding video in the players dict with the ID as the key. That
   * That video is then played using the playVideo() method from the YT Iframe
   * API.
   * @param {!Element} target The target element.
   */
  play_(target) {
    const videoId = target.dataset.play;

    target.classList.add(ClassNames_.HIDE);
    Players_[videoId].playVideo();
  }

  /** private */
  registerEvents_() {
    utils.delegate(document, Selectors_.PLAY, 'click',
        this.play_.bind(this));
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
