'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export default function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // 화면 포커스 시 자동 재호출 비활성화
            staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 간주
            gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
          },
        },
      }),
  )
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
