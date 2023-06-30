import { useEffect } from 'react';

const TIDBITS_PER_PAGE = 3;

/**
 * Loops through given tags and checks if any are included in the selected
 * tags set.
 */
function shouldRenderTidbit(
  tags: string[],
  selectedTags: Set<string>
): boolean {
  for (const tag of tags) {
    if (selectedTags.has(tag.toLowerCase())) {
      return true;
    }
  }
  return false;
}

export function useTidbitGroups({
  tidbits,
  selectedTags,
  setTidbitGroups,
  setTidbitsCount,
}: {
  tidbits: Tidbit[];
  selectedTags: Set<string>;
  setTidbitGroups: React.Dispatch<React.SetStateAction<TidbitGroup>>;
  setTidbitsCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  useEffect(() => {
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
    const STRUCTURED_TIDBITS: TidbitGroup = [];

    while (PARED_TIDBITS.length > 0) {
      STRUCTURED_TIDBITS.push(PARED_TIDBITS.splice(0, TIDBITS_PER_PAGE));
    }

    // Set structured tidbits and counts
    setTidbitGroups(STRUCTURED_TIDBITS);
    setTidbitsCount(count);
  }, [selectedTags]);
}
