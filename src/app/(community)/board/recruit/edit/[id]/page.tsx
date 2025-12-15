'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import SHeader from '@/components/header/SHeader'
import { useToast } from '@/hooks/useToast'
import { getBoardDetail } from '@/features/board/api/getBoardDetail'
import type { BoardDetail } from '@/features/board/types/model'
import RecruitForm from '../../write/components/RecruitForm'

export default function RecruitEditPage() {
  const params = useParams()
  const boardId = Number(params?.id)
  const { showToast } = useToast()
  const [board, setBoard] = useState<BoardDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setIsLoading(true)
        const data = await getBoardDetail(boardId)
        setBoard(data)
      } catch (error) {
        console.error('모집글 조회 실패:', error)
        showToast('모집글을 불러오지 못했습니다.', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    if (boardId) {
      fetchBoard()
    }
  }, [boardId, showToast])

  if (isLoading) {
    return (
      <>
        <SHeader title="모집글 수정" showBack />
        <div className="flex items-center justify-center py-[40px]">
          <div className="text-14 text-gray05">로딩 중...</div>
        </div>
      </>
    )
  }

  if (!board) {
    return (
      <>
        <SHeader title="모집글 수정" showBack />
        <div className="flex items-center justify-center py-[40px]">
          <div className="text-14 text-red-500">모집글을 불러오지 못했습니다.</div>
        </div>
      </>
    )
  }

  // TODO: RecruitForm에 initialData props를 추가해서 board 데이터를 연결할 수 있음
  return (
    <>
      <SHeader title="모집글 수정" showBack />
      <RecruitForm mode="edit" boardId={board.id} />
    </>
  )
}
