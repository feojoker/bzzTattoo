import { createContext } from "react";
import { shareMedia } from "@projectTypes/components";

export const LogoContext = createContext<shareMedia>(undefined!);

type Props = {
  children: React.ReactNode,
  logo: shareMedia
};

export const LogoProvider = ({ children, logo }: Props) => {

  return (
    <LogoContext.Provider value={logo}>
      {children}
    </LogoContext.Provider>
  )
}