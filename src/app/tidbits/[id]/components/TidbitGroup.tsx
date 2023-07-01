'use client';

import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import { redirect } from 'next/navigation';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Tidbits } from '@/content/tidbits';
import { CustomEvents } from '@/globals/constants';
import { useTidbitGroups } from '../hooks/useTidbitGroups';
import { useStoredTags } from '../../hooks/useStoredTags';

import Pagination from './Pagination';

export default function TidbitGroup({ id }: { id: number }) {
  if (isNaN(id) || id < 1) {
    redirect('/tidbits/1');
  }

  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [tidbitGroups, setTidbitGroups] = useState<TidbitGroup>([]);
  const [tidbitsCount, setTidbitsCount] = useState(Tidbits.length);

  const tidbitsContainerRef = useRef(null);

  useStoredTags(setSelectedTags);

  useEffect(() => {
    // TODO: Figure out how to get this to work with `any`.
    const handleFiltering = (e: any) => {
      setSelectedTags(e.detail.selectedTags);
    };

    window.addEventListener(CustomEvents.TIDBIT_FILTERING, handleFiltering);

    return () => {
      window.removeEventListener(
        CustomEvents.TIDBIT_FILTERING,
        handleFiltering
      );
    };
  }, []);

  useTidbitGroups({
    tidbits: Tidbits,
    selectedTags,
    setTidbitGroups,
    setTidbitsCount,
  });

  const tidbitGroupIndex = id - 1;
  const tidbitsToRender: Tidbit[] = tidbitGroups[tidbitGroupIndex];

  if (tidbitGroups.length > 0 && id > tidbitGroups.length) {
    redirect(`/tidbits/${tidbitGroups.length}`);
  }

  return (
    <div ref={tidbitsContainerRef}>
      <section
        className="mm-section"
        style={{
          marginBottom: 'unset',
          marginTop: 'unset',
        }}
      >
        <p className="mm-tidbits__count">
          Viewing {tidbitsCount} / {Tidbits.length}
        </p>
      </section>
      <section
        className="mm-section mm-section--full-bleed"
        style={{
          marginBottom: 'unset',
          marginTop: 'unset',
        }}
      >
        <div className="mm-section__inner">
          <div className="mm-tidbits__metadata">
            <Pagination
              tidbits={tidbitGroups}
              index={tidbitGroupIndex}
              container={tidbitsContainerRef.current!}
            />
          </div>
          <div className="mm-tidbits__content">
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
                    className={`mm-tidbits__tidbit`}
                    data-tags={tags.join(',')}
                  >
                    <ul className="mm-tidbits__tags">
                      {tags.map((tag: string) => {
                        return <li key={tag.toLowerCase()}>{tag}</li>;
                      })}
                    </ul>
                    <div className="mm-tidbits__metadata">
                      <p style={{ margin: 'unset' }}>{date}</p>
                    </div>
                    <h2 className="markdown">
                      <ReactMarkdown>{title}</ReactMarkdown>
                    </h2>
                    <div
                      className="markdown"
                      dangerouslySetInnerHTML={{ __html: markedContent }}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className="mm-tidbits__metadata">
            <Pagination
              tidbits={tidbitGroups}
              index={tidbitGroupIndex}
              container={tidbitsContainerRef.current!}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
