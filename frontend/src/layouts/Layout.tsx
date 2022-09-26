import React from 'react';
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Global, Navs } from "../types";


type Props = {
  logo: Global,
  rightNavs: Navs[],
  leftNavs: Navs[],
  children: React.ReactNode
}

const Layout = ({ rightNavs, leftNavs, logo, children }: Props) => {
  const tailwindMd = useMediaQuery(768)

  return (
    <>
      {tailwindMd ? (
        <Nav rightNavs={rightNavs} leftNavs={leftNavs} logo={logo} />
      ) : (
        <MobileNav rightNavs={rightNavs} leftNavs={leftNavs} logo={logo} />
      )
      }
      {children}
    </>
  );
}


export default Layout;