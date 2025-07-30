import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ToastProvider } from '@/components/toast/ToastProvider'

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
  return (
    <html lang="en" className={`${pretendard.className} `}>
      <body className="bg-gray02">
        <div className="z-0 mx-auto min-h-screen w-full max-w-[600px] bg-[#fff] text-black">
          <ToastProvider>
            <main className="flex min-h-screen w-full flex-col">{children}</main>
          </ToastProvider>
        </div>
      </body>
    </html>
  )
}
