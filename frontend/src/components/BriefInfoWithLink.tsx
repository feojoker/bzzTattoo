import React, { useContext } from 'react';
import { MediaQueryContext } from '../context/MediaQueryContext';
import { BriefInfo } from '../types';
import ReactMarkdown from "react-markdown";

type Props = {
  data: BriefInfo,
};

function BriefInfoWithLink({ data }: Props) {
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <div className={`bg-black
    ${isDesktopMedia
        ? 'pb-[80px]'
        : 'pb-[50px]'
      }`}>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex flex-col items-center text-center max-w-[500px]' >
          <h1 className='mb-4'>{data.attributes.title}</h1>
          <p className='mb-4 uppercase text-3xl font-modernist'>|</p>
          <p className='mb-4 text-sm font-modernist uppercase tracking-wide'>{data.attributes.subTitle}</p>
          <a href={data.attributes.link} className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center font-regular">{data.attributes.linkTitle}</a>
        </div>
        <div className='max-w-[500px] ml-24 text-xl font-regular whitespace-pre-line'>
          <ReactMarkdown>
            {data.attributes.longText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default BriefInfoWithLink



