import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TIDBITS } from '../../content/tidbits';
import { useSeoData } from '../../global/hooks';


/**
 * Loops through all tidbits and their tags to set all possible filters and
 * tag labels.
 */
function useGetAllPossibleTags(
  setState: React.Dispatch<React.SetStateAction<Record<string, number>>>,
) {
  useEffect(() => {
    const tagsMap = {};

    for (const tidbit of TIDBITS) {
      for (const tag of (tidbit as Tidbit).data.tags) {
        if (tagsMap[tag]) {
          tagsMap[tag] = tagsMap[tag] + 1;
        } else {
          tagsMap[tag] = 1;
        }
      }
    }

    setState(tagsMap);
  }, []);
}

/**
 * Renders the filter tags and sets the selected tags when they are clicked.
 */
function FilterTags({selectedTags, setSelectedTags}: {
  selectedTags: Set<string>;
  setSelectedTags:  React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const [possibleTags, setPossibleTags] = useState<Record<string, number>>({});

  useGetAllPossibleTags(setPossibleTags);

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const tagEl = e.currentTarget;
    const tag = tagEl.dataset.tag as string;
    const newTags = new Set([...selectedTags]);
    const hasTag = newTags.has(tag);

    tagEl.classList.toggle('active', !tagEl.classList.contains('active'));

    if (hasTag) {
      newTags.delete(tag);
    } else {
      newTags.add(tag.toLowerCase());
    }

    setSelectedTags(newTags);
  }

  const reset = () => {
    const activeFilters = [...document.querySelectorAll(
        '.mm-tidbits__tags--filter .mm-button.active')];

    for (const btn of activeFilters) {
      btn.classList.remove('active');
    }

    setSelectedTags(new Set());
  }

  return (
    <ul className="mm-tidbits__tags mm-tidbits__tags--filter">
      {Object.keys(possibleTags).sort().map((tag: string) => {
        return (
          <li key={tag.toLowerCase()}>
            <button className="mm-button"
                data-tag={tag.toLowerCase()}
                onClick={(e) => handleTagClick(e)}>
              {tag} <span>{possibleTags[tag]}</span>
            </button>
          </li>
        )
      })}
      <li>
        <button className="mm-button mm-button--secondary"
            onClick={() => reset()}
            aria-label="Reset filters">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
            <path d="M451 934q-123-10-207-101t-84-216q0-77 35.5-145T295 361l43 43q-56 33-87 90.5T220 617q0 100 66 173t165 84v60Zm60 0v-60q100-12 165-84.5T741 617q0-109-75.5-184.5T481 357h-20l60 60-43 43-133-133 133-133 43 43-60 60h20q134 0 227 93.5T801 617q0 125-83.5 216T511 934Z"/>
          </svg>
        </button>
      </li>
    </ul>
  )
}

/**
 * Renders the hero and filter tags of the tidbits page.
 */
function TidbitLayout() {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useSeoData('Tidbits', 'tidbits');

  return (
    <>
      <div className="mm-tidbits-layout">
        <section className="mm-section">
          <h1>Tidbits</h1>
          <p>
            If you're a developer, designer, or just someone interested in web development, you'll find a wealth of useful information and tips here. These are random tidbits that I came up with myself or ran across online and found interesting.
          </p>
          <FilterTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </section>
      </div>
      <Outlet context={{selectedTags: selectedTags, tidbits: TIDBITS}} />
    </>
  )
}

export default TidbitLayout;
