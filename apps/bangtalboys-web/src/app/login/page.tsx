import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[32px]">
      <Image src="/images/logo-big.png" alt="bangtalboy logo" width="120" height="120" />
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <span className="text-[14px] text-[#787878]">소셜 로그인으로 간편하게 시작해보세요.</span>
        <div className="flex flex-col gap-[8px] text-[16px] text-[#101010]">
          <div className="flex h-[42px] w-[264px] flex-row items-center justify-center gap-[24px] rounded bg-[#FEE500]">
            <Image src="/kakao.svg" alt="kakao logo" width="24" height="24" />
            <div>카카오 로그인</div>
          </div>
          <div className="flex h-[42px] w-[264px] flex-row items-center justify-center gap-[24px] rounded border-[1px] border-solid border-[#E6E6EA] bg-[#fff]">
            <Image src="/naver.svg" alt="naver logo" width="24" height="24" />
            <div>네이버 로그인</div>
          </div>
          <div className="h-[42px] w-[264px] rounded bg-[#050708]"></div>
        </div>
      </div>
    </div>
  )
}
