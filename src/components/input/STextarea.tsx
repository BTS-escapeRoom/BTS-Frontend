'use client'

import { TextareaHTMLAttributes } from 'react'

type STextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  maxLength?: number
}

export default function STextarea({ className = '', maxLength, ...props }: STextareaProps) {
  const baseStyle =
    'w-full resize-none rounded-[2px] bg-[#fafafa] p-[10px] text-[14px] text-gray06 placeholder:text-[#bdbdbd] focus:border-none focus:outline-none'

  return <textarea {...props} maxLength={maxLength} className={`${baseStyle} ${className}`} />
}
