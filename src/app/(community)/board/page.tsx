import { redirect } from 'next/navigation'

export default function BoardPage() {
  // MVP 버전: 모집 게시판으로 리다이렉트
  // 추후 자유 게시판과 모집 게시판을 선택할 수 있는 페이지로 확장 예정
  redirect('/board/recruit')
}

