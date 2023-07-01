'use client';

import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import { redirect } from 'next/navigation';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Tidbits } from '@/content/tidbits';
import { CustomEvents } from '@/globals/constants';
import { useTidbitGroups } from '../hooks/useTidbitGroups';
import { useStoredTags } from '../../hooks/useStoredTags';
import { useCodeHighlighter } from '../hooks/useCodeHighlighter';
import Pagination from './Pagination';
import 'highlight.js/styles/base16/dracula.css';
import { useCustomFilterEvent } from '../hooks/useCustomFilterEvent';

export default function TidbitGroup({ id }: { id: number }) {
  if (isNaN(id) || id < 1) {
    redirect('/tidbits/1');
  }

  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [tidbitGroups, setTidbitGroups] = useState<TidbitGroup>([]);
  const [tidbitsCount, setTidbitsCount] = useState(Tidbits.length);

  const tidbitsContainerRef = useRef(null);

  useStoredTags(setSelectedTags);
  useCustomFilterEvent(setSelectedTags);
  useTidbitGroups(Tidbits, selectedTags, setTidbitGroups, setTidbitsCount);
  useCodeHighlighter(tidbitsContainerRef.current);

  const tidbitGroupIndex = id - 1;
  const tidbitsToRender: Tidbit[] = tidbitGroups[tidbitGroupIndex];

  if (tidbitGroups.length > 0 && id > tidbitGroups.length) {
    redirect(`/tidbits/${tidbitGroups.length}`);
  }

  return (
    <div ref={tidbitsContainerRef}>
      <section className="mx-auto max-w-900">
        <p className="eyebrow text-center">
          Viewing {tidbitsCount} / {Tidbits.length}
        </p>
      </section>
      <section className="negate-main-spacing-x main-spacing-x bg-slate-800 py-80 text-beige dark:bg-slate-900">
        <div className="mx-auto w-full max-w-900">
          <Pagination
            tidbits={tidbitGroups}
            index={tidbitGroupIndex}
            container={tidbitsContainerRef.current!}
          />
          <div>
            {tidbitsToRender?.map((tidbit: Tidbit) => {
              const { data, content } = tidbit;
              const { date, title, tags } = data;
              const markedContent = marked(content, {
                mangle: false,
                headerIds: false,
              });

              return (
                <React.Fragment key={title.toLowerCase()}>
                  <div
                    className="border-t border-solid border-bronze-300/25 pb-80 last:border-b last:border-solid last:border-bronze-300/25"
                    data-tags={tags.join(',')}
                  >
                    <ul className="mb-12 flex items-center justify-end gap-[2px]">
                      {tags.map((tag: string) => {
                        return (
                          <li
                            key={tag.toLowerCase()}
                            className="inline-block whitespace-nowrap rounded-bl-[4px] rounded-br-[4px] bg-bronze-300/25 p-8 font-mono text-sm font-bold leading-none"
                          >
                            {tag}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="markdown">
                      <div className="font-display text-md uppercase tracking-wide">
                        <p>{date}</p>
                      </div>
                      <h2>
                        <ReactMarkdown>{title}</ReactMarkdown>
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: markedContent }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <Pagination
            tidbits={tidbitGroups}
            index={tidbitGroupIndex}
            container={tidbitsContainerRef.current!}
          />
        </div>
      </section>
    </div>
  );
}
