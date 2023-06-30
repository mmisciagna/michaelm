'use client';

import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const errorRef = useRef(null);
  const submitBtnRef = useRef(null);

  const toggleMessage = (e: any, success = true) => {
    if (success) e.target.reset();

    (successRef.current! as HTMLElement).style.display = success
      ? 'block'
      : 'none';
    (errorRef.current! as HTMLElement).style.display = success
      ? 'none'
      : 'block';

    (submitBtnRef.current! as HTMLButtonElement).disabled = false;
  };

  const sendEmail = async (e: any) => {
    e.preventDefault();

    (submitBtnRef.current! as HTMLButtonElement).disabled = true;

    emailjs
      .sendForm(
        'service_rkc53eq',
        'template_ipqxdxa',
        formRef.current!,
        'XBbXdxac_sDqjkCXv'
      )
      .then(
        () => {
          toggleMessage(e);
        },
        (error) => {
          console.log(error.text);
          toggleMessage(e, false);
        }
      );
  };

  return (
    <div className="flex min-h-[calc(100dvh-var(--header-height)-var(--footer-height))] flex-col md:flex-row md:gap-48">
      <section className="mx-auto max-w-900 py-80 md:mx-0 md:mt-0 md:w-1/2 md:max-w-[720px]">
        <h1 className="mb-[0.5em] font-display text-h1 leading-snug">
          Drop a note
        </h1>
        <p className="my-[1em]">
          I am thrilled that you have taken the time to visit and would love to
          hear from you. Whether you have a question, comment, or just want to
          say hello, please feel free to get in touch using the contact form
          provided.
        </p>
        <div
          ref={successRef}
          className="my-[1em] hidden border border-solid border-green-700 bg-green-700/10 p-24 text-green-700"
        >
          Thank you for your interest! I'll try my best to respond as promptly
          as possible.
        </div>
        <div
          ref={errorRef}
          className="my-[1em] hidden border border-solid border-red-700 bg-red-700/10 p-24 text-red-700"
        >
          There was an error sending your message! Please try again.
        </div>
      </section>
      <section className="negate-main-spacing-x main-spacing-x flex-1 bg-slate-800 py-80 text-beige dark:bg-slate-900 md:ml-0 md:mt-0">
        <div className="w-full max-w-900">
          <form
            className="w-full md:max-w-600 md:flex-1"
            ref={formRef}
            onSubmit={sendEmail}
          >
            <div className="mb-24">
              <label
                className="mb-8 block"
                htmlFor="user_name"
              >
                Name
              </label>
              <input
                className="block w-full rounded bg-bronze-300/10 p-8"
                type="text"
                name="user_name"
                id="user_name"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="mb-8 block"
                htmlFor="user_email"
              >
                Email
              </label>
              <input
                className="block w-full rounded bg-bronze-300/10 p-8"
                type="email"
                name="user_email"
                id="user_email"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="mb-8 block"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="block min-h-[150px] w-full resize-y rounded bg-bronze-300/10 p-8"
                name="message"
                id="message"
                required
              />
            </div>
            <div className="mt-48">
              <button
                ref={submitBtnRef}
                type="submit"
                className="button"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
