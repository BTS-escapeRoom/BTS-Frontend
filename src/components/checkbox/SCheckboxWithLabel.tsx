'use client'

import { useId } from 'react'
import SCheckbox from './SCheckbox'

interface SCheckboxWithLabelProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  labelPosition?: 'left' | 'right'
  className?: string
  labelClassName?: string
  size?: number
  color?: string
}

export default function SCheckboxWithLabel({
  label,
  checked,
  onChange,
  disabled = false,
  labelPosition = 'right',
  className = '',
  labelClassName = '',
  size = 14,
  color = '#9747FF',
}: SCheckboxWithLabelProps) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className={`inline-flex cursor-pointer items-center gap-[8px] ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      {labelPosition === 'left' && <span className={`text-gray06 ${labelClassName}`}>{label}</span>}
      <SCheckbox
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        size={size}
        color={color}
      />
      {labelPosition === 'right' && (
        <span className={`text-gray06 ${labelClassName}`}>{label}</span>
      )}
    </label>
  )
}
