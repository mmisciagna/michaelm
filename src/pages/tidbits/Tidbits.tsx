import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate, NavLink, Link }  from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import { Link as AutoScroll } from 'react-scroll';
import { useInViewRef, useSetAnimateClassName } from '../../global/hooks';


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
      return true
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
  setSortedTidbits,
  setTidbitsCount
}: {
  tidbits: Tidbit[],
  selectedTags: Set<string>,
  setSortedTidbits: React.Dispatch<React.SetStateAction<Tidbit[][]>>,
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
          selectedTags.size === 0 ||
          shouldRenderTidbit(tags, selectedTags);

      if (doRenderTidbit) {
        PARED_TIDBITS.push(tidbit);
        count++;
      }
    }

    // Structures tidbits into an array of arrays. The number of tidbits in the
    // nested arrays depends on how many tidbits per page we want.
    // Ex. for 2 tidbits per page:
    //     [ [0, 1], [2, 3], ... ]
    const STRUCTURED_TIDBITS: Tidbit[][] = [];

    while (PARED_TIDBITS.length > 0) {
      STRUCTURED_TIDBITS.push(PARED_TIDBITS.splice(0, TIDBITS_PER_PAGE));
    }

    // Set sorted tidbits and counts
    setSortedTidbits(STRUCTURED_TIDBITS);
    setTidbitsCount(count);
  }, [selectedTags]);
}

/**
 * Creates the pagination with the given tidbits.
 */
function TidbitPagination({tidbits, index}: {
  tidbits: Tidbit[][],
  index: number,
}) {

  return (
    <div className="mm-tidbits__pagination">
      <Link className={`mm-button ${index === 0 ? 'disabled' : ''}`}
          to={`/tidbits/${index}`}>
        Previous
      </Link>
      <p className="mm-tidbits__pagination-pages">
        {tidbits.map((tidbitGroup: Tidbit[], i: number) => {
          return (
            <AutoScroll to="tidbits"
                smooth={true}
                offset={-96}
                duration={750}>
              <NavLink key={tidbitGroup[0].data.title}
                  to={`/tidbits/${i + 1}`}>
                {i + 1}
              </NavLink>
            </AutoScroll>
          )
        })}
      </p>
      <Link className={`mm-button ${index + 1 === tidbits.length ? 'disabled' : ''}`}
          to={`/tidbits/${index + 2}`}>
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

  const [sortedTidbits, setSortedTidbits] = useState<Tidbit[][]>([]);
  const [tidbitsCount, setTidbitsCount] = useState(() => tidbits.length);
  const {index} = useParams();
  const tidbitsIndex = parseInt(index || '1') - 1;

  useStructuredTidbits({
    tidbits,
    selectedTags,
    setSortedTidbits,
    setTidbitsCount,
  });

  return (
    <div className="mm-tidbits" id="tidbits">
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
            <TidbitPagination tidbits={sortedTidbits} index={tidbitsIndex} />
          </div>
          <div className="mm-tidbits__content">
            {sortedTidbits.length && sortedTidbits[tidbitsIndex].map((tidbit: Tidbit) => {
              const {data, content} = tidbit;
              const markedConent = marked(content);
              // const setRefs = useInViewRef();

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
                      <p style={{margin: 'unset'}}>{data.date}</p>
                    </div>
                    <h2>
                      <ReactMarkdown>{data.title}</ReactMarkdown>
                    </h2>
                    <div dangerouslySetInnerHTML={{__html: markedConent}} />
                  </div>
                </React.Fragment>
              )
            })}
          </div>
          <div className="mm-tidbits__metadata">
            <TidbitPagination tidbits={sortedTidbits} index={tidbitsIndex} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tidbits;
