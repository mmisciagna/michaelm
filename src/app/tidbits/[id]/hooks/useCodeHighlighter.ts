import { useEffect } from 'react';
import hljs from 'highlight.js';

/**
 * Colors <code> blocks within the given element using Highlight.js.
 */
export function useCodeHighlighter(container: HTMLElement | null) {
  useEffect(() => {
    if (container == null) return;

    const codeBlocks = [
      ...container.querySelectorAll('pre code'),
    ] as HTMLElement[];

    for (const block of codeBlocks) {
      if (!block.classList.contains('hljs')) {
        hljs.highlightElement(block);
      }
    }
  });
}
