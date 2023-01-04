import { useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export const useOnScroll = () => {
  const [scrollPosition, setScrollPosition] = useLocalStorage('SCROLL_POSITION', 0)

  const onScroll: EventListener = useCallback((event: Event) => {
    const win: Window = window;
    const { scrollY } = win;
    setScrollPosition(scrollY)
  }, []);

  useEffect(() => {
    const win: Window = window;

    win.addEventListener("scroll", onScroll);
    win.addEventListener("resize", onScroll);

    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
    }
  }, [onScroll]);

  return scrollPosition >= 10
}