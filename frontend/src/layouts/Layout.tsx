import React, { useContext } from 'react';
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";
import { GlobalData, Navs, Lang } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";


type Props = {
  globalLogo: GlobalData,
  rightNavs: Navs[],
  leftNavs: Navs[],
  langs: Lang[],
  children: React.ReactNode
}

const Layout = ({ rightNavs, leftNavs, globalLogo, langs, children }: Props) => {
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <>
      {isDesktopMedia ? (
        <Nav rightNavs={rightNavs} leftNavs={leftNavs} globalLogo={globalLogo} langs={langs} />
      ) : (
        <MobileNav rightNavs={rightNavs} leftNavs={leftNavs} globalLogo={globalLogo} />
      )
      }
      <div className='relative'>
        {children}
      </div>
    </>
  );
}


export default Layout;