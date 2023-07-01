import { useEffect } from 'react';
import { CustomEvents } from '@/globals/constants';

export function useCustomFilterEvent(
  setSelectedTags: React.Dispatch<React.SetStateAction<Set<string>>>
) {
  useEffect(() => {
    // TODO: Figure out how to get this to work with `any`.
    const handleFiltering = (e: any) => {
      setSelectedTags(e.detail.selectedTags);
    };

    window.addEventListener(CustomEvents.TIDBIT_FILTERING, handleFiltering);

    return () => {
      window.removeEventListener(
        CustomEvents.TIDBIT_FILTERING,
        handleFiltering
      );
    };
  }, []);
}
