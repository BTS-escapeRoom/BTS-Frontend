'use client'

import { useState } from 'react'
import type { Review } from '@/features/theme/api/getReviews.types'
import SButton from '@/components/button/SButton'
import STextarea from '@/components/input/STextarea'
import { useToast } from '@/hooks/useToast'
import VisitDateField from './VisitDateField'
import DifficultyField from './DifficultyField'
import PlaytimeField from './PlaytimeField'
import PeopleField from './PeopleField'
import HintsField from './HintsField'
import ActivityField from './ActivityField'
import ScareField from './ScareField'
import SuccessField from './SuccessField'

export type ReviewFormData = {
  content: string | null
  people: number | null
  remainingTime: number
  elapsedTime: number
  difficulty: number
  scareScore: number
  activityScore: number
  visitDate: string | null
  hints: number | null
  isSuccess: boolean | undefined
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
  const { showToast } = useToast()

  // 오늘 날짜를 YYYY-MM-DD 형식으로 생성
  const getTodayDateString = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [formData, setFormData] = useState<ReviewFormData>({
    content: initialData?.content ?? null,
    people: initialData?.people ?? null,
    remainingTime: initialData?.remainingTime ?? 0,
    elapsedTime: initialData?.elapsedTime ?? 0,
    timeType: initialData?.timeType ?? 'REMAINING',
    difficulty: initialData?.difficulty ?? 0,
    scareScore: initialData?.scareScore ?? 0,
    activityScore: initialData?.activityScore ?? 0,
    visitDate: initialData?.visitDate ?? getTodayDateString(),
    hints: initialData?.hints ?? 0,
    isSuccess: initialData?.isSuccess,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 플레이 인원 검증
    if (formData.people === null) {
      showToast('플레이 인원을 작성해주세요.', 'warning')
      return
    }

    // 탈출 여부 검증
    if (formData.isSuccess === undefined) {
      showToast('탈출 여부를 알려주세요.', 'warning')
      return
    }

    if (
      formData.timeType !== 'NONE' &&
      (formData.remainingTime === 0 || formData.elapsedTime === 0)
    ) {
      setFormData((prev) => ({ ...prev, timeType: 'NONE' }))
    }

    // null이나 undefined인 필드를 제거한 데이터 생성
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== null && value !== undefined),
    ) as ReviewFormData

    onSubmit(cleanedData)
  }

  return (
    <div className="relative">
      <div className="mx-auto flex max-w-[500px] flex-col gap-[28px] px-[16px] pb-[40px] pt-[24px] text-14 text-gray05">
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
          onTimeTypeChange={(timeType) => setFormData((prev) => ({ ...prev, timeType }))}
        />
        <PeopleField
          people={formData.people}
          onPeopleChange={(people) => setFormData((prev) => ({ ...prev, people }))}
        />
        <HintsField
          hints={formData.hints}
          onHintsChange={(hints) => setFormData((prev) => ({ ...prev, hints }))}
        />
        <ActivityField
          activityScore={formData.activityScore}
          onActivityScoreChange={(activityScore) =>
            setFormData((prev) => ({ ...prev, activityScore }))
          }
        />
        <ScareField
          scareScore={formData.scareScore}
          onScareScoreChange={(scareScore) => setFormData((prev) => ({ ...prev, scareScore }))}
        />
        <SuccessField
          isSuccess={formData.isSuccess}
          onSuccessChange={(isSuccess) => setFormData((prev) => ({ ...prev, isSuccess }))}
        />
        <div className="flex flex-col gap-[12px]">
          <STextarea
            placeholder="테마에 대한 자세한 후기를 남겨주세요! (최대 300자, 스포가 포함되어 있으면 임의 삭제처리 될 수 있습니다)"
            value={formData.content ?? ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            maxLength={300}
            className="h-[200px]"
          />
        </div>
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
