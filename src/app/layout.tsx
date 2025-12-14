import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import BottomNavController from '@/components/nav/BottomNavController'
import { GlobalModal } from '@/components/modal'
import GlobalToast from '@/components/toast/GlobalToast'
import AuthProvider from '@/components/auth/AuthProvider'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '방탈소년단',
  description: 'hello bangtal boys!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // toast가 모든 레이어들 중 최상단에 위치하도록
  return (
    <html lang="en" className={`${pretendard.className} `}>
      <body className="bg-gray02">
        <AuthProvider>
          <div className="z-0 mx-auto min-h-screen w-full min-w-[320px] max-w-[600px] bg-[#fff] text-black">
            <div className="flex min-h-screen flex-col pb-[56px]">
              <main className="flex w-full flex-1 flex-col">{children}</main>
              <BottomNavController />
            </div>
            <GlobalModal />
            <GlobalToast />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
