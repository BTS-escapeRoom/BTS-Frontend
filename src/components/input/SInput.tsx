'use client'

import { InputHTMLAttributes } from 'react'
import HInput from './HInput'
import { IconClear } from '../icons'

type SInputSize = 'xs' | 'sm' | 'md' | 'lg'

type SInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  clearable?: boolean
  outline?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  inputSize?: SInputSize
  inputClassName?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

export default function SInput({
  error = false,
  outline = false,
  className = '',
  clearable = true,
  disabled = false,
  inputSize = 'md',
  inputClassName = '',
  ...props
}: SInputProps) {
  const baseStyle =
    'w-full h-[40px] rounded-md px-[10px] py-[10px] outline-none text-14 placeholder:text-gray04 text-gray07 '
  const disabledStyle = 'disabled:cursor-default disabled:bg-gray-03'
  const errorStyle = 'border-red-500 focus:ring-red-500'
  const normalStyle = 'bg-gray01'
  const outlineStyle = 'border border-gray03 '

  const sizeStyles: Record<SInputSize, string> = {
    xs: 'h-[24px] text-[12px]',
    sm: 'h-[32px] text-[14px]',
    md: 'h-[40px] text-[14px]',
    lg: 'h-[45px] text-[16px]',
  }

  const finalClassName = [
    baseStyle,
    error ? errorStyle : outline ? outlineStyle : normalStyle,
    disabledStyle,
    sizeStyles[inputSize as SInputSize],
  ]
    .filter(Boolean)
    .join(' ')

  const isFilled = !!(typeof props.value === 'string' && props.value.trim() !== '')

  const inputProps = {
    disabled,
    placeholder: props.placeholder,
    id: props.id,
    value: props.value,
    onChange: props.onChange,
  }

  return (
    <div className={`relative ${className}`}>
      <HInput
        {...inputProps}
        className={`${finalClassName} ${clearable && isFilled ? 'pr-[40px]' : ''} ${inputClassName || ''}`}
      />
      {clearable && props.value && (
        <button
          type="button"
          onClick={() => {
            if (props.onChange) {
              props.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
            }
          }}
          className={`absolute right-[10px] top-1/2 -translate-y-1/2 transform ${outline && isFilled ? 'text-gray05' : 'text-gray04'}`}
        >
          <IconClear />
        </button>
      )}
    </div>
  )
}
