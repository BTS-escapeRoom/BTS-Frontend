// components/navigation/BottomNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/theme', label: '테마' },
  { href: '/community', label: '커뮤니티' },
  { href: '/my', label: '마이페이지' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="flex h-[56px] w-full items-center justify-around border-t border-gray-200 bg-white"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + '/')
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              'rounded-md px-3 py-2 text-12 transition-colors',
              active ? 'font-semibold text-black' : 'text-gray-500',
            ].join(' ')}
            aria-current={active ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
