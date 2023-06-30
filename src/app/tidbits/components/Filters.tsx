'use client';

import { useEffect, useState } from 'react';
import { StorageKey, CustomEvents } from '@/globals/constants';
import { useGetAllPossibleTags } from '../hooks/useGetAllPossibleTags';

const ACTIVE_FILTER_ATTR = 'data-active-filter';

let filterEvent: CustomEvent;

export default function Filters() {
  const storedTags = window.sessionStorage.getItem(StorageKey.TIDBIT_TAGS);
  const [possibleTags, setPossibleTags] = useState<Record<string, number>>({});

  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set(storedTags?.split(',')) || new Set()
  );

  useGetAllPossibleTags(setPossibleTags);

  useEffect(() => {
    if (selectedTags.size === 0) {
      window.sessionStorage.removeItem(StorageKey.TIDBIT_TAGS);
    }
  }, []);

  useEffect(() => {
    window.dispatchEvent(filterEvent);
  }, [selectedTags]);

  filterEvent = new CustomEvent(CustomEvents.TIDBIT_FILTERING, {
    detail: { selectedTags },
  });

  return (
    <ul className="mb-12 flex flex-wrap items-center gap-12">
      {Object.keys(possibleTags)
        .sort()
        .map((tag: string) => {
          return (
            <li
              key={tag.toLowerCase()}
              className="inline-block"
            >
              <button
                className="button relative !flex h-40 items-center justify-center overflow-hidden whitespace-nowrap rounded-full !pr-48 normal-case leading-none tracking-normal"
                data-tag={tag.toLowerCase()}
                data-active-filter={selectedTags.has(tag.toLowerCase())}
                onClick={(e) =>
                  handleTagClick(e, selectedTags, setSelectedTags)
                }
              >
                {tag}{' '}
                <span className="absolute right-0 top-0 flex h-full w-24 items-center justify-center bg-bronze-300 text-beige dark:text-slate-800">
                  {possibleTags[tag]}
                </span>
              </button>
            </li>
          );
        })}
      <li>
        <button
          className="button button--secondary relative !flex h-40 items-center justify-center overflow-hidden whitespace-nowrap rounded-full normal-case leading-none tracking-normal"
          onClick={() => reset(setSelectedTags)}
          aria-label="Reset filters"
        >
          Reset
          <svg
            className="ml-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
          >
            <path d="M451 934q-123-10-207-101t-84-216q0-77 35.5-145T295 361l43 43q-56 33-87 90.5T220 617q0 100 66 173t165 84v60Zm60 0v-60q100-12 165-84.5T741 617q0-109-75.5-184.5T481 357h-20l60 60-43 43-133-133 133-133 43 43-60 60h20q134 0 227 93.5T801 617q0 125-83.5 216T511 934Z" />
          </svg>
        </button>
      </li>
    </ul>
  );
}

function handleTagClick(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  selectedTags: Set<string>,
  setSelectedTags: React.Dispatch<React.SetStateAction<Set<string>>>
) {
  const tagEl = e.currentTarget;
  const tag = tagEl.dataset.tag as string;
  const newTags = new Set([...selectedTags]);
  const hasTag = newTags.has(tag);

  tagEl.setAttribute(
    ACTIVE_FILTER_ATTR,
    `${!tagEl.hasAttribute(ACTIVE_FILTER_ATTR)}`
  );

  if (hasTag) {
    newTags.delete(tag);
  } else {
    newTags.add(tag.toLowerCase());
  }

  window.sessionStorage.setItem(StorageKey.TIDBIT_TAGS, [...newTags].join(','));
  setSelectedTags(newTags);

  if (newTags.size === 0) {
    window.sessionStorage.removeItem(StorageKey.TIDBIT_TAGS);
  }
}

function reset(
  setSelectedTags: React.Dispatch<React.SetStateAction<Set<string>>>
) {
  const activeFilters = [
    ...document.querySelectorAll(`[${ACTIVE_FILTER_ATTR}]`),
  ];

  for (const btn of activeFilters) {
    btn.removeAttribute(ACTIVE_FILTER_ATTR);
  }

  window.sessionStorage.removeItem(StorageKey.TIDBIT_TAGS);
  setSelectedTags(new Set());
}
