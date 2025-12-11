'use client'

import { IconHeart, IconComment, IconTimer, IconFire } from '@/components/icons'
import SChip from '@/components/chip/SChip'
import type { Board } from '@/features/board/types/model'

type RecruitBoardCardProps = {
  board: Board
  onClick?: (boardId: number) => void
  isLast?: boolean
}

export default function RecruitBoardCard({
  board,
  onClick,
  isLast = false,
}: RecruitBoardCardProps) {
  const {
    id,
    title,
    memberName,
    themeName,
    storeName,
    escapeDate,
    recruitDeadline,
    recruitPeople,
    hit,
    likeCount,
    commentCount,
    createdAt,
    isPopular,
  } = board

  const handleClick = () => {
    onClick?.(id)
  }

  // 날짜 포맷팅 (예: 2024-01-15 -> 1월 15일)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}월 ${day}일`
    } catch {
      return dateString
    }
  }

  // 탈출 일자 포맷팅 (YYYY년 MM월 DD일 오전/오후 hh시 mm분)
  const formatEscapeDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? '오후' : '오전'
      const displayHours = hours % 12 || 12
      const displayMinutes = minutes.toString().padStart(2, '0')
      return `${year}년 ${month}월 ${day}일 ${ampm} ${displayHours}시 ${displayMinutes}분`
    } catch {
      return dateString
    }
  }

  // 상대 시간 포맷팅 (예: 2시간 전, 3일 전)
  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return '방금 전'
      if (diffMins < 60) return `${diffMins}분 전`
      if (diffHours < 24) return `${diffHours}시간 전`
      if (diffDays < 7) return `${diffDays}일 전`
      return formatDate(dateString)
    } catch {
      return dateString
    }
  }

  // 마감일까지 남은 시간 계산
  const getDeadlineText = () => {
    try {
      const deadline = new Date(recruitDeadline)
      const now = new Date()
      const diffMs = deadline.getTime() - now.getTime()

      // 이미 마감된 경우
      if (diffMs <= 0) {
        return {
          text: '모집 마감',
          showIcon: false,
        }
      }

      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      // 1일 이상 남았으면 "마감 n일 전"
      if (diffDays >= 1) {
        return {
          text: `마감 ${diffDays}일 전`,
          showIcon: false,
        }
      }

      // 1일 미만이면 "마감 n시간 전" (Timer 아이콘 포함)
      return {
        text: `마감 ${diffHours}시간 전`,
        showIcon: true,
      }
    } catch {
      return {
        text: '모집 마감',
        showIcon: false,
      }
    }
  }

  const deadlineInfo = getDeadlineText()
  const isClosed = deadlineInfo.text === '모집 마감'

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer border-t-[6px] border-gray02 bg-white px-4 py-4 transition-colors ${isLast ? 'border-b-[6px]' : ''}`}
    >
      {/* 태그 모음 */}
      <div className="mb-2 flex items-center gap-[4px]">
        {isPopular && (
          <SChip
            text="인기글"
            bgColor="gray06"
            textColor="white"
            icon={<IconFire width={12} height={12} />}
          />
        )}
        <SChip
          text={deadlineInfo.text}
          bgColor={isClosed ? '#757575' : 'gray02'}
          textColor={isClosed ? 'white' : 'gray06'}
          icon={
            deadlineInfo.showIcon ? <IconTimer width={12} height={12} fill="#424242" /> : undefined
          }
        />
      </div>

      {/* 제목 */}
      <h3 className="line-clamp-2 min-h-[38px] text-16 font-semibold leading-[1.5] text-gray06">
        {title}
      </h3>

      {/* 정보 박스 */}
      <div className="mt-4 rounded-[2px] bg-[#FAFAFA] px-[8px] py-[12px]">
        {/* 테마 정보 */}
        {(themeName || storeName) && (
          <div className="flex items-center gap-1">
            {themeName && (
              <span className="flex-1 truncate text-14 font-semibold text-gray05">{themeName}</span>
            )}
            {storeName && <span className="text-12 font-medium text-gray05">{storeName}</span>}
          </div>
        )}

        {/* 모집 정보 */}
        <div
          className={`${themeName || storeName ? 'mt-4' : ''} flex flex-col gap-1 text-12 text-gray05`}
        >
          <div>모집인원 {recruitPeople}명</div>
          <div>{formatEscapeDate(escapeDate)}</div>
        </div>
      </div>

      <div className="mt-[16px] flex items-center justify-between">
        <div className="relative flex items-center gap-[4px] text-12 text-gray05">
          <span>{memberName}</span>
          <div className="h-[1px] w-[1px] rounded-full bg-gray05"></div>
          <span>{formatRelativeTime(createdAt)}</span>
          {hit > 0 && (
            <>
              <div className="h-[1px] w-[1px] rounded-full bg-gray05"></div>
              <span>조회수{hit}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[2px] text-12 text-gray05">
            <IconHeart width={14} height={14} fill="#BDBDBD" />
            <span className="text-[#BDBDBD]">{likeCount}</span>
          </div>
          <div className="flex items-center gap-[2px] text-12">
            <IconComment width={14} height={14} fill="#BDBDBD" />
            <span className="text-[#BDBDBD]">{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
