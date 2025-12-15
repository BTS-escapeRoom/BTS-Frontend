'use client'

import { Suspense } from 'react'
import SHeader from '@/components/header/SHeader'
import RecruitForm from './components/RecruitForm'

function RecruitWriteContent() {
  return (
    <>
      <SHeader title="모집 글쓰기" showBack />
      <RecruitForm mode="create" />
    </>
  )
}

export default function RecruitWritePage() {
  return (
    <Suspense
      fallback={
        <>
          <SHeader title="모집 글쓰기" showBack />
          <div className="flex items-center justify-center py-[40px]">
            <div className="text-14 text-gray05">로딩 중...</div>
          </div>
        </>
      }
    >
      <RecruitWriteContent />
    </Suspense>
  )
}
