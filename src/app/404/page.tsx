import Image from 'next/image'
import SButton from '@/components/button/SButton'
import Link from 'next/link'

export default function NotFound404() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute mx-auto min-h-screen w-full max-w-[600px]">
        <Image
          src="/images/full-page-keyhole.png"
          alt="404 background"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10 text-center text-gray07">
        <h1 className="text-[64px] font-bold leading-none text-gray05">404</h1>
        <p className="mt-2 text-[24px] font-semibold">여긴 막다른 길이에요 🚪</p>
        <SButton as={Link} href="/theme" className="mt-[16px] bg-gray07">
          홈으로 탈출하기
        </SButton>
      </div>
    </div>
  )
}
