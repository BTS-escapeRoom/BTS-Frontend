'use client'

import { useState, useEffect } from 'react'
import SInput from '@/components/input/SInput'
import { SCheckboxWithLabel } from '@/components/checkbox'
import { IconMinusRounded, IconPlusRounded } from '@/components/icons'

interface HintsFieldProps {
  hints: number | null
  onHintsChange: (hints: number | null) => void
}

export default function HintsField({ hints, onHintsChange }: HintsFieldProps) {
  const [isNotRecorded, setIsNotRecorded] = useState(hints === null)
  const [hintsValue, setHintsValue] = useState<string>(hints !== null ? hints.toString() : '')

  // 외부에서 값이 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (hints !== null) {
      setHintsValue(hints.toString())
      setIsNotRecorded(false)
    } else {
      setHintsValue('')
      setIsNotRecorded(true)
    }
  }, [hints])

  const handleHintsChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    setHintsValue(numValue)

    if (numValue === '') {
      onHintsChange(0)
    } else {
      const num = parseInt(numValue)
      if (!isNaN(num) && num >= 0) {
        onHintsChange(num)
      }
    }
  }

  const handleDecrease = () => {
    if (parseInt(hintsValue) <= 0) return
    const currentValue = parseInt(hintsValue) || 0
    if (currentValue > 0) {
      const newValue = currentValue - 1
      setHintsValue(newValue.toString())
      onHintsChange(newValue)
    }
  }

  const handleIncrease = () => {
    const currentValue = parseInt(hintsValue) || 0
    const newValue = currentValue + 1
    setHintsValue(newValue.toString())
    onHintsChange(newValue)
  }

  const handleNotRecordedChange = (checked: boolean) => {
    setIsNotRecorded(checked)
    if (checked) {
      onHintsChange(null)
      setHintsValue('')
    } else {
      const num = parseInt(hintsValue) || 0
      onHintsChange(num)
      setHintsValue(num.toString())
    }
  }

  return (
    <div className="flex items-start">
      <div className="text-semibold-14 w-[100px] text-[#000]">사용 힌트 수</div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={isNotRecorded}
            className="flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconMinusRounded width={18} height={18} fill={isNotRecorded ? '#BDBDBD' : '#757575'} />
          </button>
          <div className="flex items-center gap-[4px]">
            <SInput
              type="text"
              inputMode="numeric"
              value={hintsValue}
              onChange={(e) => handleHintsChange(e.target.value)}
              outline={true}
              className="w-[60px]"
              clearable={false}
              disabled={isNotRecorded}
              inputClassName="text-center"
              inputSize="sm"
            />
            <span className="text-14 text-gray06">개</span>
          </div>
          <button
            type="button"
            onClick={handleIncrease}
            disabled={isNotRecorded}
            className="flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconPlusRounded width={18} height={18} fill={isNotRecorded ? '#BDBDBD' : '#757575'} />
          </button>
        </div>
        <div>
          <SCheckboxWithLabel
            label="기록 안함"
            checked={isNotRecorded}
            onChange={handleNotRecordedChange}
          />
        </div>
      </div>
    </div>
  )
}
