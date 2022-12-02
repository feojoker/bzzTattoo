import { useContext } from 'react';
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";
import { MediaQueryContext } from "../context/MediaQueryContext";
import Footer from '../components/Footer';

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
      <Footer />
    </>
  );
}


export default Layout;