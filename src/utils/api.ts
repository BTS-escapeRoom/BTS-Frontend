import { BASE_URL } from './fetcher'

export interface ApiResponse<T> {
  data: T
  message?: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// 공통 fetch 래퍼 (auth store와 연동)
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`

  // 동적 import로 auth store 가져오기 (순환 참조 방지)
  const { useAuthStore } = await import('@/features/auth/store/authStore')
  const { accessToken, refreshToken } = useAuthStore.getState()

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
    credentials: 'include', // refresh token은 쿠키
    ...options,
  }

  const response = await fetch(url, defaultOptions)

  // 401 에러 시 토큰 갱신 시도
  if (response.status === 401 && endpoint !== '/reissue') {
    const refreshSuccess = await refreshToken()
    if (refreshSuccess) {
      // 갱신 성공 시 재시도
      const newToken = useAuthStore.getState().accessToken
      const retryOptions: RequestInit = {
        ...defaultOptions,
        headers: {
          ...defaultOptions.headers,
          Authorization: `Bearer ${newToken}`,
        },
      }

      const retryResponse = await fetch(url, retryOptions)
      if (!retryResponse.ok) {
        const errorData = await retryResponse.json().catch(() => null)
        throw new ApiError(
          errorData?.message ?? `HTTP ${retryResponse.status}`,
          retryResponse.status,
        )
      }
      return retryResponse.json()
    } else {
      // 갱신 실패 시 로그아웃 처리
      await useAuthStore.getState().logout()
      throw new ApiError('로그인이 필요합니다.', 401)
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new ApiError(errorData?.message ?? `HTTP ${response.status}`, response.status)
  }

  return response.json()
}

// GET 요청 헬퍼
export async function apiGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'GET',
    ...options,
  })
}

// POST 요청 헬퍼
export async function apiPost<T>(
  endpoint: string,
  data?: any,
  options: RequestInit = {},
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  })
}

// PUT 요청 헬퍼
export async function apiPut<T>(
  endpoint: string,
  data?: any,
  options: RequestInit = {},
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  })
}

// DELETE 요청 헬퍼
export async function apiDelete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
    ...options,
  })
}
