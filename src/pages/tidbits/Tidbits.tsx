import React, { useEffect, useState } from 'react';
import { useOutletContext }  from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import { useInViewRef, useSetAnimateClassName, usePageTitleEffect } from '../../global/hooks';


function shouldRenderTidbit(tags: string[], selectedTags: Set<string>): boolean {
  for (const tag of tags) {
    if (selectedTags.has(tag.toLowerCase())) {
      return true
    };
  }
  return false;
}

function TidbitPagination({selectedTags, tidbits}: {
  selectedTags: Set<string>,
  tidbits: any[],
}) {
  const [tidbitCount, setTidbitCount] = useState<number>(() => 0);

  useEffect(() => {
    const tidbitEls = [...document.querySelectorAll('.mm-tidbits__tidbit')]!;
    setTidbitCount(tidbitEls.length);
  }, [selectedTags]);

  return (
    <p className="mm-tidbits__pagination">
      Viewing <span>{tidbitCount} / {tidbits.length}</span>
    </p>
  )
}

function Tidbits() {
  const {selectedTags, tidbits} = useOutletContext() as {
    selectedTags: Set<string>,
    tidbits: any[],
  };

  usePageTitleEffect('Tidbits')

  return (
    <div className="mm-tidbits">
      <section className="mm-section mm-section--full-bleed" style={{
        marginBottom: 'unset',
      }}>
        <div className="mm-section__inner">
          <div className="mm-tidbits__metadata">
            <TidbitPagination selectedTags={selectedTags} tidbits={tidbits} />
          </div>
          <div className="mm-tidbits__content">
            {tidbits.map((tidbit: any) => {
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
                      <div className="mm-tidbits__metadata">
                        <p style={{margin: 'unset'}}>{data.date}</p>
                      </div>
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
            <TidbitPagination selectedTags={selectedTags} tidbits={tidbits} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tidbits;
