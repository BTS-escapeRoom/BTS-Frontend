import { BASE_URL } from '@/utils/fetcher'

export interface RefreshTokenResponse {
  accessToken: string
}

export interface LogoutResponse {
  message: string
}

/**
 * document.cookie 로 만료시키는 방식은 HttpOnly 쿠키에는 적용되지 않습니다.
 * HttpOnly+Secure+SameSite=None 인 refresh-token 은 반드시 API 응답의 Set-Cookie(동일 path/domain 등)로 서버가 지워야 합니다.
 * 이 함수는 Non-HttpOnly(로컬 스텁 등) 대비용입니다.
 */
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

    // apex(bangtal-boys.com)에서는 위 분기로 `.bangtal-boys.com`이 빠짐. 서버가 Domain=.bangtal-boys.com 으로 준 refresh-token 제거
    if (hostname === 'bangtal-boys.com' || hostname.endsWith('.bangtal-boys.com')) {
      domains.add('.bangtal-boys.com')
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
  // HttpOnly refresh-token 은 아래로 지울 수 없음 → 백엔드 로그아웃(또는 세션 무효화) API에서 Set-Cookie 로 만료 필요
  removeRefreshTokenCookie()
}
