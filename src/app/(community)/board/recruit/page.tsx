'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchInput from '@/components/input/SearchInput'
import SCheckboxWithLabel from '@/components/checkbox/SCheckboxWithLabel'
import RecruitSortDropdown from './components/list/RecruitSortDropdown'
import RecruitBoardList from './components/list/RecruitBoardList'
import QueryProvider from '@/app/(theme)/theme/components/QueryProvider'
import type { BoardQueryParams } from '@/features/board/api/getBoards.types'

function RecruitBoardContent() {
  const [isAtTop, setIsAtTop] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsAtTop(scrollTop === 0)
    }

    // 초기 상태 확인
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // URL 파라미터에서 필터 값 가져오기
  const keyword = searchParams.get('keyword') || undefined
  const sort = searchParams.get('sort') || 'latest'
  const isRecruiting = searchParams.get('isRecruiting') === 'true'

  // API 호출 파라미터 구성
  const boardParams = useMemo<Omit<BoardQueryParams, 'page'>>(() => {
    return {
      keyword,
      type: 'recruit',
      sortType: (sort as BoardQueryParams['sortType']) || 'latest',
      ...(isRecruiting && { isRecruiting: true }),
    }
  }, [keyword, sort, isRecruiting])

  const handleIsRecruitingChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    if (checked) {
      params.set('isRecruiting', 'true')
    } else {
      params.delete('isRecruiting')
    }
    params.delete('page') // 페이지를 1로 리셋
    router.push(`/board/recruit?${params.toString()}`)
  }

  const handleBoardClick = (boardId: number) => {
    router.push(`/board/recruit/${boardId}`)
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={`${isAtTop ? 'relative' : 'sticky top-0 z-10'} border-b border-[#F6F6F6] bg-white`}
      >
        <div className="px-[16px] pb-[10px] pt-[16px]">
          <SearchInput placeholder="게시글 제목 또는 내용 검색" basePath="/board/recruit" />
        </div>
        {/* 탭 영역 */}
        <div className="flex h-[36px] items-center justify-center border-b border-gray05 bg-white">
          <div className="text-14 font-bold text-gray06">모집 게시판</div>
        </div>
        {/* 필터 영역 */}
        <div className="flex items-center justify-between px-4 py-3">
          <SCheckboxWithLabel
            label="모집중인 글만 보기"
            checked={isRecruiting}
            onChange={handleIsRecruitingChange}
            labelClassName="text-14"
            color="#424242"
          />
          <RecruitSortDropdown />
        </div>
      </div>
      <RecruitBoardList params={boardParams} onItemClick={handleBoardClick} />
    </div>
  )
}

export default function RecruitBoardPage() {
  return (
    <QueryProvider>
      <Suspense fallback={<div className="flex h-full w-full flex-col">로딩 중...</div>}>
        <RecruitBoardContent />
      </Suspense>
    </QueryProvider>
  )
}
