'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import SHeader from '@/components/header/SHeader'
import ReviewForm, { type ReviewFormData } from '../components/ReviewForm'

export default function ReviewWritePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const themeId = searchParams.get('themeId')

  const handleSubmit = async (data: ReviewFormData) => {
    // TODO: 리뷰 작성 API 호출
    console.log('리뷰 작성 데이터:', data)
    
    // 작성 완료 후 이전 페이지로 이동
    router.back()
  }

  return (
    <>
      <SHeader title="리뷰 작성" showBack />
      <ReviewForm onSubmit={handleSubmit} />
    </>
  )
}

