import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[64px]">
      <Image src="/images/Logo.png" alt="방탈소년단" width={190} height={166} priority />
      <div className="flex flex-col gap-[24px]">
        <span>소셜 로그인으로 간편하게 시작해보세요.</span>
        <div></div>
      </div>
    </div>
  )
}
