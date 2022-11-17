import React, { createContext } from "react";
import { GlobalData, GlobalDataAttr } from "../types";

// Store Strapi Global object in context
export const GlobalDataContext = createContext<GlobalDataAttr>(undefined!);

type Props = {
  children: React.ReactNode,
  globalData: GlobalData
};

export const GlobalDataProvider = ({ children, globalData }: Props) => {
  const attributes: GlobalDataAttr = globalData.attributes;

  return (
    <GlobalDataContext.Provider value={attributes}>
      {children}
    </GlobalDataContext.Provider>
  )
}