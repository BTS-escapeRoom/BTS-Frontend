'use client'

import { useState } from 'react'
import type { Review } from '@/features/theme/api/getReviews.types'
import SButton from '@/components/button/SButton'
import VisitDateField from './VisitDateField'
import DifficultyField from './DifficultyField'
import PlaytimeField from './PlaytimeField'

export type ReviewFormData = {
  content: string
  people: number | null
  remainingTime: number
  elapsedTime: number
  difficulty: number
  scareScore: number
  activityScore: number
  visitDate: string | null
  hints: number | null
  isSuccess: boolean
  timeType: 'REMAINING' | 'ELAPSED' | 'NONE'
}

type ReviewFormProps = {
  initialData?: Partial<ReviewFormData>
  onSubmit: (data: ReviewFormData) => void | Promise<void>
  isSubmitting?: boolean
}

export default function ReviewForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    content: initialData?.content || '',
    people: initialData?.people ?? null,
    remainingTime: initialData?.remainingTime ?? 0,
    elapsedTime: initialData?.elapsedTime ?? 0,
    timeType: initialData?.timeType ?? 'REMAINING',
    difficulty: initialData?.difficulty ?? 0,
    scareScore: initialData?.scareScore ?? 0,
    activityScore: initialData?.activityScore ?? 0,
    visitDate: initialData?.visitDate ?? null,
    hints: initialData?.hints ?? null,
    isSuccess: initialData?.isSuccess ?? false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="relative">
      <div className="flex max-w-[500px] flex-col gap-[28px] px-[16px] pb-[104px] pt-[24px] text-14 text-gray05">
        <VisitDateField
          visitDate={formData.visitDate}
          onVisitDateChange={(visitDate) => setFormData((prev) => ({ ...prev, visitDate }))}
        />
        <DifficultyField
          difficulty={formData.difficulty}
          onDifficultyChange={(difficulty) => setFormData((prev) => ({ ...prev, difficulty }))}
        />
        <PlaytimeField
          elapsedTime={formData.elapsedTime}
          remainingTime={formData.remainingTime}
          timeType={formData.timeType}
          onElapsedTimeChange={(elapsedTime) => setFormData((prev) => ({ ...prev, elapsedTime }))}
          onRemainingTimeChange={(remainingTime) =>
            setFormData((prev) => ({ ...prev, remainingTime }))
          }
        />
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[600px] -translate-x-1/2 bg-white p-[16px]">
        <div className="mx-auto max-w-[600px]">
          <SButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : '저장'}
          </SButton>
        </div>
      </div>
    </div>
  )
}
