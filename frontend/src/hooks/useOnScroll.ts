import { useCallback, useEffect, useState } from "react";

export const useOnScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  const onScroll: EventListener = useCallback((event: Event) => {
    const win: Window = window;
    const { scrollY } = win;
    if (scrollY >= 10) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, []);

  useEffect(() => {
    const win: Window = window;
    //add eventlistener to window
    win.addEventListener("scroll", onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled
}