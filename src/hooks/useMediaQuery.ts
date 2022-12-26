import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) setTargetReached(true)
    else setTargetReached(false)
  }, [])

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(`(min-width: ${width}px)`)
    media.addEventListener('change', updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true)

    return () => media.removeEventListener('change', updateTarget)
  }, [updateTarget, width])

  return targetReached
}