'use client'

import { useRouter } from 'next/navigation'

type EmptySearchResultProps = {
  keyword?: string
  className?: string
}

export default function EmptySearchResult({ keyword, className = '' }: EmptySearchResultProps) {
  const router = useRouter()

  return (
    <div className={`flex min-h-[60vh] flex-col items-center justify-center px-8 ${className}`}>
      {keyword ? (
        <p className="mb-6 whitespace-pre-line text-center text-16 text-gray05">
          <span className="font-semibold">&apos;{keyword}&apos;</span> 에 대한
          <br />
          검색 결과가 없습니다
        </p>
      ) : (
        <p className="mb-6 whitespace-pre-line text-center text-16 text-gray05">
          게시글이 없습니다.
        </p>
      )}
      <button
        onClick={() => router.back()}
        className="cursor-pointer text-center text-16 text-gray04 underline"
      >
        이전 화면으로 돌아가기
      </button>
    </div>
  )
}
