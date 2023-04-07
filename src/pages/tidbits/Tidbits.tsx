import React, { useState, useEffect } from 'react';
import { TIDBITS } from '../../global/content/tidbits';
import ReactMarkdown from 'react-markdown';


const date = '4/6/2023';

function shouldRenderTidbit(tags: string[], selectedTags: Set<string>) {
  for (const tag of tags) {
    if (selectedTags.has(tag.toLowerCase())) {
      return true
    };
  }
  return false;
}

function useGetPossibleTags(setState: any) {
  useEffect(() => {
    const allPossibleTags: string[] = [];

    for (const tidbit of TIDBITS) {
      for (const tag of tidbit.data.tags) {
        allPossibleTags.push(tag);
      }
    }

    setState(new Set(allPossibleTags.sort()));
  }, []);
}

function Tidbits() {
  const [possibleTags, setPossibleTags] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useGetPossibleTags(setPossibleTags);

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
    <div className="mm-tidbits">
      <section className="mm-section">
        <h1>Tidbits</h1>
        <p>Last updated: {date}</p>
        <p>
          If you're a developer, designer, or just someone interested in web development, you'll find a wealth of useful information and tips here. I've gathered a variety of frontend dev tidbits that cover everything from HTML and CSS tricks to JavaScript best practices and framework updates. There's no rhyme or reason to these. They're just tidbits I ran across online and found interesting.
        </p>
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
      </section>
      <section className="mm-section mm-section--full-bleed" style={{
        marginBottom: 'unset',
      }}>
        <div className="mm-section__inner">
          <div className="mm-tidbits__content">
            {TIDBITS.map((tidbit: any) => {
              const {data, content} = tidbit;
              const tags = data.tags;
              const doRenderTidbit = selectedTags.size === 0 ||
                  shouldRenderTidbit(tags, selectedTags);

              return (
                <React.Fragment key={data.title.toLowerCase()}>
                  {doRenderTidbit &&
                    <div className="mm-tidbits__tidbit" data-tags={data.tags.join(',')}>
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
                  }
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tidbits;
