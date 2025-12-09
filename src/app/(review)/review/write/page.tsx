'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SHeader from '@/components/header/SHeader'
import ReviewForm, { type ReviewFormData } from '../components/ReviewForm'
import { createReview } from '@/features/theme/api/createReview'
import { useToast } from '@/hooks/useToast'

function ReviewWriteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const themeId = searchParams.get('themeId')
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: ReviewFormData) => {
    if (!themeId) {
      showToast('테마 정보를 찾을 수 없습니다.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // visitDate에 시간 추가 (YYYY-MM-DD -> YYYY-MM-DDTHH:mm:ss ISO 8601 형식)
      const visitDateWithTime = data.visitDate ? `${data.visitDate}T00:00:00` : undefined

      await createReview({
        themeId,
        content: data.content || undefined,
        people: data.people || undefined,
        remainingTime: data.remainingTime || undefined,
        elapsedTime: data.elapsedTime || undefined,
        difficulty: data.difficulty,
        scareScore: data.scareScore,
        activityScore: data.activityScore,
        visitDate: visitDateWithTime,
        hints: data.hints || undefined,
        isSuccess: data.isSuccess!,
      })

      showToast('리뷰가 작성되었습니다.', 'success')
      router.back()
    } catch (error) {
      showToast('리뷰 작성 중 오류가 발생했습니다.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SHeader title="리뷰 작성" showBack />
      <ReviewForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  )
}

export default function ReviewWritePage() {
  return (
    <Suspense
      fallback={
        <>
          <SHeader title="리뷰 작성" showBack />
          <div className="flex items-center justify-center py-[40px]">
            <div className="text-14 text-gray05">로딩 중...</div>
          </div>
        </>
      }
    >
      <ReviewWriteContent />
    </Suspense>
  )
}
