'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const result = searchParams.get('result')

  useEffect(() => {
    if (!result) {
      router.replace('/login')
      return
    }

    switch (result) {
      case 'success':
        router.replace('/')
        break
      case 'signup':
      case 'emptyNickname':
        router.replace('/signup')
        break
      default:
        alert('일시적인 오류로 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.')
        router.replace('/login')
    }
  }, [result, router])

  return null
}

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={null}>
      <CallbackContent />
    </Suspense>
  )
}
