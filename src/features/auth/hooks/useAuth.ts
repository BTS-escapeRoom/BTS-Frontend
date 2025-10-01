'use client'

import { useAuthStore } from '../store/authStore'
import { useEffect } from 'react'

export function useAuth() {
  const { accessToken, isLoading, isRefreshing, checkAuthStatus, logout } = useAuthStore()

  useEffect(() => {
    // 컴포넌트 마운트 시 인증 상태 확인
    checkAuthStatus()
  }, [checkAuthStatus])

  return {
    isAuthenticated: !!accessToken,
    isLoading: isLoading || isRefreshing,
    accessToken,
    logout,
  }
}
