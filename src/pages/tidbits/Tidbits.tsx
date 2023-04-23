import React, { useEffect, useState, useRef } from 'react';
import {
  useOutletContext,
  useParams,
  useNavigate,
  NavLink,
  Link,
  Navigate,
}  from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import { useInViewRef, useSetAnimateClassName } from '../../global/hooks';


type StructuredTidbits = Tidbit[][];

const TIDBITS_PER_PAGE = 3;

/**
 * Loops through given tags and checks if any are included in the selected
 * tags set.
 */
function shouldRenderTidbit(
  tags: string[],
  selectedTags: Set<string>,
): boolean {
  for (const tag of tags) {
    if (selectedTags.has(tag.toLowerCase())) {
      return true;
    };
  }
  return false;
}


/**
 * Structures the tidbits into a shape that can be used with pagination and
 * the current page index.
 */
function useStructuredTidbits({
  tidbits,
  selectedTags,
  setStructuredTidbits,
  setTidbitsCount
}: {
  tidbits: Tidbit[],
  selectedTags: Set<string>,
  setStructuredTidbits: React.Dispatch<React.SetStateAction<StructuredTidbits>>,
  setTidbitsCount: React.Dispatch<React.SetStateAction<number>>,
}) {
  const navigate = useNavigate();

  // Redirects to first tidbits page.
  const redirectToFirstTidbitsPage = () => {
    navigate(`/tidbits/1`, {replace: true});
  }

  useEffect(() => {
    // TODO: Make it so you can deeplink to a specific pageindex on load.
    redirectToFirstTidbitsPage();

    let count = 0;

    // Adds tidbits matching any selected tags to a new array.
    const PARED_TIDBITS: Tidbit[] = [];

    for (const tidbit of tidbits) {
      const tags = tidbit.data.tags;

      const doRenderTidbit =
          selectedTags.size === 0 || shouldRenderTidbit(tags, selectedTags);

      if (doRenderTidbit) {
        PARED_TIDBITS.push(tidbit);
        count++;
      }
    }

    // Structures tidbits into an array of arrays. The number of tidbits in the
    // nested arrays depends on how many tidbits per page we want.
    // Ex. for 2 tidbits per page:
    //     [ [0, 1], [2, 3], ... ]
    const STRUCTURED_TIDBITS: StructuredTidbits = [];

    while (PARED_TIDBITS.length > 0) {
      STRUCTURED_TIDBITS.push(PARED_TIDBITS.splice(0, TIDBITS_PER_PAGE));
    }

    // Set structured tidbits and counts
    setStructuredTidbits(STRUCTURED_TIDBITS);
    setTidbitsCount(count);
  }, [selectedTags]);
}

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
          to={`/tidbits/${index}`}
          tabIndex={index === 0 ? -1 : 0}>
        Previous
      </Link>
      <p className="mm-tidbits__pagination-pages">
        {tidbits.map((tidbitGroup: Tidbit[], i: number) => {
          return (
            <NavLink key={tidbitGroup[0].data.title}
                to={`/tidbits/${i + 1}`}
                onClick={() => container.scrollIntoView({behavior: 'smooth'})}>
              {i + 1}
            </NavLink>
          )
        })}
      </p>
      <Link className={`mm-button ${index + 1 === tidbits.length ? 'disabled' : ''}`}
          to={`/tidbits/${index + 2}`}
          tabIndex={index + 1 === tidbits.length ? -1 : 0}>
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
              const markedConent = marked(content);

              return (
                <React.Fragment key={data.title.toLowerCase()}>
                  {/* <div className={`mm-tidbits__tidbit mm-animate ${useSetAnimateClassName(setRefs.inView)}`}
                      data-tags={data.tags.join(',')}
                      ref={setRefs.ref}> */}
                  <div className={`mm-tidbits__tidbit`}
                      data-tags={data.tags.join(',')}>
                    <ul className="mm-tidbits__tags">
                      {data.tags.map((tag: string) => {
                        return <li key={tag.toLowerCase()}>{tag}</li>
                      })}
                    </ul>
                    <div className="mm-tidbits__metadata">
                      <p style={{margin: 'unset'}}>
                        {data.date}
                      </p>
                    </div>
                    <h2>
                      <ReactMarkdown>
                        {data.title}
                      </ReactMarkdown>
                    </h2>
                    <div dangerouslySetInnerHTML={{__html: markedConent}} />
                  </div>
                </React.Fragment>
              )
            }) :
            <Navigate to={`/tidbits/${parseInt(index!) < 1 ? '1' : structuredTidbits.length.toString()}`}
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
