const utils = require('./utils');


/** @private @enum {string} */
const ClassNames_ = {
  HIDE: 'hide',
  OPENED: 'mobile-nav--opened',
  NO_SCROLL: 'no-scroll',
};

/** @private @enum {string} */
const Selectors_ = {
  CLOSE_BTN: '.js-close-btn',
  OPEN_BTN: '.js-menu-btn',
  ROOT: '.js-mobile-nav',
};

/** @private @enum {string} */
const Aria_ = {
  HIDDEN: 'aria-hidden',
};

/** @private @const {number} */
const MAX_WIDTH_ = 768;


/**
 * Toggles the mobile nav.
 * @final
 */
class MobileNav {
  constructor() {
    /** @private @const {!Element} */
    this.root_ = document.querySelector(Selectors_.ROOT);

    /** @private @const {!Element} */
    this.openBtn_ = document.querySelector(Selectors_.OPEN_BTN);

    /** @private @const {!Element} */
    this.closeBtn_ = document.querySelector(Selectors_.CLOSE_BTN);

    this.registerEvents_();
  }

  /**
   * Whether the root element has the opened class name or not.
   * @return {boolean}
   * private
   */
  isRootVisible_() {
    return this.root_.classList.contains(ClassNames_.OPENED);
  };

  /** private */
  toggleVisibilty_() {
    this.root_.classList.toggle(ClassNames_.OPENED, !this.isRootVisible_());
    document.body.classList.toggle(ClassNames_.NO_SCROLL,
        this.isRootVisible_());
  }

  /** private */
  toggleBtns_() {
    this.openBtn_.classList.toggle(ClassNames_.HIDE, this.isRootVisible_());
    this.closeBtn_.classList.toggle(ClassNames_.HIDE, !this.isRootVisible_());
  }

  /** private */
  toggleAria_() {
    this.root_.setAttribute(Aria_.HIDDEN, !this.isRootVisible_());
  }

  /** private */
  handleToggle_() {
    this.toggleVisibilty_();
    this.toggleBtns_();
    this.toggleAria_();
  }

  /** private */
  handleResize_() {
    if (window.innerWidth >= MAX_WIDTH_ && this.isRootVisible_()) {
      this.handleToggle_();
    }
  }

  /** private */
  registerEvents_() {
    utils.delegate(document, Selectors_.OPEN_BTN, 'click',
        this.handleToggle_.bind(this));
    utils.delegate(document, Selectors_.CLOSE_BTN, 'click',
        this.handleToggle_.bind(this));

    window.addEventListener('resize', this.handleResize_.bind(this));
  }
}


module.exports.init = () => new MobileNav;
