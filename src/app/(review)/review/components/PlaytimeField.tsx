'use client'

import { useState, useEffect } from 'react'
import SInput from '@/components/input/SInput'
import RadioOption from '@/components/radio/RadioOption'

type TimeType = 'REMAINING' | 'ELAPSED' | 'NONE'

interface PlaytimeFieldProps {
  elapsedTime: number // 초 단위
  remainingTime: number // 초 단위
  timeType: TimeType
  onElapsedTimeChange: (elapsedTime: number) => void
  onRemainingTimeChange: (remainingTime: number) => void
  onTimeTypeChange: (timeType: TimeType) => void
}

export default function PlaytimeField({
  elapsedTime,
  remainingTime,
  timeType,
  onElapsedTimeChange,
  onRemainingTimeChange,
  onTimeTypeChange,
}: PlaytimeFieldProps) {
  // 현재 선택된 타입에 따라 표시할 시간 값
  const getDisplayTime = () => {
    if (timeType === 'REMAINING' && remainingTime > 0) {
      return remainingTime
    }
    if (timeType === 'ELAPSED' && elapsedTime > 0) {
      return elapsedTime
    }
    return 0
  }

  const displayTime = getDisplayTime()
  const [min, setMin] = useState<string>(
    displayTime > 0 ? Math.floor(displayTime / 60).toString() : '',
  )
  const [sec, setSec] = useState<string>(displayTime > 0 ? (displayTime % 60).toString() : '')

  // 외부에서 값이 변경되면 내부 상태 업데이트
  useEffect(() => {
    const currentDisplayTime = getDisplayTime()
    if (currentDisplayTime > 0) {
      setMin(Math.floor(currentDisplayTime / 60).toString())
      setSec((currentDisplayTime % 60).toString())
    } else if (timeType === 'NONE') {
      setMin('')
      setSec('')
    }
  }, [elapsedTime, remainingTime, timeType])

  const handleMinChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    setMin(numValue)
    const minValue = parseInt(numValue) || 0
    const secValue = parseInt(sec) || 0
    const totalSeconds = minValue * 60 + secValue

    if (timeType === 'REMAINING') {
      onRemainingTimeChange(totalSeconds)
      onElapsedTimeChange(0)
    } else if (timeType === 'ELAPSED') {
      onElapsedTimeChange(totalSeconds)
      onRemainingTimeChange(0)
    }
  }

  const handleSecChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    // 초는 0-59까지만 입력 가능
    const secValue = numValue === '' ? '' : Math.min(59, parseInt(numValue)).toString()
    setSec(secValue)
    const minValue = parseInt(min) || 0
    const secNum = parseInt(secValue) || 0
    const totalSeconds = minValue * 60 + secNum

    if (timeType === 'REMAINING') {
      onRemainingTimeChange(totalSeconds)
      onElapsedTimeChange(0)
    } else if (timeType === 'ELAPSED') {
      onElapsedTimeChange(totalSeconds)
      onRemainingTimeChange(0)
    }
  }

  const handleTimeTypeChange = (value: string) => {
    const newTimeType = value as TimeType
    onTimeTypeChange(newTimeType)

    if (newTimeType === 'NONE') {
      onElapsedTimeChange(0)
      onRemainingTimeChange(0)
      setMin('')
      setSec('')
    } else if (newTimeType === 'REMAINING') {
      // 기존 elapsedTime 값이 있으면 remainingTime으로 이동
      if (elapsedTime > 0 && remainingTime === 0) {
        onRemainingTimeChange(elapsedTime)
        onElapsedTimeChange(0)
        setMin(Math.floor(elapsedTime / 60).toString())
        setSec((elapsedTime % 60).toString())
      } else if (remainingTime > 0) {
        setMin(Math.floor(remainingTime / 60).toString())
        setSec((remainingTime % 60).toString())
      } else {
        setMin('')
        setSec('')
      }
    } else if (newTimeType === 'ELAPSED') {
      // 기존 remainingTime 값이 있으면 elapsedTime으로 이동
      if (remainingTime > 0 && elapsedTime === 0) {
        onElapsedTimeChange(remainingTime)
        onRemainingTimeChange(0)
        setMin(Math.floor(remainingTime / 60).toString())
        setSec((remainingTime % 60).toString())
      } else if (elapsedTime > 0) {
        setMin(Math.floor(elapsedTime / 60).toString())
        setSec((elapsedTime % 60).toString())
      } else {
        setMin('')
        setSec('')
      }
    }
  }

  return (
    <div className="flex items-start">
      <div className="text-semibold-14 w-[100px] text-[#000]">플레이타임</div>
      <div className="flex flex-1 flex-col gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <SInput
              type="text"
              inputMode="numeric"
              value={min}
              onChange={(e) => handleMinChange(e.target.value)}
              outline={true}
              className="w-[60px]"
              inputClassName="text-center"
              clearable={false}
              disabled={timeType === 'NONE'}
              inputSize="sm"
            />
            <span className="text-14 text-gray06">분</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <SInput
              type="text"
              inputMode="numeric"
              value={sec}
              inputClassName="text-center"
              onChange={(e) => handleSecChange(e.target.value)}
              outline={true}
              className="w-[60px]"
              clearable={false}
              disabled={timeType === 'NONE'}
              inputSize="sm"
            />
            <span className="text-14 text-gray06">초</span>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <RadioOption
            label="남았어요"
            value="REMAINING"
            checked={timeType === 'REMAINING'}
            onChange={handleTimeTypeChange}
            size={12}
            color="#757575"
            labelSize="text-12"
          />
          <RadioOption
            label="걸렸어요"
            value="ELAPSED"
            checked={timeType === 'ELAPSED'}
            onChange={handleTimeTypeChange}
            size={12}
            color="#757575"
            labelSize="text-12"
          />
          <RadioOption
            label="기록 안함"
            value="NONE"
            checked={timeType === 'NONE'}
            onChange={handleTimeTypeChange}
            size={12}
            color="#757575"
            labelSize="text-12"
          />
        </div>
      </div>
    </div>
  )
}
