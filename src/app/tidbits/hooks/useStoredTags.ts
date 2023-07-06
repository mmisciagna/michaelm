import { StorageKey } from '@/globals/constants';
import { useEffect } from 'react';

export function useStoredTags(
  setSelectedTags: React.Dispatch<React.SetStateAction<Set<string>>>
) {
  useEffect(() => {
    const storedTags = window.sessionStorage.getItem(StorageKey.TIDBIT_TAGS);

    if (storedTags == null) {
      window.sessionStorage.removeItem(StorageKey.TIDBIT_TAGS);
    } else {
      setSelectedTags(new Set(storedTags.split(',')));
    }
  }, [setSelectedTags]);
}
