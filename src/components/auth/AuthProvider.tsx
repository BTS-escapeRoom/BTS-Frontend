'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/store/authStore'
import { PropsWithChildren } from 'react'

/**
 * 인증 초기화를 담당하는 Provider 컴포넌트
 * 초기화가 완료될 때까지 children 렌더링을 지연시킵니다.
 */
export default function AuthProvider({ children }: PropsWithChildren) {
  const { checkAuthStatus, isInitialized, isLoading } = useAuthStore()

  useEffect(() => {
    // 서비스 진입 시 인증 상태 확인 및 회원 정보 가져오기
    if (!isInitialized) {
      checkAuthStatus()
    }
  }, [checkAuthStatus, isInitialized])

  // 초기화가 완료될 때까지 로딩 상태 표시 (또는 null)
  if (!isInitialized && isLoading) {
    return null // 또는 로딩 스피너를 표시할 수 있습니다
  }

  return <>{children}</>
}
