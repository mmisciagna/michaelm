'use client';

import { createContext } from 'vm';
import Filters from './components/Filters';

export default function TidbitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="mx-auto my-80 max-w-900">
        <h1 className="font-display text-h1 leading-snug">Tidbits</h1>
        <p className="my-[1em]">
          If you're a developer, designer, or just someone interested in web
          development, you'll find a wealth of useful information and tips here.
          These are random tidbits that I came up with myself or ran across
          online and found interesting.
        </p>
        <Filters />
      </section>
      {children}
    </>
  );
}
