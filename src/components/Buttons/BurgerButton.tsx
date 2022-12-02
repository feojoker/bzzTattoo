import { Dispatch, SetStateAction } from "react";

type Props = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
}

function BurgerButton({ isOpen, setIsOpen }: Props) {
  const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-white transition ease transform duration-500`;
  return (
    <button
      className="flex flex-col h-14 w-14 rounded justify-center items-center group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${isOpen
          ? "rotate-45 translate-y-3 opacity-80 group-hover:opacity-100"
          : "opacity-80 group-hover:opacity-100"
          }`}
      />
      <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-80 group-hover:opacity-100"}`} />
      <div
        className={`${genericHamburgerLine} ${isOpen
          ? "-rotate-45 -translate-y-3 opacity-80 group-hover:opacity-100"
          : "opacity-80 group-hover:opacity-100"
          }`}
      />
    </button>
  )
}

export default BurgerButton



