import SButton from '@/components/button/SButton'
import Image from 'next/image'
import Link from 'next/link'

export default function IntroPage() {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center gap-[108px] overflow-hidden px-[16px] pt-[148px]">
      <div className="absolute inset-0">
        <Image
          src="/images/full-page-keyhole.png"
          alt="키홀 배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="z-10 flex justify-center">
        <Image
          src="/images/Logo.png"
          alt="방탈소년단 로고"
          width={160} // 필요 시 크기 조절
          height={160}
          priority
        />
      </div>

      <div className="z-10 w-full max-w-[600px] px-[16px] text-center text-20 font-semibold">
        <h1>환영합니다!</h1>
        <h1 className="mt-[16px]">방탈소년단과 함께</h1>
        <h1>새로운 방의 문을 열어봐요!</h1>
      </div>
      <div className="fixed bottom-[24px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[16px] px-[16px]">
        <SButton as={Link} href="/theme">
          입장
        </SButton>
      </div>
    </div>
  )
}
