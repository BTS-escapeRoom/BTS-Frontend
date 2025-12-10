'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import IconDropdown from '@/components/icons/Dropdown'
import MoreMenuButton from '@/components/button/MoreMenuButton'
import { useModalStore } from '@/store/modalStore'

type SortOption = 'latest' | 'popular' | 'viewed' | 'old'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'viewed', label: '조회순' },
  { value: 'old', label: '오래된순' },
]

type SortPopupProps = {
  currentSort: SortOption
}

function SortPopup({ currentSort }: SortPopupProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (sortValue: SortOption) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortValue)
    params.delete('page') // 페이지를 1로 리셋

    router.push(`/board/recruit?${params.toString()}`)
    useModalStore.setState({ isOpen: false })
  }

  const menuItems = sortOptions.map((option) => ({
    text: option.label,
    onClick: () => handleSortChange(option.value),
    className: currentSort === option.value ? 'font-bold' : '',
  }))

  return (
    <div className="flex flex-col gap-[8px] text-[14px]">
      <MoreMenuButton list={menuItems} />
      <MoreMenuButton
        list={[{ text: '닫기', onClick: () => useModalStore.setState({ isOpen: false }) }]}
      />
    </div>
  )
}

export default function RecruitSortDropdown() {
  const searchParams = useSearchParams()

  // URL에서 현재 정렬 옵션 가져오기 (기본값: latest)
  const currentSort = (searchParams.get('sort') as SortOption) || 'latest'
  const currentLabel = sortOptions.find((option) => option.value === currentSort)?.label || '최신순'

  const handleClickMenu = () => {
    useModalStore.setState({
      isOpen: true,
      props: {
        closeOnOverlayClick: true,
        hideCloseButton: true,
        className: 'mx-[8px] mb-[12px]',
        variant: 'bottomSheet',
      },
      view: <SortPopup currentSort={currentSort} />,
    })
  }

  return (
    <div className="relative flex justify-end">
      <button
        onClick={handleClickMenu}
        className="flex items-center gap-0 text-12 font-bold text-[#5d5d5d]"
        aria-label="정렬 옵션 선택"
      >
        <span>{currentLabel}</span>
        <IconDropdown width={16} height={16} fill="#19FFEC" />
      </button>
    </div>
  )
}
