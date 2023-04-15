import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { usePageTitleEffect } from '../../global/hooks';

function Contact() {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const errorRef = useRef(null);
  const submitBtnRef = useRef(null);

  usePageTitleEffect('Contact');

  const toggleMessage = (e: any, success = true) => {
    if (success) e.target.reset();
    (successRef.current! as HTMLElement).style.display = success ? 'block' : 'none';
    (errorRef.current! as HTMLElement).style.display = success ? 'none' : 'block';
    (submitBtnRef.current! as HTMLButtonElement).disabled = false;
  };

  const sendEmail = async (e: any) => {
    e.preventDefault();

    (submitBtnRef.current! as HTMLButtonElement).disabled = true;

    emailjs.sendForm(
      'service_rkc53eq',
      'template_ipqxdxa',
      formRef.current!,
      'XBbXdxac_sDqjkCXv',
    ).then(() => {
      toggleMessage(e);
    }, (error) => {
      console.log(error.text);
      toggleMessage(e, false);
    });
  };

  return (
    <div className="mm-contact">
      <section className="mm-section">
        <div className="mm-contact__message">
          <h1>Drop a note</h1>
          <p>
            I am thrilled that you have taken the time to visit and would love to hear from you. Whether you have a question, comment, or just want to say hello, please feel free to get in touch using the contact form provided.
          </p>
          <div style={{display: 'none'}} ref={successRef} className="mm-contact__submit-message mm-contact__submit-message--success">
            Thank you for your interest! I'll try my best to respond as promptly as possible.
          </div>
          <div style={{display: 'none'}} ref={errorRef} className="mm-contact__submit-message mm-contact__submit-message--error">
            There was an error sending your message! Please try again.
          </div>
        </div>
      </section>
      <section className="mm-section mm-section--full-bleed">
        <div className="mm-section__inner">
          <form className="mm-contact__form" ref={formRef} onSubmit={sendEmail}>
            <div className="mm-contact__form-field">
              <label htmlFor="user_name">Name</label>
              <input type="text" name="user_name" id="user_name" required />
            </div>
            <div className="mm-contact__form-field">
              <label htmlFor="user_email">Email</label>
              <input type="email" name="user_email" id="user_email" required />
            </div>
            <div className="mm-contact__form-field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" required />
            </div>
            <div className="mm-contact__submit">
              <button ref={submitBtnRef} type="submit" className="mm-button">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
