import React, { useContext } from 'react';
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";
import { GlobalData, Navs, Lang } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";


// type Props = {
//   globalLogo: GlobalData,
//   rightNavs: Navs[],
//   leftNavs: Navs[],
//   langs: Lang[],
//   children: React.ReactNode
// }

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <>
      {isDesktopMedia ? (
        <Nav />
      ) : (
        <MobileNav />
      )
      }
      <div className='relative'>
        {children}
      </div>
    </>
  );
}


export default Layout;