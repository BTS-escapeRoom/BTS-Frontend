'use client'

import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const { accessToken, isLoading, isRefreshing, logout } = useAuthStore()

  return {
    isAuthenticated: !!accessToken,
    isLoading: isLoading || isRefreshing,
    accessToken,
    logout,
  }
}
