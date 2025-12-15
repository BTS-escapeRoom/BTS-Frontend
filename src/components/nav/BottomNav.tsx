// components/navigation/BottomNav.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import ThemeFilled from './icons/ThemeFilled'
import ThemeOutline from './icons/ThemeOutline'
import CommunityFilled from './icons/CommunityFilled'
import CommunityOutline from './icons/CommunityOutline'
import MyFilled from './icons/MyFilled'
import MyOutline from './icons/MyOutline'
import { useAuth } from '@/hooks/useAuth'
import { useModalStore } from '@/store/modalStore'
import ConfirmModalContent from '@/components/modal/ConfirmModalContent'

const tabs = [
  {
    href: '/theme',
    label: '테마',
    FilledIcon: ThemeFilled,
    OutlineIcon: ThemeOutline,
    requireAuth: false,
  },
  {
    href: '/board',
    label: '커뮤니티',
    FilledIcon: CommunityFilled,
    OutlineIcon: CommunityOutline,
    requireAuth: true,
  },
  {
    href: '/my',
    label: '나의 탈출',
    FilledIcon: MyFilled,
    OutlineIcon: MyOutline,
    requireAuth: true,
  },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { openModal } = useModalStore()

  const handleTabClick = (href: string, requireAuth: boolean) => {
    if (requireAuth && !isAuthenticated) {
      openModal(
        <ConfirmModalContent
          title="로그인이 필요해요 🚪"
          message={'이 공간은 로그인 후 입장할 수 있어요.\n지금 로그인하고 함께 둘러볼까요? 🔑'}
          onConfirm={() => {
            router.push('/login')
          }}
          confirmText="로그인 하러 가기"
          cancelText="닫기"
        />,
        {
          title: '로그인이 필요해요 🚪',
        },
      )
      return
    }

    router.push(href)
  }

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-10 flex h-[56px] w-full max-w-[600px] -translate-x-1/2 items-center justify-around border-t border-gray-200 bg-white"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + '/')
        const IconComponent = active ? tab.FilledIcon : tab.OutlineIcon

        return (
          <button
            key={tab.href}
            type="button"
            onClick={() => handleTabClick(tab.href, tab.requireAuth)}
            className="flex flex-col items-center justify-center transition-colors"
            aria-current={active ? 'page' : undefined}
          >
            <IconComponent width={24} height={24} />
            <span
              className={`text-[10px] font-medium ${active ? 'text-[#151515]' : 'text-[#757575]'}`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
