'use client';

import slugify from 'react-slugify';
import { GlobalString } from '@/globals/constants';
import Tooltip from '@/components/Tooltip';
import { RESUME } from '../content/resume';

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[calc(calc(100dvh-(2*var(--header-height))))] w-full max-w-1200 flex-col items-center justify-center py-48 xs:min-h-[calc(100dvh-(var(--header-height)))]">
      <h1 className="w-full font-display text-h1">
        Hello, I am{' '}
        <Tooltip
          trigger="Michael Misciagna"
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
      <h2 className="my-[.5em] w-full font-display text-h2 italic">
        <span className="highlight">Sr. Frontend Engineer</span> and{' '}
        <span className="highlight">Designer</span>
      </h2>

      <div className="w-full">
        <hr className="mb-24 hidden h-1 border-0 bg-slate-blue dark:bg-off-white xs:block" />
        <ul className="m-0 flex list-none flex-wrap items-end p-0 font-display font-medium uppercase tracking-[1px] xs:m-[unset] xs:items-center xs:justify-end">
          <li className="m-0 min-w-[50%] max-w-[50%] p-[2px] xs:ml-24 xs:min-w-[unset] xs:max-w-[unset] xs:p-0">
            <a
              className="block bg-white p-0 px-24 py-12 text-bronze transition-colors duration-200 ease-in-out hover:text-slate-blue dark:bg-slate-blue-md hover:dark:text-off-white xs:bg-transparent xs:px-0 xs:py-0 xs:dark:bg-transparent"
              href="#tldr">
              TL;DR
            </a>
          </li>
          {RESUME.map((section: any) => {
            return (
              <li
                key={section.title}
                className="m-0 min-w-[50%] max-w-[50%] p-[2px] xs:ml-24 xs:min-w-[unset] xs:max-w-[unset] xs:p-0">
                <a
                  className="block bg-white px-24 py-12 text-bronze transition-colors duration-200 ease-in-out hover:text-slate-blue dark:bg-slate-blue-md hover:dark:text-off-white xs:bg-transparent xs:px-0 xs:py-0 xs:dark:bg-transparent"
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
