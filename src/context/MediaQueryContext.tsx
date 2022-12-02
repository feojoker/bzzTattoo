import { createContext } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

// Store boolean `isDesktopMedia` from useMediaQuery in context
export const MediaQueryContext = createContext<boolean>(undefined!);

type Props = {
  children: React.ReactNode,
};

export const MediaQueryProvider = ({ children }: Props) => {
  const isDesktopMedia = useMediaQuery(768);

  return (
    <MediaQueryContext.Provider value={isDesktopMedia}>
      {children}
    </MediaQueryContext.Provider>
  )
}