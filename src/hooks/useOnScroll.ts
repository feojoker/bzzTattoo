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

    //add eventlisteners to window
    win.addEventListener("scroll", onScroll);
    win.addEventListener("resize", onScroll);
    // remove events on unmount to prevent a memory leak with the cleanup
    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
    }
  }, [onScroll]);

  return scrolled
}