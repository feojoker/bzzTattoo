import { useEffect } from 'react';

// Take hook here: https://stackoverflow.com/questions/63723421/mouseevent-target-type

const hasIgnoredClass = (element: SVGAElement, ignoredClass: string) =>
  // @ts-ignore
  (element.correspondingElement ? element.correspondingElement : element).classList.contains(ignoredClass)

const isInIgnoredElement = (element: Node, ignoredClass: string) => {
  if (element === null) return;
  do {
    if (hasIgnoredClass(element as SVGAElement, ignoredClass)) {
      return true
    }
  } while ((element = element.parentElement as Element))

  return false
}

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = (
  refs: Array<React.RefObject<HTMLElement>>,
  handler: (event: Event) => void,
  ignoredClass = 'ignore-onClickOutside'
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const elem = event.target as Element;
      const isValidElement = refs.some(ref => {
        if (!ref.current || ref.current.contains(elem) || isInIgnoredElement(elem, ignoredClass)) {
          return true;
        }
      });
      !isValidElement && handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};


export default useOnClickOutside;