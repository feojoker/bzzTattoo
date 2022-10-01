import React, { createContext } from "react";
import { Global } from "../types";

// Store Strapi Global object in context
export const GlobalDataContext = createContext({});

type Props = {
  children: React.ReactNode,
  globalData: Global
};

export const GlobalDataProvider = ({ children, globalData }: Props) => {
  const { attributes } = globalData;
  return (
    <GlobalDataContext.Provider value={attributes}>
      {children}
    </GlobalDataContext.Provider>
  )
}