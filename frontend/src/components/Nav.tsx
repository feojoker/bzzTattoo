import React, { useCallback, useEffect, useState, useContext } from "react";
import Link from "next/link";
import { getStrapiMedia } from "../pages/api/media";
import { Navs, Global, Lang } from "../types";
import LanguageSwitcher from './LanguageSwitcher';
import { useOnScroll } from '../hooks/useOnScroll'


type Props = {
  leftNavs: Navs[],
  rightNavs: Navs[],
  langs: Lang[],
  logo: Global
}

const Nav = ({ leftNavs, rightNavs, logo, langs }: Props) => {
  const logoLink = getStrapiMedia(logo.attributes.logo)

  const scrolled = useOnScroll()

  return (
    <nav className={`flex justify-between items-center w-full h-[80px] sticky top-0 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="flex flex-row justify-center py-3 container mx-auto">
        <ul className="basis-2/4 flex items-center justify-end space-x-8 space-y-0">
          {leftNavs.map((category: Navs) => {
            return (
              <li key={category.id}>
                <Link href={`/${category.attributes.slug}`}>
                  <a className="whitespace-nowrap">{category.attributes.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-center basis-[250px]">
          <div className={`relative transition-all ease ${scrolled ? 'w-[70px]' : 'w-[150px] mx-[50px]'}`}>
            <Link href='/'>
              <a>
                <img className="absolute top-[-35px] left-0" src={logoLink} alt="logo" />
              </a>
            </Link>
          </div>
        </div>
        <div className="basis-2/4 flex items-center  justify-between">
          <ul className="flex items-center justify-start space-x-8 space-y-0">
            {rightNavs.map((category: Navs) => {
              return (
                <li key={category.id}>
                  <Link href={`/${category.attributes.slug}`}>
                    <a className="whitespace-nowrap">{category.attributes.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher langs={langs} />
        </div>
      </div >
    </nav >

  )
};

export default Nav;