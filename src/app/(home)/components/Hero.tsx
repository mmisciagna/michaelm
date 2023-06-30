'use client';

import slugify from 'react-slugify';
import { GlobalString } from '@/globals/constants';
import Tooltip from '@/components/Tooltip';
import { RESUME } from '@/content/resume';

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[calc(calc(100dvh-(2*var(--header-height))))] w-full max-w-1200 flex-col items-center justify-center py-48 leading-snug xs:min-h-[calc(100dvh-(var(--header-height)))]">
      <h1 className="w-full font-display text-h1">
        Hello, I am Michael{' '}
        <Tooltip
          trigger="Misciagna"
          content={
            <>
              Pronounced{' '}
              <span className="whitespace-nowrap">
                {GlobalString.PRONUNCIATION}
              </span>
            </>
          }
        />
      </h1>
      <h2 className="mt-[.5em] w-full font-display text-h2">
        <span className="highlight !block xs:!inline-block">
          Sr. Frontend Engineer <em>&</em> Designer
        </span>
      </h2>

      <div className="w-full">
        <hr className="mb-24 hidden h-1 border-0 bg-bronze-300/25 xs:block" />
        <ul className="m-0 mt-[2px] grid list-none grid-cols-2 items-end gap-[2px] p-0 font-display uppercase tracking-1 xs:m-0 xs:flex xs:items-center xs:justify-end">
          <li className="m-0 xs:ml-24">
            <a
              className="block bg-white p-0 px-24 py-12 text-bronze-300 transition-colors duration-200 ease-in-out hover:text-slate-800 dark:bg-slate-900/10 hover:dark:text-beige xs:bg-transparent xs:px-0 xs:py-0 xs:dark:bg-transparent"
              href="#tldr">
              TL;DR
            </a>
          </li>
          {RESUME.map((section: any) => {
            return (
              <li
                key={section.title}
                className="m-0 xs:ml-24">
                <a
                  className="block bg-white px-24 py-12 text-bronze-300 transition-colors duration-200 ease-in-out hover:text-slate-800 dark:bg-slate-900/10 hover:dark:text-beige xs:bg-transparent xs:px-0 xs:py-0 xs:dark:bg-transparent"
                  href={`#${slugify(section.title)}`}>
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
