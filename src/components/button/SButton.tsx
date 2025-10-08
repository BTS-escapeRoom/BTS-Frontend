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
  const hasBgOverride = /\bbg-|\bbg-\[/.test(className)
  const hasTextOverride = /\btext-|\btext-\[/.test(className)

  const baseLayout =
    `rounded-sm w-full h-[45px] text-semibold-16 inline-flex items-center justify-center disabled:bg-gray04 disabled:cursor-default`.trim()
  const baseColor =
    `${hasBgOverride ? '' : 'bg-gray07'} ${hasTextOverride ? '' : 'text-white'}`.trim()

  const combinedClassName = `${baseLayout} ${baseColor} ${className}`.trim()

  return (
    <HButton as={as} disabled={disabled} className={combinedClassName} {...rest}>
      {children}
    </HButton>
  )
}
