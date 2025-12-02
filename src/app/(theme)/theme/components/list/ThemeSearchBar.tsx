'use client'

import { useState, useEffect } from 'react'
import SearchInput from '@/components/input/SearchInput'

export default function ThemeSearchBar() {
  const [isAtTop, setIsAtTop] = useState(true)

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

  return (
    <div
      className={`border-b border-[#F6F6F6] bg-white px-[16px] pb-[10px] pt-[16px] ${
        isAtTop ? 'relative' : 'sticky top-0 z-10'
      }`}
    >
      <SearchInput placeholder="원하는 테마 또는 업체명 검색" />
    </div>
  )
}
