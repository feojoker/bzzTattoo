import { createContext } from "react";
import { DefaultSeo } from "@projectTypes/components";

export const DefaultSeoContext = createContext<DefaultSeo>(undefined!);

type Props = {
  children: React.ReactNode,
  defaultSeo: DefaultSeo
};

export const DefaultSeoProvider = ({ children, defaultSeo }: Props) => {

  return (
    <DefaultSeoContext.Provider value={defaultSeo}>
      {children}
    </DefaultSeoContext.Provider>
  )
}