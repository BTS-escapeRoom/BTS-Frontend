'use client'

import { useHeader } from '@/contexts/HeaderContext'
import SHeader from './SHeader'
import { usePathname } from 'next/navigation'

interface HeaderConfig {
  showHeader?: boolean
  title?: string
  showBack?: boolean
  showClose?: boolean
  onBack?: () => void
  onClose?: () => void
}

export default function HeaderWrapper() {
  const pathname = usePathname()

  const getHeaderConfig = () => {
    switch (pathname) {
      case '/login':
        return { showClose: true }
    }
    return {
      showHeader: false,
    }
  }

  const headerConfig: HeaderConfig = getHeaderConfig()

  return (
    <>
      {headerConfig.showHeader && (
        <SHeader
          title={headerConfig.title}
          showBack={headerConfig.showBack}
          showClose={headerConfig.showClose}
          onBack={headerConfig.onBack}
          onClose={headerConfig.onClose}
        />
      )}
    </>
  )
}
