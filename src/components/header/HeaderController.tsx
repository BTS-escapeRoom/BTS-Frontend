'use client'

import SHeader from './SHeader'
import { usePathname, useRouter } from 'next/navigation'

interface HeaderConfig {
  showHeader?: boolean
  title?: string
  showBack?: boolean
  showClose?: boolean
  onBack?: () => void
  onClose?: () => void
}

export default function HeaderController() {
  const pathname = usePathname()
  const router = useRouter()

  const getHeaderConfig = () => {
    const headerConfig = {
      showHeader: true,
    }
    switch (pathname) {
      case '/login':
        return { ...headerConfig, showClose: true }
      case '/signup':
        const onBack = () => {
          router.replace('/login')
        }
        return { ...headerConfig, showBack: true, title: '닉네임 설정', onBack }
    }
    return {
      ...headerConfig,
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
