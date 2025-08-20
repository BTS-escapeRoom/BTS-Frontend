// fetcher.ts
const BASE_URL = 'https://apis.bangtal-boys.com'

// --- 단일 갱신 & 대기열 상태 ---
let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null
let waiters: Array<(token: string | null) => void> = []

const notifyWaiters = (token: string | null) => {
  waiters.forEach((resolve) => {
    try {
      resolve(token)
    } catch {}
  })
  waiters = []
}

const waitForToken = () => new Promise<string | null>((resolve) => waiters.push(resolve))

const isRefreshUrl = (url: string) => url.replace(/\s+/g, '') === '/reissue'

const getStoredToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

// 공통 fetch 래퍼
const doFetch = async (url: string, options?: RequestInit, token?: string) => {
  const headers = new Headers(options?.headers || {})
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  const bearer = token ?? getStoredToken()
  if (bearer) headers.set('Authorization', `Bearer ${bearer}`)

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include', // refresh token은 쿠키
  })
  return res
}

// 빈/비JSON 응답 안전 파서
const safeJson = async <T>(res: Response): Promise<T | null> => {
  const text = await res.text().catch(() => '')
  if (!text) return null
  try {
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

// 헤더에서 토큰 뽑아 로컬스토리지에 저장
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${BASE_URL}/reissue`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!res.ok) return null

    const raw = res.headers.get('Access-Token') // e.g. "Bearer x.y.z" 또는 "x.y.z"
    const newToken = raw?.startsWith('Bearer ') ? raw.slice(7) : raw

    if (newToken && typeof window !== 'undefined') {
      localStorage.setItem('accessToken', newToken)
    }
    return newToken ?? null
  } catch {
    return null
  }
}

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  // 1차 요청
  let res = await doFetch(url, options)

  if (res.ok) {
    return (await safeJson<T>(res)) as T
  }
  if (res.status !== 401) {
    const body = await safeJson<any>(res)
    throw new Error(body?.message || `API 요청 실패 (${res.status})`)
  }

  // ----- 401 처리 -----
  if (isRefreshUrl(url)) {
    throw new Error('로그인이 필요합니다.')
  }

  // 기존에 누군가 갱신 중이면 대기 → 토큰 수령 후 재시도
  if (isRefreshing && refreshPromise) {
    const newToken = await waitForToken()
    if (!newToken) throw new Error('로그인이 필요합니다.')
    const retry = await doFetch(url, options, newToken)
    if (!retry.ok) {
      const body = await safeJson<any>(retry)
      throw new Error(body?.message || `API 요청 실패 (${retry.status})`)
    }
    return (await safeJson<T>(retry)) as T
  }

  // 내가 갱신 시작
  isRefreshing = true
  refreshPromise = refreshAccessToken()

  try {
    const newToken = await refreshPromise
    notifyWaiters(newToken)

    if (!newToken) throw new Error('로그인이 필요합니다.')

    const retry = await doFetch(url, options, newToken)
    if (!retry.ok) {
      const body = await safeJson<any>(retry)
      throw new Error(body?.message || `API 요청 실패 (${retry.status})`)
    }
    return (await safeJson<T>(retry)) as T
  } finally {
    isRefreshing = false
    refreshPromise = null
  }
}
