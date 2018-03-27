/** @private @enum {string} */
const Selectors_ = {
  ERROR_MSG: '.js-form-error-msg',
  FORM: '.js-form',
  FORM_INPUT: '.js-form-input',
  SUBMIT_BTN: '.js-form-submit-btn',
  SENT_MSG: '.js-form-sent',
}

/** @private @enum {string} */
const ClassNames_ = {
  HIDE: 'hide',
};

/** @private @const {string} */
const ENDPOINT_ = '/contact-form/';

/** @private @const {!RegExp} */
const EMAIL_REGEX_ = new RegExp(
    '([\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w-]+\\.)[a-zA-Z]{2,7})');


/**
 * Validates and submits the contact form.
 * @final
 */
class Contact {
  constructor(form) {
    /** @private @const {!Element} */
    this.form_ = form;

    /** @private @const {!Element} */
    this.submitBtn_ = this.form_.querySelector(Selectors_.SUBMIT_BTN);

    /** @private @const {!Array<!Element>} */
    this.inputs_ = Array.from(
      this.form_.querySelectorAll(Selectors_.FORM_INPUT)
    );

    /** @private @const {!Array<!Element>} */
    this.errorMsgs_ = Array.from(
      this.form_.querySelectorAll(Selectors_.ERROR_MSG)
    );

    /** @private @const {!Object} */
    this.entries_ = {};

    /** @private @const {!Element} */
    this.sentMsg_ = document.querySelector(Selectors_.SENT_MSG);

    this.registerEvents_();
  }

  /**
   * Shows error message if an input is not filled in and determines whether the
   * form is ready to be submitted or not.
   * @param {!Event} e
   * @returns {boolean}
   * @private
   */
  validate_() {
    let filledInputs = 0;
    let isEmailValid = false;

    this.inputs_.forEach((input, i) => {
      let isEmail = input.type == 'email';

      if (isEmail) {
        isEmailValid = EMAIL_REGEX_.test(input.value);
      }

      if (!input.value || (isEmail && !isEmailValid)) {
        this.errorMsgs_[i].classList.remove(ClassNames_.HIDE);
      } else  {
        this.errorMsgs_[i].classList.add(ClassNames_.HIDE);
        filledInputs++;
      }

      this.entries_[input.name] = input.value;
    });

    return filledInputs == this.inputs_.length && isEmailValid;
  }

  /** @private */
  showSentMsg_() {
    this.form_.classList.add(ClassNames_.HIDE);
    this.sentMsg_.classList.remove(ClassNames_.HIDE);
  }

  /**
   * Submits form.
   * @param {!Event} e
   * @private
   */
  submit_(e) {
    e.preventDefault();

    if (this.validate_()) {
      const postData = new FormData();
      const http = new XMLHttpRequest();

      this.submitBtn_.setAttribute('disabled', true);

      for (let key in this.entries_) {
        postData.append(key, this.entries_[key]);
      }

      http.onreadystatechange = () => {
        console.log(http.readyState, http.status);
        if (http.readyState == 4 && http.status == 200) {
          this.showSentMsg_();
        } else if (http.status == 500) {
          // console.log('Sorry, something went wrong. Please try again.');
        }

        this.submitBtn_.removeAttribute('disabled');
      };

      http.open('POST', ENDPOINT_, true);
      http.send(postData);
    }
  }

  /** @private */
  registerEvents_() {
    this.submitBtn_.addEventListener('click', this.submit_.bind(this));
    this.submitBtn_.addEventListener('touchend', this.submit_.bind(this));
  }
}

module.exports.init = () => {
  const form = document.querySelector(Selectors_.FORM);
  if (form) new Contact(form);
};
