'use client'

import { useId, useRef } from 'react'
import { IconCalendar } from '@/components/icons'

interface SDatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
  showDateDisplay?: boolean
  includeTime?: boolean
  separator?: '.' | '-'
  disabled?: boolean
  className?: string
  placeholder?: string
}

export default function SDatePicker({
  value,
  onChange,
  showDateDisplay = true,
  includeTime = false,
  separator = '.',
  disabled = false,
  className = '',
  placeholder,
}: SDatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    if (includeTime) {
      const hours = date.getHours()
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const ampm = hours >= 12 ? '오후' : '오전'
      const displayHours = hours % 12 || 12

      return `${year}${separator}${month}${separator}${day} ${ampm} ${displayHours}:${minutes}`
    }

    return `${year}${separator}${month}${separator}${day}`
  }

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDateTimeForInput = (date: Date | null): string => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue) {
      const date = new Date(inputValue)
      onChange(date)
    } else {
      onChange(null)
    }
  }

  const handleClick = () => {
    if (disabled) return
    // showPicker()는 일부 브라우저에서만 지원되므로 click()을 사용
    inputRef.current?.showPicker?.() || inputRef.current?.click()
  }

  const hasValue = value !== null
  const displayText = hasValue ? formatDate(value) : ''
  const inputValue = includeTime ? formatDateTimeForInput(value) : formatDateForInput(value)

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex cursor-pointer items-center gap-[8px] ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      {showDateDisplay && (
        <div
          className={`inline-flex flex-1 items-center ${
            hasValue ? 'text-gray06' : 'border-b border-gray03 pb-[2px]'
          }`}
          style={{
            minWidth: includeTime ? '180px' : '100px',
          }}
        >
          {hasValue ? (
            <span className="text-14">{displayText}</span>
          ) : (
            <span className="text-14 text-transparent">
              {placeholder || (includeTime ? '날짜 및 시간 선택' : '날짜 선택')}
            </span>
          )}
        </div>
      )}
      <span className="inline-flex items-center justify-center">
        <IconCalendar width={18} height={18} fill={hasValue ? '#424242' : '#424242'} />
      </span>
      <input
        ref={inputRef}
        id={id}
        type={includeTime ? 'datetime-local' : 'date'}
        value={inputValue}
        onChange={handleInputChange}
        disabled={disabled}
        className="sr-only"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
    </div>
  )
}
