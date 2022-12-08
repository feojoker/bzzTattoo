import { BriefInfo } from '../types';
import ReactMarkdown from "react-markdown";
import DefaultButton from './Buttons';

type Props = {
  data: BriefInfo,
  scrollAnchor?: string,
}

function BriefInfoWithLink({ data, scrollAnchor }: Props) {
  const { title, subTitle, link, linkTitle, longText } = data.attributes;

  return (
    <div className="mb-12">
      <div id={scrollAnchor && scrollAnchor} className='container mx-auto px-12 flex flex-col md:flex-row items-center justify-between'>
        <div className='flex flex-col items-center text-center max-w-[500px] mb-10 md:mb-0' >
          <h1 className='mb-4'>{title}</h1>
          <p className='mb-4 uppercase text-3xl font-modernist'>|</p>
          <p className='mb-4 text-sm font-modernist uppercase tracking-wide'>{subTitle}</p>
          <DefaultButton tag="a" link={link} linkTitle={linkTitle} />
        </div>
        <div className='max-w-[500px] md:ml-24 text-xl text-center md:text-left font-garamond whitespace-pre-line'>
          <ReactMarkdown>
            {longText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default BriefInfoWithLink



