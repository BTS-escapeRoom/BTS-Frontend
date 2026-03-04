'use client'

import SHeader from '@/components/header/SHeader'

const TERMS_SECTIONS = [
  {
    title: '제1조 (목적)',
    body: '본 약관은 방탈소년단 서비스 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
  },
  {
    title: '제2조 (서비스 이용)',
    body: '회원은 본 서비스에서 제공하는 테마 정보, 리뷰 작성, 커뮤니티 기능을 이용할 수 있으며, 관련 법령 및 본 약관을 준수해야 합니다.',
  },
  {
    title: '제3조 (회원의 의무)',
    body: '회원은 타인의 권리를 침해하거나 공공질서를 해치는 행위를 해서는 안 되며, 허위 정보 작성, 도배, 욕설 및 비방 행위를 금지합니다.',
  },
  {
    title: '제4조 (게시물 관리)',
    body: '서비스 운영 정책에 위반되는 게시물은 사전 통지 없이 수정, 숨김 또는 삭제될 수 있습니다.',
  },
  {
    title: '제5조 (서비스 변경 및 중단)',
    body: '회사는 운영상 필요에 따라 서비스의 일부 또는 전부를 변경하거나 중단할 수 있으며, 중요한 변경 시 사전 공지합니다.',
  },
]

export default function TermsPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <SHeader title="설정" showBack />

      <div className="flex-1 overflow-y-auto px-[16px] pb-[24px] pt-[16px]">
        <h2 className="text-16 font-bold text-gray07">이용 약관</h2>
        <p className="mt-[6px] text-[11px] text-gray05">최종 업데이트: 2026.03.04</p>

        <div className="mt-[16px] space-y-[16px]">
          {TERMS_SECTIONS.map((section) => (
            <section
              key={section.title}
              className="rounded-[8px] border border-gray02 bg-white p-[12px]"
            >
              <h3 className="text-14 font-semibold text-gray07">{section.title}</h3>
              <p className="mt-[8px] whitespace-pre-line text-14 leading-[1.5] text-gray06">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
