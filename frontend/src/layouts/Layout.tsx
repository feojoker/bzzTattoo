import React, { useContext } from 'react';
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";
import { Global, Navs, Lang } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";


type Props = {
  logo: Global,
  rightNavs: Navs[],
  leftNavs: Navs[],
  langs: Lang[],
  children: React.ReactNode
}

const Layout = ({ rightNavs, leftNavs, logo, langs, children }: Props) => {
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <>
      {isDesktopMedia ? (
        <Nav rightNavs={rightNavs} leftNavs={leftNavs} logo={logo} langs={langs} />
      ) : (
        <MobileNav rightNavs={rightNavs} leftNavs={leftNavs} logo={logo} />
      )
      }
      {children}
    </>
  );
}


export default Layout;