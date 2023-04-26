import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hljs from 'highlight.js';


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
export function useStructuredTidbits({
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
 * Colors <code> blocks within the given element using Highlight.js.
 */
export function useCodeHighlighter(container: HTMLElement|null) {
  useEffect(() => {
    if (container == null) return;

    const codeBlocks =
        [... container.querySelectorAll('pre code')] as HTMLElement[];

    for (const block of codeBlocks) {
      if (!block.classList.contains('hljs')) {
        hljs.highlightElement(block);
      }
    };
  });
};
