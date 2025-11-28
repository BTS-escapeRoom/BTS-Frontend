'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { useAuthStore } from '@/features/auth/store/authStore'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const result = searchParams.get('result')
  const refreshToken = useAuthStore((state) => state.refreshToken)

  useEffect(() => {
    if (!result) {
      router.replace('/login')
      return
    }

    const handleCallback = async () => {
      switch (result) {
        case 'success':
          // 로그인 성공 시 accessToken 받아오기
          const success = await refreshToken()
          if (success) {
            router.replace('/')
          } else {
            alert('로그인에 실패했습니다. 다시 시도해주세요.')
            router.replace('/login')
          }
          break
        case 'signup':
        case 'emptyNickname':
          router.replace('/signup')
          break
        default:
          alert('일시적인 오류로 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.')
          router.replace('/login')
      }
    }

    handleCallback()
  }, [result, router, refreshToken])

  return null
}

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={null}>
      <CallbackContent />
    </Suspense>
  )
}
