import type { RefObject } from 'react';

import { useEffect } from 'react';

export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null> | undefined,
  handler: (event: MouseEvent | TouchEvent) => void,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      if (
        ref === undefined ||
        ref.current === null ||
        (event.target instanceof HTMLElement && ref.current.contains(event.target))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
