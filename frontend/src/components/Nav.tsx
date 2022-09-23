import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getStrapiMedia } from "../pages/api/media";

const Nav = ({ leftNavs, rightNavs, logo }: any) => {


  const [scrolled, setScrolled] = useState(false);


  const onScroll: EventListener = useCallback((event: Event) => {
    const win: Window = window;
    const { scrollY } = win;
    if (scrollY >= 10) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, []);

  useEffect(() => {
    const win: Window = window;
    //add eventlistener to window
    win.addEventListener("scroll", onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`w-full h-[80px] sticky top-0 ${scrolled ? 'bg-black' : ''}`}>
      <div className="flex items-center justify-around py-3 container mx-auto">
        <ul className="items-center justify-center md:flex md:space-x-8 md:space-y-0">
          {leftNavs.map((category: any) => {
            return (
              <li key={category.id}>
                <Link href={`/${category.attributes.slug}`}>
                  <a>{category.attributes.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="w-[200px] flex items-center justify-center">
          <div className={`relative transition-all ease ${scrolled ? 'w-[80px]' : 'w-[200px]'}`}>
            <Link href='/'>
              <a>
                <img className="absolute top-[-35px] left-0" src={getStrapiMedia(logo.attributes.favicon)} alt="logo" />
              </a>
            </Link>
          </div>
        </div>
        <ul className="items-center justify-center md:flex md:space-x-8 md:space-y-0">
          {rightNavs.map((category: any) => {
            return (
              <li key={category.id}>
                <Link href={`/${category.attributes.slug}`}>
                  <a>{category.attributes.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav >

  );
};

export default Nav;