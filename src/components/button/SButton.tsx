'use client'

import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'
import HButton from './HButton'

type ButtonSize = 'sm' | 'md' | 'lg'

type SButtonProps = {
  as?: ElementType
  className?: string
  disabled?: boolean
  size?: ButtonSize
  children: ReactNode
} & ComponentPropsWithoutRef<any>

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[32px] text-[12px]',
  md: 'h-[40px] text-[14px]',
  lg: 'h-[45px] text-semibold-16',
}

export default function SButton({
  as,
  className = '',
  disabled = false,
  size = 'lg',
  children,
  ...rest
}: SButtonProps) {
  const hasBgOverride = /\bbg-|\bbg-\[/.test(className)
  const hasTextOverride = /\btext-|\btext-\[/.test(className)

  const baseLayout =
    `rounded-sm w-full ${sizeStyles[size]} inline-flex items-center justify-center disabled:bg-gray04 disabled:cursor-default`.trim()
  const baseColor =
    `${hasBgOverride ? '' : 'bg-gray07'} ${hasTextOverride ? '' : 'text-white'}`.trim()

  const combinedClassName = `${baseLayout} ${baseColor} ${className}`.trim()

  return (
    <HButton as={as} disabled={disabled} className={combinedClassName} {...rest}>
      {children}
    </HButton>
  )
}
