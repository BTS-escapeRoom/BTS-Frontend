'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/store/authStore'

/**
 * 서비스 진입 시 인증 상태 확인 및 회원 정보를 가져오는 컴포넌트
 * 초기화가 완료될 때까지 다른 컴포넌트의 렌더링을 지연시킵니다.
 */
export default function AuthInitializer() {
  const { checkAuthStatus, isInitialized, isLoading } = useAuthStore()

  useEffect(() => {
    // 서비스 진입 시 인증 상태 확인 (이미 checkAuthStatus 내부에서 회원 정보도 가져옴)
    if (!isInitialized) {
      checkAuthStatus()
    }
  }, [checkAuthStatus, isInitialized])

  // 초기화가 완료될 때까지 null 반환 (다른 컴포넌트 렌더링 지연)
  if (!isInitialized && isLoading) {
    return null
  }

  return null
}
