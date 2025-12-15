'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IconKebabVertical } from '@/components/icons'
import SChip from '@/components/chip/SChip'
import { getBoardComments } from '@/features/board/api/getBoardComments'
import type { BoardCommentApiItem } from '@/features/board/api/getBoardComments.types'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useToast } from '@/hooks/useToast'
import { useModalStore } from '@/store/modalStore'
import MoreMenuButton from '@/components/button/MoreMenuButton'
import CommentReportModalContent from '@/components/report/CommentReportModalContent'
import { createComment } from '@/features/board/api/createComment'
import { updateComment } from '@/features/board/api/updateComment'
import { deleteComment } from '@/features/board/api/deleteComment'

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

type CommentMorePopupProps = {
  isMyComment: boolean
  comment: BoardCommentApiItem
  onEdit: (comment: BoardCommentApiItem) => void
  onDelete: (comment: BoardCommentApiItem) => void
}

function CommentMorePopup({ isMyComment, comment, onEdit, onDelete }: CommentMorePopupProps) {
  const handleClickCloseSheet = () => {
    useModalStore.setState({ isOpen: false })
  }

  const handleClickEdit = () => {
    onEdit(comment)
    handleClickCloseSheet()
  }

  const handleClickDelete = () => {
    onDelete(comment)
  }

  const handleClickReport = () => {
    useModalStore.setState({
      isOpen: true,
      props: {
        title: '신고',
      },
      view: <CommentReportModalContent commentId={comment.id} />,
    })
  }

  if (isMyComment) {
    return (
      <div className="flex flex-col gap-[8px] text-[14px]">
        <MoreMenuButton
          list={[
            { text: '수정', onClick: handleClickEdit },
            { text: '삭제', onClick: handleClickDelete, className: 'text-[#EF4156]' },
          ]}
        />
        <MoreMenuButton list={[{ text: '닫기', onClick: handleClickCloseSheet }]} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[6px] text-[14px]">
      <MoreMenuButton
        list={[{ text: '신고', onClick: handleClickReport, className: 'text-[#EF4156]' }]}
      />
      <MoreMenuButton list={[{ text: '닫기', onClick: handleClickCloseSheet }]} />
    </div>
  )
}

type CommentItemProps = {
  comment: BoardCommentApiItem
  currentMemberId: number | null
  onEdit: (comment: BoardCommentApiItem) => void
  onDelete: (comment: BoardCommentApiItem) => void
}

function CommentItem({ comment, currentMemberId, onEdit, onDelete }: CommentItemProps) {
  const isAuthor = currentMemberId !== null && comment.memberId === currentMemberId
  const showMoreButton = !comment.isDeleted && !comment.isReported

  const handleClickMore = () => {
    useModalStore.setState({
      isOpen: true,
      props: {
        closeOnOverlayClick: true,
        hideCloseButton: true,
        className: 'mx-[8px] mb-[12px]',
        variant: 'bottomSheet',
      },
      view: (
        <CommentMorePopup
          isMyComment={isAuthor}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    })
  }

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
              <span className="text-[11px] text-gray05">{comment.memberName}</span>
              {isAuthor && (
                <SChip text="작성자" bgColor="white" textColor="gray05" borderColor="gray04" />
              )}
            </div>
            <span className="text-[11px] text-gray04">{formatDateTime(comment.createdAt)}</span>
          </div>
        </div>

        {/* 댓글 내용 */}
        <div className="ml-[44px]">
          {comment.isDeleted ? (
            <span className="text-14 text-gray04">삭제 되었거나 존재하지 않는 댓글입니다.</span>
          ) : comment.isReported ? (
            <span className="text-14 text-gray04">신고에 의해 숨김 처리 되었습니다.</span>
          ) : (
            <span className="text-14 text-gray06">{comment.comment}</span>
          )}
        </div>
      </div>

      {/* 우측: 더보기 버튼 (16px 영역 유지) */}
      <div className="h-4 w-4 shrink-0">
        {showMoreButton && (
          <button
            type="button"
            className="flex h-4 w-4 items-center justify-center"
            onClick={handleClickMore}
          >
            <IconKebabVertical fill="#757575" width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function RecruitBoardComments({ boardId }: RecruitBoardCommentsProps) {
  const [comments, setComments] = useState<BoardCommentApiItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingComment, setEditingComment] = useState<BoardCommentApiItem | null>(null)
  const memberInfo = useAuthStore((state) => state.memberInfo)
  const currentMemberId = memberInfo?.id ?? null
  const { showToast } = useToast()

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

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId])

  const handleSubmit = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed) {
      showToast('댓글을 입력해 주세요.', 'warning')
      return
    }
    if (!memberInfo) {
      showToast('로그인 후 댓글을 작성할 수 있어요.', 'warning')
      return
    }

    try {
      setIsSubmitting(true)

      if (editingComment) {
        await updateComment({ commentId: editingComment.id, comment: trimmed })
        showToast('댓글이 수정되었습니다.', 'success')
        setEditingComment(null)
      } else {
        await createComment({ boardId, comment: trimmed })
        showToast('댓글이 등록되었습니다.', 'success')
      }

      setInputValue('')
      await fetchComments()
    } catch (error) {
      showToast('댓글 처리 중 오류가 발생했습니다.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (comment: BoardCommentApiItem) => {
    setEditingComment(comment)
    setInputValue(comment.comment)
  }

  const handleDelete = async (comment: BoardCommentApiItem) => {
    try {
      await deleteComment({ commentId: comment.id })
      useModalStore.setState({ isOpen: false })
      showToast('댓글이 삭제되었습니다.', 'success')
      await fetchComments()
    } catch (error) {
      showToast('댓글 삭제 중 오류가 발생했습니다.', 'error')
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing && !isSubmitting) {
      event.preventDefault()
      handleSubmit()
    }
  }
  return (
    <>
      <div className="border-t border-gray03 px-4 py-6 pb-[52px]">
        {/* 댓글 목록 영역 */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-14 text-gray04">
            로딩 중...
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-14 text-gray04">댓글이 없습니다.</div>
            <div className="mt-1 text-14 text-gray04">가장 먼저 댓글을 남겨보세요</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentMemberId={currentMemberId}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* 모집글 하단 댓글 입력 바 (BottomNav 위 고정) */}
      <div className="fixed bottom-[56px] left-1/2 z-10 flex h-[52px] w-full max-w-[600px] -translate-x-1/2 items-center border-t border-gray02 bg-gray01 px-4">
        <input
          type="text"
          placeholder={
            editingComment ? '댓글을 수정해 주세요 (Enter 키로 저장)' : '댓글을 입력해 주세요'
          }
          className="h-9 w-full rounded-[20px] border border-gray03 bg-white px-4 text-14 text-gray07 outline-none placeholder:text-gray04"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
        />
      </div>
    </>
  )
}
