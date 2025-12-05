// components/navigation/BottomNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeFilled from './icons/ThemeFilled'
import ThemeOutline from './icons/ThemeOutline'
import CommunityFilled from './icons/CommunityFilled'
import CommunityOutline from './icons/CommunityOutline'
import MyFilled from './icons/MyFilled'
import MyOutline from './icons/MyOutline'

const tabs = [
  {
    href: '/theme',
    label: '테마',
    FilledIcon: ThemeFilled,
    OutlineIcon: ThemeOutline,
  },
  {
    href: '/board',
    label: '커뮤니티',
    FilledIcon: CommunityFilled,
    OutlineIcon: CommunityOutline,
  },
  {
    href: '/my',
    label: '나의 탈출',
    FilledIcon: MyFilled,
    OutlineIcon: MyOutline,
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-1/2 flex h-[56px] w-full max-w-[600px] -translate-x-1/2 items-center justify-around border-t border-gray-200 bg-white"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + '/')
        const IconComponent = active ? tab.FilledIcon : tab.OutlineIcon

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center justify-center transition-colors"
            aria-current={active ? 'page' : undefined}
          >
            <IconComponent width={24} height={24} />
            <span
              className={`text-[10px] font-medium ${active ? 'text-[#151515]' : 'text-[#757575]'}`}
            >
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
