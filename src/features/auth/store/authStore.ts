'use client'

import { create } from 'zustand'
import { refreshAccessToken, logout } from '../api/auth'
import { getMemberInfo, type MemberInfo } from '../api/member'

// 쿠키에서 특정 키의 값을 가져오는 헬퍼 함수
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

// refresh token 존재 여부 확인
function hasRefreshToken(): boolean {
  if (typeof document === 'undefined') return false
  return getCookie('refresh-token') !== null
}

interface AuthState {
  accessToken: string | null
  memberInfo: MemberInfo | null
  isLoading: boolean
  isRefreshing: boolean
  isFetchingMemberInfo: boolean
  isInitialized: boolean
}

interface AuthActions {
  setAccessToken: (token: string | null) => void
  clearAccessToken: () => void
  setMemberInfo: (memberInfo: MemberInfo | null) => void
  fetchMemberInfo: () => Promise<void>
  refreshToken: () => Promise<boolean>
  logout: () => Promise<void>
  checkAuthStatus: () => Promise<boolean>
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>((set, get) => ({
  // State
  accessToken: null,
  memberInfo: null,
  isLoading: false,
  isRefreshing: false,
  isFetchingMemberInfo: false,
  isInitialized: false,

  // Actions
  setAccessToken: (token: string | null) => {
    set({ accessToken: token })
  },

  clearAccessToken: () => {
    set({ accessToken: null })
  },

  setMemberInfo: (memberInfo: MemberInfo | null) => {
    set({ memberInfo })
  },

  fetchMemberInfo: async () => {
    const { isFetchingMemberInfo } = get()

    // 이미 가져오는 중이면 중복 호출 방지
    if (isFetchingMemberInfo) {
      return
    }

    set({ isFetchingMemberInfo: true })

    try {
      // 항상 /v1/members/me 호출하여 최신 회원 정보 조회
      const memberInfo = await getMemberInfo()
      set({ memberInfo, isFetchingMemberInfo: false })
    } catch (error) {
      console.error('회원 정보 조회 중 오류:', error)
      set({ memberInfo: null, isFetchingMemberInfo: false })
    }
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
        memberInfo: null,
        isLoading: false,
        isRefreshing: false,
        isFetchingMemberInfo: false,
      })
    }
  },

  checkAuthStatus: async () => {
    const { isInitialized } = get()

    // 이미 초기화가 완료되었으면 현재 회원 정보 존재 여부로 로그인 상태 반환
    if (isInitialized) {
      return !!get().memberInfo
    }

    // 초기화 시작
    set({ isLoading: true })

    try {
      // 페이지 진입(새로고침) 시마다 항상 /v1/members/me 호출
      await get().fetchMemberInfo()

      set({ isInitialized: true, isLoading: false })
      return !!get().memberInfo
    } catch (error) {
      console.error('인증 상태 확인 중 오류:', error)
      set({
        accessToken: null,
        memberInfo: null,
        isInitialized: true,
        isLoading: false,
      })
      return false
    }
  },
}))
