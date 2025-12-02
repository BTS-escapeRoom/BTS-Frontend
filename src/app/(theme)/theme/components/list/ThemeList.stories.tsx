import type { Meta, StoryObj } from '@storybook/react'
import ThemeList from './ThemeList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'

// ===== Mock 데이터 생성 =====
const makeItem = (i: number) => ({
  id: String(i),
  thumbnail: i % 3 === 0 ? '' : `https://picsum.photos/200/300?random=${i}`,
  title: `테마 ${i} - 아주 길 수도 있는 제목 테스트`,
  time: 60,
  difficulty: (i % 5) + 1,
  genre: ['공포', '드라마', '판타지', 'SF', '코믹'][i % 5],
  store: `스토어 ${i % 7}`,
  district: ['강남', '홍대', '건대', '수원', '부산'][i % 5],
})

const mockPage = (page: number) => {
  const start = (page - 1) * 10 + 1
  const themes = Array.from({ length: 10 }, (_, idx) => makeItem(start + idx))
  const totalPage = 5
  const nextPage = page < totalPage ? page + 1 : -1
  return { code: 'OK', message: 'success', data: { themes, nextPage, totalPage } }
}

// ===== Fetch 목킹 =====
const originalFetch = globalThis.fetch

function installFetchMock() {
  // @ts-ignore
  globalThis.fetch = async (input: RequestInfo, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.url
    if (url.includes('/v1/themes')) {
      const u = new URL(url, 'http://localhost')
      const page = Number(u.searchParams.get('page') || '1')
      return new Response(JSON.stringify(mockPage(page)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return originalFetch(input as any, init)
  }
}
function uninstallFetchMock() {
  // @ts-ignore
  globalThis.fetch = originalFetch
}

// ===== React Query Client =====
const qc = new QueryClient()

// ===== Storybook Meta =====
const meta: Meta<typeof ThemeList> = {
  title: 'Theme/ThemeList',
  component: ThemeList,
  decorators: [
    (Story) => {
      React.useEffect(() => {
        installFetchMock()
        return () => uninstallFetchMock()
      }, [])
      return (
        <QueryClientProvider client={qc}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof ThemeList>

// ===== Stories =====
export const Default: Story = {
  args: {
    params: {
      keyword: '',
      sort: 'recent',
    },
  },
}

export const DistanceSortWithCoords: Story = {
  args: {
    params: {
      sort: 'distance',
      latitude: 37.5665,
      longitude: 126.978,
    },
  },
}
