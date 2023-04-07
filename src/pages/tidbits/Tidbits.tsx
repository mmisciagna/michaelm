import React, { useState, useEffect } from 'react';
import { TIDBITS } from '../../global/content/tidbits';
import ReactMarkdown from 'react-markdown';


global.Buffer = global.Buffer || require('buffer').Buffer;

const date = '4/6/2023';
const defaultSelectedTags: Set<string> = new Set([]);
const possibleTags = ['CSS', 'Design', 'JS'];
let tidbits = [] as HTMLElement[];
let firstRender = true;

function Tidbits() {
  const [selectedTags, setSelectedTags] = useState(() => defaultSelectedTags);

  useGetTidbits('[data-tags]');
  useFilterTidbits(selectedTags);

  const filterTags = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const tagEl = e.currentTarget;
    const tag = tagEl.dataset.tag as string;
    const newTags = new Set([...selectedTags]);
    const hasTag = newTags.has(tag);

    firstRender = false;

    tagEl.classList.toggle('active', !tagEl.classList.contains('active'));

    if (hasTag) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }

    setSelectedTags(newTags);
  }

  return (
    <div className="mm-tidbits">
      <section className="mm-section">
        <h1>Tidbits</h1>
        <p>Last updated: {date}</p>
        <p>
          If you're a developer, designer, or just someone interested in web development, you'll find a wealth of useful information and tips here. I've gathered a variety of frontend dev tidbits that cover everything from HTML and CSS tricks to JavaScript best practices and framework updates. There's no rhyme or reason to these. They're just tidbits I ran across online and found interesting.
        </p>
        <ul className="mm-tidbits__tags mm-tidbits__tags--filter">
          {possibleTags.map((tag: string) => {
            return (
              <li key={tag.toLowerCase()}>
                <button className="mm-button"
                    data-tag={tag.toLowerCase()}
                    onClick={(e) => filterTags(e)}>
                  {tag}
                </button>
              </li>
            )
          })}
        </ul>
      </section>
      <section className="mm-section mm-section--full-bleed" style={{
        marginBottom: 'unset',
      }}>
        <div className="mm-section__inner">
          <div className="mm-tidbits__content">
            {TIDBITS.map((tidbit: any) => {
              const {data, content} = tidbit;

              return (
                <div className="mm-tidbits__tidbit" data-tags={data.tags.join(',')}
                    key={data.title.toLowerCase()}>
                  <ul className="mm-tidbits__tags">
                    {data.tags.map((tag: string) => {
                      return <li key={tag.toLowerCase()}>{tag}</li>
                    })}
                  </ul>
                  <h2>
                    <ReactMarkdown>{data.title}</ReactMarkdown>
                  </h2>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

function useGetTidbits(selector: string) {
  useEffect(() => {
    tidbits = [...document.querySelectorAll(selector)] as HTMLElement[];
  }, []);
}

function useFilterTidbits(set: Set<string>) {
  useEffect(() => {
    if (firstRender) return;

    for (const tidbit of tidbits) {
      const tidbitTags = tidbit.dataset.tags!.split(',');

      for (const tidbitTag of tidbitTags) {
        tidbit.classList.toggle('hide',
            !set.has(tidbitTag.toLocaleLowerCase()) && set.size > 0);
      }
    }
  }, [set]);
}

export default Tidbits;
