'use client'

import { usePathname } from 'next/navigation'
import BottomNav from './BottomNav'

// 숨길 경로 패턴들
const HIDE_PATTERNS = [
  /^\/login$/,
  /^\/signup$/,
  /^\/intro$/,
  /^\/theme\/[^/]+\/edit/, // /theme/:id/play
]

export default function BottomNavController() {
  const pathname = usePathname()
  const shouldHide = HIDE_PATTERNS.some((re) => re.test(pathname))
  if (shouldHide) return null
  return <BottomNav />
}
