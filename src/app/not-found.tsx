'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function NotFound() {
  const countdownRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState(3);

  const router = useRouter();

  useEffect(() => {
    let interval = setInterval(() => {
      countdownRef.current!.textContent = countdown.toString();

      setCountdown((prevCountdown: number): number => {
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownRef]);

  useEffect(() => {
    if (countdown === 1) {
      router.replace('/');
    }
  }, [countdown]);

  return (
    <section className="mx-auto my-80 flex max-w-900 flex-col items-center">
      <div>
        <h1 className="font-display text-h1">404</h1>
        <h2 className="font-display text-h2">
          Whoops! This page does not exist.
        </h2>
        <p>
          Redirecting to{' '}
          <Link
            href="/"
            className="border-b border-dotted border-slate-800 transition-all duration-200 ease-in-out hover:border-b-transparent"
          >
            About
          </Link>{' '}
          page in{' '}
          <strong
            className="font-display text-h3"
            ref={countdownRef}
          >
            {countdown}
          </strong>
          .
        </p>
      </div>
    </section>
  );
}
