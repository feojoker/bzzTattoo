import React, { useContext } from 'react';
import { MediaQueryContext } from '../context/MediaQueryContext';
import { BriefInfo } from '../types';
import ReactMarkdown from "react-markdown";
import DefaultButton from './Buttons';

type Props = {
  data: BriefInfo,
  scrollAnchor?: string,
}

function BriefInfoWithLink({ data, scrollAnchor }: Props) {
  const isDesktopMedia = useContext(MediaQueryContext);
  const { title, subTitle, link, linkTitle, longText } = data.attributes;

  return (
    <div className={`bg-black
    ${isDesktopMedia
        ? 'pb-[80px]'
        : 'pb-[50px]'
      }`}>
      <div id={scrollAnchor && scrollAnchor} className='container mx-auto flex items-center justify-between'>
        <div className='flex flex-col items-center text-center max-w-[500px]' >
          <h1 className='mb-4'>{title}</h1>
          <p className='mb-4 uppercase text-3xl font-modernist'>|</p>
          <p className='mb-4 text-sm font-modernist uppercase tracking-wide'>{subTitle}</p>
          <DefaultButton tag="a" link={link} linkTitle={linkTitle} />
        </div>
        <div className='max-w-[500px] ml-24 text-xl font-garamond whitespace-pre-line'>
          <ReactMarkdown>
            {longText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default BriefInfoWithLink



