import { BASE_URL } from '@/utils/fetcher'

export interface RefreshTokenResponse {
  accessToken: string
}

export interface LogoutResponse {
  message: string
}

// 쿠키 제거 헬퍼 함수
function removeRefreshTokenCookie() {
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
}

// 토큰 갱신 (헤더에서 토큰 받기)
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL}/reissue`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      // 응답이 실패하면 refresh token도 제거
      removeRefreshTokenCookie()
      return null
    }

    const raw = response.headers.get('Access-Token')
    const newToken = raw?.startsWith('Bearer ') ? raw.slice(7) : raw

    return newToken ?? null
  } catch (error) {
    console.error('토큰 갱신 실패:', error)
    // 에러 발생 시 refresh token도 제거
    removeRefreshTokenCookie()
    return null
  }
}

// 로그아웃
export async function logout(): Promise<void> {
  removeRefreshTokenCookie()
}
