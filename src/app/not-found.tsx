import { redirect } from 'next/navigation'

export default function NotFound() {
  // 404 페이지로 리다이렉트
  redirect('/404')
}
