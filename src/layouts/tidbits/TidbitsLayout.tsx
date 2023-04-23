import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TIDBITS } from '../../content/tidbits';
import { useSeoData } from '../../global/hooks';


/**
 * Loops through all tidbits and their tags to set all possible filters and
 * tag labels.
 */
function useGetAllPossibleTags(
  setState: React.Dispatch<React.SetStateAction<Set<string>>>,
) {
  useEffect(() => {
    const allPossibleTags: string[] = [];

    for (const tidbit of TIDBITS) {
      for (const tag of (tidbit as Tidbit).data.tags) {
        allPossibleTags.push(tag);
      }
    }

    setState(new Set(allPossibleTags.sort()));
  }, []);
}

/**
 * Renders the filter tags and sets the selected tags when they are clicked.
 */
function FilterTags({selectedTags, setSelectedTags}: {
  selectedTags: Set<string>;
  setSelectedTags:  React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const [possibleTags, setPossibleTags] = useState<Set<string>>(new Set());

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

  return (
    <ul className="mm-tidbits__tags mm-tidbits__tags--filter">
      {[...possibleTags].map((tag: string) => {
        return (
          <li key={tag.toLowerCase()}>
            <button className="mm-button"
                data-tag={tag.toLowerCase()}
                onClick={(e) => handleTagClick(e)}>
              {tag}
            </button>
          </li>
        )
      })}
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
