'use client'

import { InputHTMLAttributes } from 'react'
import HInput from './HInput'
import { IconClear } from '../icons'

type SInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  clearable?: boolean
  outline?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

export default function SInput({
  error = false,
  outline = false,
  className = '',
  clearable = true,
  disabled = false,
  ...props
}: SInputProps) {
  const baseStyle =
    'w-full h-[40px] rounded-md px-[10px] py-[10px] text-[16px] outline-none text-[14px] placeholder:text-gray04 text-gray07 '
  const disabledStyle = 'disabled:cursor-default disabled:bg-gray-03'
  const errorStyle = 'border-red-500 focus:ring-red-500'
  const normalStyle = 'bg-gray01'
  const outlineStyle = 'border border-gray03 '
  const outlineFilledStyle = 'border border-gray05 text-gray07'

  const finalClassName = [
    baseStyle,
    error ? errorStyle : outline ? outlineStyle : normalStyle,
    disabledStyle,
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
        className={`${finalClassName} ${isFilled && outline ? outlineFilledStyle : ''} ${clearable && isFilled ? 'pr-[40px]' : ''}`}
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
