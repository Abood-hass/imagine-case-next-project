import { cn } from "@/lib/utils";
import NextImage from "next/image";
import React, { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}


const index = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}>
      <NextImage
        width="0"
        height="0"
        sizes="100vw"
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        className='w-full h-auto pointer-events-none z-50 select-none'
        alt='phone image'
      />

      <div className='absolute -z-10 inset-0'>
        <NextImage
          width="0"
          height="0"
          sizes="100vw"
          className='object-cover min-w-full min-h-full'
          src={imgSrc}
          alt='w-full h-auto overlaying phone image'
        />
      </div>
    </div>
  )
}


export default index;
