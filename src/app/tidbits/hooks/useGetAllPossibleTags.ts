import { useEffect } from 'react';
import { Tidbits } from '@/content/tidbits';

/**
 * Loops through all tidbits and their tags to set all possible filters and
 * tag labels.
 */
export function useGetAllPossibleTags(
  setState: React.Dispatch<React.SetStateAction<Record<string, number>>>
) {
  useEffect(() => {
    const tagsMap: Record<string, number> = {};

    for (const tidbit of Tidbits) {
      for (const tag of (tidbit as Tidbit).data.tags) {
        if (tagsMap[tag]) {
          tagsMap[tag] = tagsMap[tag] + 1;
        } else {
          tagsMap[tag] = 1;
        }
      }
    }

    setState(tagsMap);
  }, [setState]);
}
