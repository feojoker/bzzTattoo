import { createContext } from "react";
import { CombinedGlobalData } from "@projectTypes/components";

// Store Strapi Global object in context
export const GlobalDataContext = createContext<CombinedGlobalData>(undefined!);

type Props = {
  children: React.ReactNode,
  globalData: CombinedGlobalData
};

export const GlobalDataProvider = ({ children, globalData }: Props) => {

  return (
    <GlobalDataContext.Provider value={globalData}>
      {children}
    </GlobalDataContext.Provider>
  )
}