'use client'

import { useState, useEffect } from 'react'
import SInput from '@/components/input/SInput'

interface PlaytimeFieldProps {
  elapsedTime: number // 초 단위
  remainingTime: number // 초 단위
  onElapsedTimeChange: (elapsedTime: number) => void
  onRemainingTimeChange: (remainingTime: number) => void
}

export default function PlaytimeField({
  elapsedTime,
  remainingTime,
  onElapsedTimeChange,
  onRemainingTimeChange,
}: PlaytimeFieldProps) {
  // 경과 시간 (분, 초)
  const [elapsedMin, setElapsedMin] = useState<string>(
    elapsedTime > 0 ? Math.floor(elapsedTime / 60).toString() : '',
  )
  const [elapsedSec, setElapsedSec] = useState<string>(
    elapsedTime > 0 ? (elapsedTime % 60).toString() : '',
  )

  // 남은 시간 (분, 초)
  const [remainingMin, setRemainingMin] = useState<string>(
    remainingTime > 0 ? Math.floor(remainingTime / 60).toString() : '',
  )
  const [remainingSec, setRemainingSec] = useState<string>(
    remainingTime > 0 ? (remainingTime % 60).toString() : '',
  )

  // elapsedTime이 외부에서 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (elapsedTime > 0) {
      setElapsedMin(Math.floor(elapsedTime / 60).toString())
      setElapsedSec((elapsedTime % 60).toString())
    } else {
      setElapsedMin('')
      setElapsedSec('')
    }
  }, [elapsedTime])

  // remainingTime이 외부에서 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (remainingTime > 0) {
      setRemainingMin(Math.floor(remainingTime / 60).toString())
      setRemainingSec((remainingTime % 60).toString())
    } else {
      setRemainingMin('')
      setRemainingSec('')
    }
  }, [remainingTime])

  const handleElapsedMinChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    setElapsedMin(numValue)
    const min = parseInt(numValue) || 0
    const sec = parseInt(elapsedSec) || 0
    onElapsedTimeChange(min * 60 + sec)
  }

  const handleElapsedSecChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    // 초는 0-59까지만 입력 가능
    const secValue = numValue === '' ? '' : Math.min(59, parseInt(numValue)).toString()
    setElapsedSec(secValue)
    const min = parseInt(elapsedMin) || 0
    const sec = parseInt(secValue) || 0
    onElapsedTimeChange(min * 60 + sec)
  }

  const handleRemainingMinChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    setRemainingMin(numValue)
    const min = parseInt(numValue) || 0
    const sec = parseInt(remainingSec) || 0
    onRemainingTimeChange(min * 60 + sec)
  }

  const handleRemainingSecChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '')
    // 초는 0-59까지만 입력 가능
    const secValue = numValue === '' ? '' : Math.min(59, parseInt(numValue)).toString()
    setRemainingSec(secValue)
    const min = parseInt(remainingMin) || 0
    const sec = parseInt(secValue) || 0
    onRemainingTimeChange(min * 60 + sec)
  }

  return (
    <div className="flex flex-col gap-[16px]">
      {/* 경과 시간 */}
      <div className="flex items-start">
        <div className="text-semibold-14 w-[100px] text-[#000]">경과 시간</div>
        <div className="flex flex-1 items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <SInput
              type="text"
              inputMode="numeric"
              value={elapsedMin}
              onChange={(e) => handleElapsedMinChange(e.target.value)}
              placeholder="0"
              className="w-[60px]"
              clearable={false}
            />
            <span className="text-14 text-gray06">분</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <SInput
              type="text"
              inputMode="numeric"
              value={elapsedSec}
              onChange={(e) => handleElapsedSecChange(e.target.value)}
              placeholder="0"
              className="w-[60px]"
              clearable={false}
            />
            <span className="text-14 text-gray06">초</span>
          </div>
        </div>
      </div>

      {/* 남은 시간 */}
      <div className="flex items-start">
        <div className="text-semibold-14 w-[100px] text-[#000]">남은 시간</div>
        <div className="flex flex-1 items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <SInput
              type="text"
              inputMode="numeric"
              value={remainingMin}
              onChange={(e) => handleRemainingMinChange(e.target.value)}
              placeholder="0"
              className="w-[60px]"
              clearable={false}
            />
            <span className="text-14 text-gray06">분</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <SInput
              type="text"
              inputMode="numeric"
              value={remainingSec}
              onChange={(e) => handleRemainingSecChange(e.target.value)}
              placeholder="0"
              className="w-[60px]"
              clearable={false}
            />
            <span className="text-14 text-gray06">초</span>
          </div>
        </div>
      </div>
    </div>
  )
}
