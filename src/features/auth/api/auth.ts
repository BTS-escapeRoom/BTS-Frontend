import { BASE_URL } from '@/utils/fetcher'

export interface RefreshTokenResponse {
  accessToken: string
}

export interface LogoutResponse {
  message: string
}

// 쿠키 제거 헬퍼 함수
function removeRefreshTokenCookie() {
  if (typeof document === 'undefined') return

  const expiredAt = 'Thu, 01 Jan 1970 00:00:00 GMT'
  const hostname = window.location.hostname
  const domains = new Set<string | null>([null])

  if (hostname && hostname !== 'localhost') {
    domains.add(hostname)

    const hostnameParts = hostname.split('.')
    if (hostnameParts.length > 2) {
      domains.add(`.${hostnameParts.slice(-2).join('.')}`)
    }
  }

  domains.forEach((domain) => {
    const domainPart = domain ? ` domain=${domain};` : ''
    document.cookie = `refresh-token=; expires=${expiredAt}; Max-Age=0; path=/;${domainPart} SameSite=Lax`
    document.cookie = `refresh-token=; expires=${expiredAt}; Max-Age=0; path=/;${domainPart} SameSite=None; Secure`
  })
}

// 토큰 갱신 (헤더에서 토큰 받기)
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL}/v1/reissue`, {
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
  // 서버 로그아웃 API가 안정화되기 전까지는 네트워크 호출 없이 클라이언트 상태만 정리한다.
  removeRefreshTokenCookie()
}
