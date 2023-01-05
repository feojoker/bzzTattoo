import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Navs } from "../types";
import { useOnScroll } from "../hooks/useOnScroll";
import { GlobalDataContext } from "../context/GlobalDataContext";
import BurgerButton from "./Buttons/BurgerButton";
import MobileLanguageSwitcher from "./MobileLanguageSwitcher";
import Image from 'next/future/image';
import { getLocalLoader } from "../helpers/imageLoaders";

const initialStyle = {
  container: "",
  logo: "w-[90px] h-[90px] mt-[40px] ml-[10px]"
}

const MobileNav = () => {
  const { leftNavs, rightNavs, langs } = useContext(GlobalDataContext);

  const [scrolledStyle, setScrolledStyle] = useState(initialStyle);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = useOnScroll();

  useEffect(() => {
    if (scrolled) {
      setScrolledStyle({
        container: "bg-black shadow",
        logo: "w-[70px] h-[70px]"
      })
    } else {
      setScrolledStyle(initialStyle)
    }
  }, [scrolled])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <>
      <div className={`fixed flex justify-between items-center w-full h-[80px] top-0 shadow-secondary z-50 
      ${scrolledStyle.container}`}>
        <div className={`relative transition-all ease 
          ${scrolledStyle.logo}`}>
          <Link href='/'>
            <a className="absolute inset-0 opacity-70 hover:opacity-100">
              <span className="hidden">Link to homepage</span>
              <Image
                loader={getLocalLoader}
                alt="Logo showing on mobile nav"
                src="/logo.png"
                fill
                sizes="30vw"
                quality={100}
                priority
              />
            </a>
          </Link>
        </div>
        <div onClick={() => setMenuOpen(!menuOpen)}
          className={`fixed inset-0 z-20 bg-[rgba(255,255,255,.8)] transition-opacity ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}></div>
      </div>
      <div className={`nav-container fixed z-50 bg-black top-0 right-0 transition-all w-[calc(100%-80px)] max-w-[310px]  h-full ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`absolute right-full p-[12px] ${menuOpen && 'bg-primary'}`}>
          <BurgerButton isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </div>
        <nav className="font-modernist uppercase text-4xl px-4">
          <MobileLanguageSwitcher langs={langs} />
          <ul>
            {leftNavs.map((category: Navs) => {
              return (
                <li key={category.id} className="mb-2">
                  <Link href={`${category.attributes.link}`}>
                    <a className="whitespace-nowrap">{category.attributes.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul>
            {rightNavs.map((category: Navs) => {
              return (
                <li key={category.id} className="mb-2">
                  <Link href={`${category.attributes.link}`}>
                    <a className="whitespace-nowrap">{category.attributes.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;