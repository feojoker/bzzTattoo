import React, { useContext } from 'react';
import { Navs } from '../types';
import { GlobalDataContext } from '../context/GlobalDataContext';
import Link from 'next/link';

function Footer() {
  const { leftNavs, rightNavs, footer } = useContext(GlobalDataContext);
  console.log(footer.attributes);
  const { addressTitle, addressStreet, addressCity, phoneNumber, email, buttonText, copyright, name, aboutArtist } = footer.attributes;

  return (
    <div className="container mx-auto grid md:grid-cols-3 items-center justify-center mt-8 py-8 border-t border-t-primary font-playfair">
      <div className="text-center order-3 md:order-1">
        <div className="mb-2 md:mb-4">
          <p className="tracking-wider font-garamond text-sm uppercase">{addressTitle}</p>
          <p>{addressStreet}</p>
          <p>{addressCity}</p>
        </div>
        <div>
          {phoneNumber ? (<p className="tracking-wider font-garamond text-sm">{phoneNumber}</p>) : null}
          {email ? (<p>{email}</p>) : null}
        </div>
      </div>
      <div className="text-center flex flex-col mb-10 md:order-2 md:mb-0">
        <div className="order-last md:order-first md:mb-6">
          <Link href="/contact" prefetch={false}>
            <a className="whitespace-nowrap uppercase px-8 py-4 text-xl md:px-6 md:py-3 md:text-base bg-primary text-black transition duration-500 hover:bg-black hover:text-primary">{buttonText}</a>
          </Link>
        </div>
        <div className='order-first mb-10 md:order-last md:mb-0'>
          <p>{copyright}</p>
          <p className='mb-2'>{name}</p>
          <p>{aboutArtist}</p>
        </div>
      </div>
      <div className='text-center text-2xl leading-10 uppercase font-modernist mb-8 md:order-3 md:mb-0 md:text-base md:leading-6'>
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



