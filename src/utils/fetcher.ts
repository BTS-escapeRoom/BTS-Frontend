const BASE_URL = 'https://apis.bangtal-boys.com'

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      ...options?.headers,
    },
    credentials: 'include', // 쿠키에서 refresh token 사용
  })

  // 토큰 만료 시
  if (res.status === 401) {
    // accessToken 갱신 시도
    const newToken = await refreshAccessToken()
    if (!newToken) throw new Error('로그인이 필요합니다.')

    // 재시도
    const retryRes = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: newToken,
        ...options?.headers,
      },
      credentials: 'include',
    })

    if (!retryRes.ok) {
      throw new Error('API 요청 실패')
    }

    return retryRes.json()
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || 'API 요청 실패')
  }

  return res.json()
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_URL}/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!res.ok) return null

    const data = await res.json()
    const newToken = data?.data?.accessToken
    if (newToken) {
      localStorage.setItem('accessToken', newToken)
      return newToken
    }
    return null
  } catch {
    return null
  }
}
