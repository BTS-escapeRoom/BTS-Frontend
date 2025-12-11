'use client'

type RecruitBoardCommentsProps = {
  boardId: number
  commentCount: number
}

export default function RecruitBoardComments({ boardId, commentCount }: RecruitBoardCommentsProps) {
  // TODO: 댓글 API 연결 및 구현
  return (
    <div className="px-4 py-4">
      <div className="text-16 font-semibold text-gray07">댓글 {commentCount}</div>
      {/* 댓글 목록 영역 */}
      <div className="mt-4">
        {/* TODO: 댓글 목록 구현 */}
        <div className="flex items-center justify-center py-8 text-14 text-gray05">
          댓글이 없습니다.
        </div>
      </div>
    </div>
  )
}
