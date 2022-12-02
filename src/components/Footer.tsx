import React, { useContext } from 'react';
import { Navs } from '../types';
import { GlobalDataContext } from '../context/GlobalDataContext';
import Link from 'next/link';

function Footer() {
  const { leftNavs, rightNavs } = useContext(GlobalDataContext);

  return (
    <div className='grid grid-cols-3 items-center justify-center container mx-auto mt-8 py-8  border-t border-t-primary font-playfair'>
      <div className='text-center'>
        <div className='mb-8'>
          <p className='tracking-wider font-garamond text-sm'>ADDRESS</p>
          <p>53 Dimitri Uznadze St</p>
          <p>Tbilisi, Georgia</p>
        </div>
        <div>
          <p className='tracking-wider font-garamond text-sm'>+393299136186</p>
          <p>info@bzztattoo.com</p>
        </div>
      </div>
      <div className='text-center'>
        <div className='mb-6'>
          <Link href="/contact" prefetch={false}>
            <a className="whitespace-nowrap uppercase px-6 py-3 bg-primary text-black transition duration-500 hover:bg-black hover:text-primary ">Contact Me</a>
          </Link>
        </div>
        <div>
          <p>all pictures are copyright of</p>
          <p className='mb-2'>Anastasia Murashko</p>
          <p>Engraving & Ornamental tattoo artist</p>
        </div>
      </div>
      <div className='text-center uppercase font-modernist'>
        <ul className="">
          {leftNavs.map((category: Navs) => {
            return (
              <li key={category.id}>
                <Link href={`${category.attributes.link}`} prefetch={false}>
                  <a className="whitespace-nowrap opacity-100 hover:opacity-60">{category.attributes.name}</a>
                </Link>
              </li>
            );
          })}
          {rightNavs.map((category: Navs) => {
            return (
              <li key={category.id}>
                <Link href={`${category.attributes.link}`} prefetch={false}>
                  <a className="whitespace-nowrap opacity-100 hover:opacity-60">{category.attributes.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  )
}

export default Footer



