import { BASE_URL } from '@/utils/fetcher'

export interface RefreshTokenResponse {
  accessToken: string
}

export interface LogoutResponse {
  message: string
}

// 토큰 갱신 (헤더에서 토큰 받기)
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL}/reissue`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) return null

    const raw = response.headers.get('Access-Token')
    const newToken = raw?.startsWith('Bearer ') ? raw.slice(7) : raw

    return newToken ?? null
  } catch (error) {
    console.error('토큰 갱신 실패:', error)
    return null
  }
}

// 로그아웃
export async function logout(): Promise<void> {
  try {
    await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('로그아웃 요청 실패:', error)
  }
}
