'use client'

import { IconPlus } from '@/components/icons'
import HButton from './HButton'

type FloatingActionButtonProps = {
  text: string
  onClick?: () => void
  className?: string
}

export default function FloatingActionButton({
  text,
  onClick,
  className = '',
}: FloatingActionButtonProps) {
  return (
    <HButton
      onClick={onClick}
      className={`inline-flex items-center rounded-[40px] border border-[#424242] bg-[rgba(46,46,46,0.8)] px-[12px] py-[8px] text-14 font-medium text-white transition-opacity hover:opacity-90 ${className}`}
    >
      <span>{text}</span>
      <IconPlus width={22} height={22} fill="#fff" />
    </HButton>
  )
}
