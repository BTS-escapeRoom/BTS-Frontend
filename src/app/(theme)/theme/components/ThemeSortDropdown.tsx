'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import IconDropdown from '@/components/icons/Dropdown'

type SortOption = 'distance' | 'popular' | 'recent'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'distance', label: '거리순' },
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
]

export default function ThemeSortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // URL에서 현재 정렬 옵션 가져오기 (기본값: distance)
  const currentSort = (searchParams.get('sort') as SortOption) || 'distance'
  const currentLabel = sortOptions.find((option) => option.value === currentSort)?.label || '거리순'

  const handleSortChange = (sortValue: SortOption) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortValue)
    params.delete('page') // 페이지를 1로 리셋

    router.push(`/theme?${params.toString()}`)
    setIsOpen(false)
  }

  return (
    <div className="relative flex justify-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-0 text-12 font-bold text-[#5d5d5d]"
        aria-label="정렬 옵션 선택"
      >
        <span>{currentLabel}</span>
        <IconDropdown width={16} height={16} />
      </button>

      {/* 임시 목록 모달 */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[120px] rounded-md border border-gray-200 bg-white shadow-lg">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`w-full px-3 py-2 text-left text-12 first:rounded-t-md last:rounded-b-md hover:bg-gray-50 ${
                currentSort === option.value ? 'bg-gray-100 font-bold' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
