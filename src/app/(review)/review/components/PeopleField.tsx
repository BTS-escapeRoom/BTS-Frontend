'use client'

import { useState, useEffect } from 'react'
import SInput from '@/components/input/SInput'

interface PeopleFieldProps {
  people: number | null
  onPeopleChange: (people: number | null) => void
}

export default function PeopleField({ people, onPeopleChange }: PeopleFieldProps) {
  const [peopleValue, setPeopleValue] = useState<string>(people !== null ? people.toString() : '')

  // 외부에서 값이 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (people !== null) {
      setPeopleValue(people.toString())
    } else {
      setPeopleValue('')
    }
  }, [people])

  const handlePeopleChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    setPeopleValue(numValue)

    if (numValue === '') {
      onPeopleChange(null)
    } else {
      const num = parseInt(numValue)
      if (!isNaN(num) && num > 0) {
        onPeopleChange(num)
      }
    }
  }

  return (
    <div className="flex items-start">
      <div className="text-semibold-14 w-[100px] text-[#000]">플레이 인원</div>
      <div className="flex flex-1 items-center">
        <SInput
          type="text"
          inputMode="numeric"
          value={peopleValue}
          onChange={(e) => handlePeopleChange(e.target.value)}
          outline={true}
          className="w-[60px]"
          clearable={false}
          inputClassName="text-center"
          inputSize="sm"
        />
        <span className="ml-[8px] text-14 text-gray06">명</span>
      </div>
    </div>
  )
}
