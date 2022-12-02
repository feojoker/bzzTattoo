type Props = {
  tag: string,
  linkTitle: string,
  link?: string,
  type?: string,
}

function DefaultButton({ tag, link, linkTitle, type }: Props) {
  const CustomTag = `${tag}` as keyof JSX.IntrinsicElements;
  const dynamicTypeAttr = type ? { [type]: type } : null
  return (
    <CustomTag
      href={link && link}
      {...dynamicTypeAttr}
      className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-1 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center font-garamond transition duration-500 cursor-pointer uppercase"
    >
      {linkTitle}
    </CustomTag>
  )
}

export default DefaultButton



