import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";
import { signIn } from 'next-auth/react'


interface ButtonsProps {
    className: string;
    icon: ReactNode;
    icons: ReactNode;
    href: string;
    title: string;
    onClick: any
}

const Buttons = ({className= '', icons,icon, onClick, title}: ButtonsProps) => {
  return (
    <div  className="flex justify-center items-center rounded-xl overflow-hidden">
    <button
    onClick={onClick}
      className={clsx("lg:hover:bg-neutral-600 bg-neutral-300 rounded-xl px-10 py-3 relative group lg:transition-all lg:duration-300", className)}
      >
      <h1 className=" z-[9] flex items-center justify-center gap-2  lg:group-hover:text-white lg:transition-all lg:duration-300 relative">
        <span>
        {icon && <>{icon}</>}
        </span>
        {title}
      </h1>
      <div className="absolute top-0 right-[-12px] group-hover:z-[5] group-hover:rotate-12">
      {icons && <>{icons}</>}
      </div>
      <div className="absolute inset-0 lg:translate-y-[100%] rounded-xl lg:bg-neutral-800 lg:transition-transform lg:duration-300 lg:group-hover:translate-y-[0%]"></div>
    </button>
      </div>
  );
};

export default Buttons;
