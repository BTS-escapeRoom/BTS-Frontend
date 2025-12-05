'use client'

import { IconCheckboxEmpty, IconCheckboxFill } from '@/components/icons'

interface SCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  size?: number
  id?: string
}

export default function SCheckbox({
  checked,
  onChange,
  disabled = false,
  className = '',
  size = 14,
  id,
}: SCheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked)
    }
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      <span className="inline-flex items-center justify-center">
        {checked ? (
          <IconCheckboxFill width={size} height={size} />
        ) : (
          <IconCheckboxEmpty width={size} height={size} />
        )}
      </span>
    </span>
  )
}
