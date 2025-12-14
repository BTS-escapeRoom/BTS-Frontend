'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IconKebabVertical } from '@/components/icons'
import SChip from '@/components/chip/SChip'
import { getBoardComments } from '@/features/board/api/getBoardComments'
import type { BoardCommentApiItem } from '@/features/board/api/getBoardComments.types'
import { useAuthStore } from '@/features/auth/store/authStore'

type RecruitBoardCommentsProps = {
  boardId: number
  commentCount: number
}

// 날짜 포맷팅 (YYYY.MM.DD hh:mm 형식)
function formatDateTime(dateString: string) {
  try {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}.${month}.${day} ${hours}:${minutes}`
  } catch {
    return dateString
  }
}

function CommentItem({
  comment,
  currentMemberId,
}: {
  comment: BoardCommentApiItem
  currentMemberId: number | null
}) {
  const isAuthor = currentMemberId !== null && comment.memberId === currentMemberId
  const showMoreButton = !comment.isDeleted && !comment.isReported

  return (
    <div className="flex flex-row items-start gap-4">
      {/* 좌측: 프로필 사진 + 닉네임 + 작성일자 + 내용 */}
      <div className="flex-1">
        {/* 프로필 사진 + 닉네임 + 작성일자 */}
        <div className="flex flex-row items-center gap-2">
          {/* 프로필 사진 */}
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/images/default-profile.png"
              alt={comment.memberName}
              fill
              className="object-cover"
            />
          </div>

          {/* 닉네임 + 작성일자 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-11 text-gray05">{comment.memberName}</span>
              {isAuthor && (
                <SChip text="작성자" bgColor="white" textColor="gray05" borderColor="gray04" />
              )}
            </div>
            <span className="text-11 text-gray04">{formatDateTime(comment.createdAt)}</span>
          </div>
        </div>

        {/* 댓글 내용 */}
        <div className="ml-[44px] mt-2">
          {comment.isDeleted ? (
            <span className="text-11 text-gray04">삭제 되었거나 존재하지 않는 댓글입니다.</span>
          ) : comment.isReported ? (
            <span className="text-11 text-gray04">신고에 의해 숨김 처리 되었습니다.</span>
          ) : (
            <span className="text-11 text-gray06">{comment.comment}</span>
          )}
        </div>
      </div>

      {/* 우측: 더보기 버튼 (16px 영역 유지) */}
      <div className="h-4 w-4 shrink-0">
        {showMoreButton && (
          <button className="flex h-4 w-4 items-center justify-center">
            <IconKebabVertical fill="#757575" width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function RecruitBoardComments({ boardId, commentCount }: RecruitBoardCommentsProps) {
  const [comments, setComments] = useState<BoardCommentApiItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const user = useAuthStore((state) => state.user)
  const currentMemberId = user?.id ?? null

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        const data = await getBoardComments(boardId)
        setComments(data.comments)
      } catch (error) {
        console.error('댓글 조회 실패:', error)
        setComments([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [boardId])

  return (
    <div className="border-t border-gray03 px-4 py-6">
      {/* 댓글 목록 영역 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-14 text-gray04">로딩 중...</div>
      ) : comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="text-14 text-gray04">댓글이 없습니다.</div>
          <div className="mt-1 text-14 text-gray04">가장 먼저 댓글을 남겨보세요</div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} currentMemberId={currentMemberId} />
          ))}
        </div>
      )}
    </div>
  )
}
