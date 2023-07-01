import { useEffect } from 'react';
import hljs from 'highlight.js';

/**
 * Colors <code> blocks within the given element using Highlight.js.
 */
export function useCodeHighlighter(root: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (root.current == null) return;

    const codeBlocks = [
      ...root.current.querySelectorAll('pre code'),
    ] as HTMLElement[];

    for (const block of codeBlocks) {
      if (!block.classList.contains('hljs')) {
        hljs.highlightElement(block);
      }
    }
  });
}
