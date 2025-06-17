'use client'

import { useRouter } from 'next/navigation'
import { IconBack, IconClose } from '@/components/icons'

interface SHeaderProps {
  title?: string
  showBack?: boolean
  showClose?: boolean
  onBack?: () => void
  onClose?: () => void
}

export default function SHeader({ title, showBack, showClose, onBack, onClose }: SHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 flex h-[52px] items-center justify-center bg-white px-4">
      {showBack && (
        <button
          onClick={onBack ?? (() => router.back())}
          className="absolute left-4 flex h-9 w-9 items-center justify-center"
        >
          <IconBack />
        </button>
      )}

      {title && <h1 className="max-w-[70%] truncate text-center">{title}</h1>}

      {showClose && (
        <button
          onClick={onClose ?? (() => router.push('/'))}
          className="absolute right-4 flex h-9 w-9 items-center justify-center"
        >
          <IconClose />
        </button>
      )}
    </header>
  )
}
