'use client'

import { create } from 'zustand'
import { refreshAccessToken, logout } from '../api/auth'

// refresh token 존재 여부 확인
function hasRefreshToken(): boolean {
  return document.cookie.includes('refreshToken=')
}

interface AuthState {
  accessToken: string | null
  isLoading: boolean
  isRefreshing: boolean
}

interface AuthActions {
  setAccessToken: (token: string | null) => void
  clearAccessToken: () => void
  refreshToken: () => Promise<boolean>
  logout: () => Promise<void>
  checkAuthStatus: () => Promise<boolean>
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>((set, get) => ({
  // State
  accessToken: null,
  isLoading: false,
  isRefreshing: false,

  // Actions
  setAccessToken: (token: string | null) => {
    set({ accessToken: token })
  },

  clearAccessToken: () => {
    set({ accessToken: null })
  },

  refreshToken: async () => {
    const { isRefreshing } = get()
    if (isRefreshing) {
      // 이미 갱신 중이면 대기
      return new Promise((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
          if (!state.isRefreshing) {
            unsubscribe()
            resolve(!!state.accessToken)
          }
        })
      })
    }

    set({ isRefreshing: true })

    try {
      const newToken = await refreshAccessToken()
      if (newToken) {
        set({ accessToken: newToken, isRefreshing: false })
        return true
      } else {
        // 갱신 실패 시 로그아웃 처리
        await get().logout()
        return false
      }
    } catch (error) {
      console.error('토큰 갱신 중 오류:', error)
      await get().logout()
      return false
    }
  },

  logout: async () => {
    set({ isLoading: true })

    try {
      await logout()
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error)
    } finally {
      set({
        accessToken: null,
        isLoading: false,
        isRefreshing: false,
      })
    }
  },

  checkAuthStatus: async () => {
    const { accessToken } = get()

    // accessToken이 있으면 로그인 상태
    if (accessToken) {
      return true
    }

    // refresh token이 없으면 로그아웃 처리
    if (!hasRefreshToken()) {
      await get().logout()
      return false
    }

    // accessToken이 없고 refresh token이 있으면 갱신 시도
    return await get().refreshToken()
  },
}))
