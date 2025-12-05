'use client'

import { useState } from 'react'
import { SDatePicker } from '@/components/datepicker'
import { SCheckboxWithLabel } from '@/components/checkbox'

interface VisitDateFieldProps {
  visitDate: string | null
  onVisitDateChange: (visitDate: string | null) => void
}

export default function VisitDateField({ visitDate, onVisitDateChange }: VisitDateFieldProps) {
  const [isDateForgotten, setIsDateForgotten] = useState(false)
  const visitDateAsDate = visitDate ? new Date(visitDate) : null

  const handleDateChange = (date: Date | null) => {
    onVisitDateChange(date ? date.toISOString().split('T')[0] : null)
  }

  const handleForgottenChange = (checked: boolean) => {
    setIsDateForgotten(checked)
    if (checked) {
      onVisitDateChange(null)
    }
  }

  return (
    <div className="flex items-start">
      <div className="text-semibold-14 w-[100px] text-[#000]">방문일</div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <SDatePicker
            value={visitDateAsDate}
            onChange={handleDateChange}
            separator="."
            includeTime={false}
            disabled={isDateForgotten}
            className="min-w-[120px]"
          />
        </div>
        <div>
          <SCheckboxWithLabel
            label="기억 안나요"
            checked={isDateForgotten}
            onChange={handleForgottenChange}
          />
        </div>
      </div>
    </div>
  )
}
