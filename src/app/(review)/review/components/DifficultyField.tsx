'use client'

import { IconLockHalfLeft, IconLockHalfRight } from '@/components/icons'

interface DifficultyFieldProps {
  difficulty: number
  onDifficultyChange: (difficulty: number) => void
}

export default function DifficultyField({ difficulty, onDifficultyChange }: DifficultyFieldProps) {
  const totalIcons = 10 // 총 10개 아이콘 (0.5점씩, 총 5점)
  const selectedCount = Math.round(difficulty * 2) // 선택된 아이콘 개수

  const handleIconClick = (index: number) => {
    if (index === 0 && difficulty === 0.5) {
      onDifficultyChange(0)
      return
    }
    const newDifficulty = (index + 1) * 0.5
    onDifficultyChange(newDifficulty)
  }

  return (
    <div className="flex items-start">
      <div className="text-semibold-14 w-[100px] text-[#000]">체감난이도</div>
      <div className="flex flex-1 items-end">
        <div className="flex items-center gap-[4px]">
          {Array.from({ length: totalIcons }).map((_, index) => {
            const isSelected = index < selectedCount
            const fillColor = isSelected ? '#E1CAFF' : '#E0E0E0'
            const IconComponent = index % 2 === 0 ? IconLockHalfLeft : IconLockHalfRight

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleIconClick(index)}
                className="cursor-pointer"
                aria-label={`${(index + 1) * 0.5}점 선택`}
              >
                <IconComponent width={11} height={28} fill={fillColor} />
              </button>
            )
          })}
        </div>
        {difficulty > 0 && <div className="ml-[16px] text-14 text-gray06">{difficulty}</div>}
      </div>
    </div>
  )
}
