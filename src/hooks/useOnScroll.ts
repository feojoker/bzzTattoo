import { useCallback, useEffect } from "react";
import useSessionStorage from "./useSessionStorage";

export const useOnScroll = () => {
  const [scrollPosition, setScrollPosition] = useSessionStorage('SCROLL_POSITION', 0)

  const onScroll: EventListener = useCallback((event: Event) => {
    const win: Window = window;
    const { scrollY } = win;
    setScrollPosition(scrollY)
  }, []);

  const resetPosition: EventListener = useCallback((event: Event) => sessionStorage.removeItem('SCROLL_POSITION'), [])

  useEffect(() => {
    const win: Window = window;

    win.addEventListener("scroll", onScroll);
    win.addEventListener("resize", onScroll);
    win.addEventListener('beforeunload', resetPosition);

    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
      win.removeEventListener('beforeunload', resetPosition);
    }
  }, [onScroll]);

  return scrollPosition >= 10
}