'use client'

import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'

type HButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  disabled?: boolean
} & ComponentPropsWithoutRef<T>

export default function HButton<T extends ElementType = 'button'>({
  as,
  children,
  disabled = false,
  ...rest
}: HButtonProps<T>) {
  const Component = as || 'button'
  return (
    <Component
      {...rest}
      disabled={Component === 'button' ? disabled : undefined}
      aria-disabled={disabled}
    >
      {children}
    </Component>
  )
}
