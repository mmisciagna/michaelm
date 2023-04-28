import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext, useParams, NavLink, Link, Navigate }  from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import 'highlight.js/styles/base16/dracula.css';
import { useCodeHighlighter, useStructuredTidbits } from './tidbits.hooks';
// import { useInViewRef, useSetAnimateClassName } from '../../global/hooks';


/**
 * Creates the pagination with the given tidbits.
 */
function TidbitPagination({tidbits, index, container}: {
  tidbits: StructuredTidbits,
  index: number,
  container: HTMLElement,
}) {
  return (
    <div className="mm-tidbits__pagination">
      <Link className={`mm-button ${index === 0 ? 'disabled' : ''}`}
          to={`/${index}`}
          tabIndex={index === 0 ? -1 : 0}
          onClick={() => container.scrollIntoView({behavior: 'smooth'})}>
        Previous
      </Link>
      <p className="mm-tidbits__pagination-pages">
        {tidbits.map((tidbitGroup: Tidbit[], i: number) => {
          return (
            <NavLink key={tidbitGroup[0].data.title}
                to={`/${i + 1}`}
                onClick={() => container.scrollIntoView({behavior: 'smooth'})}>
              {i + 1}
            </NavLink>
          )
        })}
      </p>
      <Link className={`mm-button ${index + 1 === tidbits.length ? 'disabled' : ''}`}
          to={`/${index + 2}`}
          tabIndex={index + 1 === tidbits.length ? -1 : 0}
          onClick={() => container.scrollIntoView({behavior: 'smooth'})}>
        Next
      </Link>
    </div>
  )
}

/**
 * Renders all or filtered tidbits with pagination
 */
function Tidbits() {
  const {selectedTags, tidbits} = useOutletContext() as {
    selectedTags: Set<string>,
    tidbits: Tidbit[],
  };

  const [
    structuredTidbits,
    setStructuredTidbits,
  ] = useState<StructuredTidbits>([]);

  const [tidbitsCount, setTidbitsCount] = useState(tidbits.length);
  const {index} = useParams();
  const tidbitsIndex = parseInt(index || '1') - 1;
  const tidbitsContainerRef = useRef(null);
  const tidbitToRender: Tidbit[] = structuredTidbits[tidbitsIndex];

  useStructuredTidbits({
    tidbits,
    selectedTags,
    setStructuredTidbits,
    setTidbitsCount,
  });

  useCodeHighlighter(tidbitsContainerRef.current);

  return (
    <div className="mm-tidbits" ref={tidbitsContainerRef}>
      <section className="mm-section" style={{
        marginBottom: 'unset',
        marginTop: 'unset',
      }}>
        <p className="mm-tidbits__count">
          Viewing {tidbitsCount} / {tidbits.length}
        </p>
      </section>
      <section className="mm-section mm-section--full-bleed" style={{
        marginBottom: 'unset',
        marginTop: 'unset',
      }}>
        <div className="mm-section__inner">
          <div className="mm-tidbits__metadata">
            <TidbitPagination
                tidbits={structuredTidbits}
                index={tidbitsIndex}
                container={tidbitsContainerRef.current!} />
          </div>
          <div className="mm-tidbits__content">
            {tidbitToRender != null ? tidbitToRender.map((tidbit: Tidbit) => {
              // const setRefs = useInViewRef();
              const {data, content} = tidbit;
              const markedContent = marked(content);

              return (
                <React.Fragment key={data.title.toLowerCase()}>
                  {/* <div className={`mm-tidbits__tidbit mm-animate ${useSetAnimateClassName(setRefs.inView)}`}
                      data-tags={data.tags.join(',')}
                      ref={setRefs.ref}> */}
                  <div className={`mm-tidbits__tidbit`}
                      data-tags={data.tags.join(',')}>
                    <h2>
                      <ReactMarkdown>
                        {data.title}
                      </ReactMarkdown>
                    </h2>
                    <div dangerouslySetInnerHTML={{__html: markedContent}} />
                  </div>
                </React.Fragment>
              )
            }) :
            <Navigate to={`/${parseInt(index!) < 1 ? '1' : structuredTidbits.length.toString()}`}
                replace={true} />}
          </div>
          <div className="mm-tidbits__metadata">
            <TidbitPagination
                tidbits={structuredTidbits}
                index={tidbitsIndex}
                container={tidbitsContainerRef.current!} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tidbits;
