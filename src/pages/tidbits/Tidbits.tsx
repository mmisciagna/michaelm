import React, { useState, useEffect } from 'react';
import { TIDBITS } from '../../content/tidbits';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import { useInViewRef, useSetAnimateClassName, usePageTitleEffect } from '../../global/hooks';


const date = '4/6/2023';

function shouldRenderTidbit(tags: string[], selectedTags: Set<string>): boolean {
  for (const tag of tags) {
    if (selectedTags.has(tag.toLowerCase())) {
      return true
    };
  }
  return false;
}

function useGetAllPossibleTags(setState: any) {
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

interface FitlerTagsProps {
  selectedTags: Set<string>;
  setSelectedTags: any;
}

function FilterTags({selectedTags, setSelectedTags}: FitlerTagsProps) {
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

function TidbitPagination({selectedTags}: {selectedTags: Set<string>}) {
  const [tidbitCount, setTidbitCount] = useState<number>(() => 0);

  useEffect(() => {
    const tidbitEls = [...document.querySelectorAll('.mm-tidbits__tidbit')]!;
    setTidbitCount(tidbitEls.length);
  }, [selectedTags]);

  return (
    <p className="mm-tidbits__pagination">
      Viewing <span>{tidbitCount} / {TIDBITS.length}</span>
    </p>
  )
}

function Tidbits() {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  usePageTitleEffect('Tidbits')

  return (
    <div className="mm-tidbits">
      <section className="mm-section">
        <h1>Tidbits</h1>
        <div className="mm-tidbits__metadata">
          <p>Last updated: {date}</p>
        </div>
        <p>
          If you're a developer, designer, or just someone interested in web development, you'll find a wealth of useful information and tips here. These are random tidbits that I came up with myself or ran across online and found interesting.
        </p>
        <FilterTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </section>
      <section className="mm-section mm-section--full-bleed" style={{
        marginBottom: 'unset',
      }}>
        <div className="mm-section__inner">
          <div className="mm-tidbits__metadata">
            <TidbitPagination selectedTags={selectedTags} />
          </div>
          <div className="mm-tidbits__content">
            {TIDBITS.map((tidbit: any) => {
              const {data, content} = tidbit;
              const tags = data.tags;
              const setRefs = useInViewRef();
              const markedConent = marked(content);

              const doRenderTidbit =
                  selectedTags.size === 0 ||
                  shouldRenderTidbit(tags, selectedTags);

              return (
                <React.Fragment key={data.title.toLowerCase()}>
                  {doRenderTidbit &&
                    <div className={`mm-tidbits__tidbit mm-animate ${useSetAnimateClassName(setRefs.inView)}`}
                        data-tags={data.tags.join(',')}
                        ref={setRefs.ref}>
                      <ul className="mm-tidbits__tags">
                        {data.tags.map((tag: string) => {
                          return <li key={tag.toLowerCase()}>{tag}</li>
                        })}
                      </ul>
                      <h2>
                        <ReactMarkdown>{data.title}</ReactMarkdown>
                      </h2>
                      <div dangerouslySetInnerHTML={{__html: markedConent}} />
                    </div>
                  }
                </React.Fragment>
              )
            })}
          </div>
          <div className="mm-tidbits__metadata">
            <TidbitPagination selectedTags={selectedTags} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tidbits;
