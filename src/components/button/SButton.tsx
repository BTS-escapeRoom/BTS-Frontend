'use client'

import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'
import HButton from './HButton'

type SButtonProps = {
  as?: ElementType
  className?: string
  disabled?: boolean
  children: ReactNode
} & ComponentPropsWithoutRef<any>

export default function SButton({
  as,
  className = '',
  disabled = false,
  children,
  ...rest
}: SButtonProps) {
  const baseStyle = `
    bg-gray07 rounded-sm text-white w-full h-[45px] text-bold-16
    hover:bg-gray05
    disabled:bg-gray04 disabled:cursor-default
  `.trim()

  const combinedClassName = `${baseStyle} ${className}`.trim()

  return (
    <HButton as={as} disabled={disabled} className={combinedClassName} {...rest}>
      {children}
    </HButton>
  )
}
