import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

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
    <html lang="en" className={`h-full ${pretendard.className}`}>
      <body className={`flex h-full justify-center text-black`}>
        <div className="h-full w-full max-w-[600px] bg-[#fff]">{children}</div>
      </body>
    </html>
  )
}
