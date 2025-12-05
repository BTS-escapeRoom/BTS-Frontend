'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { ApiError } from '@/utils/api'

export default function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // 화면 포커스 시 자동 재호출 비활성화
            staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 간주
            gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
            retry: (failureCount, error) => {
              // 401 에러(인증 실패)일 경우 재시도하지 않음
              if (error instanceof ApiError && error.status === 401) {
                return false
              }
              // 그 외의 경우 기본 재시도 (최대 3번)
              return failureCount < 3
            },
          },
        },
      }),
  )
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
