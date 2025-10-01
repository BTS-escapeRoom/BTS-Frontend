'use client'

import { useState, useEffect } from 'react'
import IconChevronUp from '@/components/icons/ChevronUp'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // 스크롤 위치 감지
  useEffect(() => {
    const toggleVisibility = () => {
      // 스크롤이 100px 이상일 때만 버튼 표시
      if (window.pageYOffset > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // 최상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[72px] right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#f2f2f2] bg-white/80 shadow-sm transition-all duration-200 hover:bg-white/90"
      aria-label="맨 위로 이동"
    >
      <IconChevronUp width={22} height={22} fill="#414141" />
    </button>
  )
}
