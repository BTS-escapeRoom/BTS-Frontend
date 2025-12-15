'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  IconKebabVertical,
  IconTimer,
  IconExternal,
  IconClock,
  IconLockFull,
  IconLockHalf,
  IconHeart,
  IconComment,
} from '@/components/icons'
import Image from 'next/image'
import SChip from '@/components/chip/SChip'
import { apiPost, type ApiResponse } from '@/utils/api'
import { useToast } from '@/hooks/useToast'
import HButton from '@/components/button/HButton'
import MoreMenuButton from '@/components/button/MoreMenuButton'
import { useModalStore } from '@/store/modalStore'
import BoardReportModalContent from '@/components/report/BoardReportModalContent'
import { useAuthStore } from '@/features/auth/store/authStore'
import type { BoardDetail } from '@/features/board/types/model'

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

// 탈출 일자 포맷팅 (YYYY년 MM월 DD일 오전/오후 hh시 mm분)
function formatEscapeDate(dateString: string | null) {
  if (!dateString) return null
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
    return null
  }
}

// 마감일까지 남은 시간 계산
function getDeadlineInfo(recruitDeadline: string) {
  try {
    const deadline = new Date(recruitDeadline)
    const now = new Date()
    const diffMs = deadline.getTime() - now.getTime()

    // 이미 마감된 경우
    if (diffMs <= 0) {
      return {
        text: '모집 마감',
        showIcon: false,
        bgColor: 'gray05',
        textColor: 'white',
      }
    }

    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    // 1일 이상 남았으면 "마감 n일 전"
    if (diffDays >= 1) {
      return {
        text: `마감 ${diffDays}일 전`,
        showIcon: false,
        bgColor: 'gray06',
        textColor: 'white',
      }
    }

    // 1일 미만이면 "마감 n시간 전" (Timer 아이콘 포함)
    return {
      text: `마감 ${diffHours}시간 전`,
      showIcon: true,
      bgColor: 'gray06',
      textColor: 'white',
    }
  } catch {
    return {
      text: '모집 마감',
      showIcon: false,
      bgColor: 'gray05',
      textColor: 'white',
    }
  }
}

// 시간 포맷팅 (mm분ss초 형식)
function formatTimeLabel(totalMinutes?: number) {
  if (totalMinutes == null || Number.isNaN(totalMinutes)) return '??분'
  const minutes = Math.floor(totalMinutes)
  const secondsNum = Math.round((totalMinutes - minutes) * 60)
  const seconds = Math.max(0, Math.min(59, secondsNum))
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  if (seconds === 0) return `${mm}분`
  return `${mm}분${ss}초`
}

// 난이도 아이콘 렌더링
function renderDifficultyIcons(difficulty?: number) {
  if (difficulty == null || Number.isNaN(difficulty)) return null
  const full = Math.floor(difficulty)
  const hasHalf = difficulty - full > 0
  const icons: React.ReactNode[] = []
  for (let i = 0; i < full; i += 1) {
    icons.push(<IconLockFull key={`full-${i}`} fill="#424242" />)
  }
  if (hasHalf) {
    icons.push(<IconLockHalf key="half" fill="#424242" />)
  }
  return <div className="flex items-center gap-[2px]">{icons}</div>
}

type RecruitBoardPostProps = {
  board: BoardDetail
}

type MorePopupProps = {
  isMyBoard: boolean
  boardId: number
}

function MorePopup({ isMyBoard, boardId }: MorePopupProps) {
  const { showToast } = useToast()

  const handleClickCloseSheet = () => {
    useModalStore.setState({ isOpen: false })
  }

  const handleClickExpire = () => {
    // TODO: 모집글 마감 API 연동
    showToast('모집글 마감 기능은 준비 중입니다.', 'info')
    handleClickCloseSheet()
  }

  const handleClickEdit = () => {
    // TODO: 모집글 수정 화면으로 이동
    showToast('모집글 수정 기능은 준비 중입니다.', 'info')
    handleClickCloseSheet()
  }

  const handleClickDelete = () => {
    // TODO: 모집글 삭제 API 연동
    showToast('모집글 삭제 기능은 준비 중입니다.', 'info')
    handleClickCloseSheet()
  }

  const handleClickReport = () => {
    useModalStore.setState({
      isOpen: true,
      props: {
        title: '신고',
      },
      view: <BoardReportModalContent boardId={boardId} />,
    })
  }

  if (isMyBoard) {
    return (
      <div className="flex flex-col gap-[8px] text-[14px]">
        <MoreMenuButton
          list={[
            { text: '마감', onClick: handleClickExpire },
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

export default function RecruitBoardPost({ board }: RecruitBoardPostProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()
  const currentMemberId = useAuthStore((state) => state.memberInfo?.id)
  const isMyBoard = currentMemberId != null && board.memberId === currentMemberId

  const profileImg = (board as BoardDetail & { profileImg?: string }).profileImg

  const deadlineInfo = getDeadlineInfo(board.recruitDeadline)
  const escapeDateFormatted = formatEscapeDate(board.escapeDate)

  const themeDetail = board.theme
  const themeId = themeDetail?.id ? themeDetail.id.toString() : null

  // 관심글 여부 및 카운트 상태 (초기값: API 응답 기준)
  const [isLiked, setIsLiked] = useState<boolean>(board.isLike)
  const [likeCount, setLikeCount] = useState<number>(board.likeCount)

  // 테마 정보 클릭 핸들러
  const handleThemeClick = () => {
    if (!themeId) return
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('themeId', themeId)
    newSearchParams.set('themeTab', 'detail')
    router.push(`/board/recruit/${board.id}?${newSearchParams.toString()}`, { scroll: false })
  }

  // 관심 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    const prevLiked = isLiked
    const nextLiked = !prevLiked

    // 낙관적 업데이트
    setIsLiked(nextLiked)
    setLikeCount((prev) => prev + (nextLiked ? 1 : -1))

    try {
      await apiPost<ApiResponse<string>>(`/v1/boards/${board.id}/like`)
    } catch (error) {
      // 실패 시 상태 롤백
      setIsLiked(prevLiked)
      setLikeCount((prev) => prev + (prevLiked ? 1 : -1))
      showToast('관심글 상태를 변경하지 못했습니다. 잠시 후 다시 시도해 주세요.', 'error')
    }
  }

  // 연락 방법 표시
  const renderContactMethod = () => {
    if (!board.contactUrl) return null

    const contactMethod = board.contactMethod.toUpperCase()

    if (contactMethod === 'OPEN_TALK') {
      return (
        <a
          href={board.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-[2px]"
        >
          <span className="text-14 text-gray06 underline">오픈톡</span>
          <IconExternal width={14} height={14} fill="#424242" />
        </a>
      )
    }

    if (contactMethod === 'GOOGLE_FORM') {
      return (
        <a
          href={board.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-[2px]"
        >
          <span className="text-12 text-gray06 underline">구글폼</span>
          <IconExternal width={14} height={14} fill="#424242" />
        </a>
      )
    }

    if (contactMethod === 'ETC') {
      return <span className="text-12 text-gray06">{board.contactUrl}</span>
    }

    return null
  }

  return (
    <div className="px-4 py-4">
      {/* 제목 영역 */}
      <h1 className="whitespace-pre-wrap break-words text-18 font-bold text-gray07">
        {board.title}
      </h1>

      {/* 작성정보 영역 */}
      <div className="mt-6 flex items-center justify-between">
        {/* 좌측: 작성자 정보 */}
        <div className="flex items-start gap-2">
          {/* 프로필 사진 */}
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image
              src={profileImg || '/images/default-profile.png'}
              alt={board.memberName}
              fill
              className="object-cover"
            />
          </div>

          {/* 닉네임, 작성시간, 조회수 */}
          <div className="flex flex-col justify-between">
            <span className="text-12 font-semibold text-gray05">{board.memberName}</span>
            <span className="flex items-center gap-[4px]">
              <span className="text-12 text-gray04">{formatDateTime(board.createdAt)}</span>
              <span className="h-[1px] w-[1px] rounded-full bg-gray05"></span>
              <span className="text-12 text-gray04">조회수 {board.hit}</span>
            </span>
          </div>
        </div>

        {/* 우측: 더보기 버튼 */}
        <HButton
          className="flex h-[20px] w-[20px] shrink-0 items-center justify-center"
          onClick={() => {
            useModalStore.setState({
              isOpen: true,
              props: {
                closeOnOverlayClick: true,
                hideCloseButton: true,
                className: 'mx-[8px] mb-[12px]',
                variant: 'bottomSheet',
              },
              view: <MorePopup isMyBoard={isMyBoard} boardId={board.id} />,
            })
          }}
        >
          <IconKebabVertical fill="#757575" width={20} height={20} />
        </HButton>
      </div>

      {/* 모집정보 영역 */}
      <div className="mt-6">
        {/* 타이틀과 Chip */}
        <div className="flex items-center gap-1">
          <h2 className="text-14 font-bold text-gray06">모집정보</h2>
          <SChip
            text={deadlineInfo.text}
            bgColor={deadlineInfo.bgColor}
            textColor={deadlineInfo.textColor}
            icon={
              deadlineInfo.showIcon ? (
                <IconTimer width={12} height={12} fill="#FFFFFF" />
              ) : undefined
            }
          />
        </div>

        {/* 모집 상세정보 */}
        <div className="mt-2 flex flex-col gap-1">
          {/* 모집 인원 */}
          <div className="flex items-start gap-2">
            <span className="w-[60px] shrink-0 text-14 text-gray06">모집인원</span>
            <span className="flex-1 text-14 text-gray06">{board.recruitPeople}</span>
          </div>

          {/* 탈출 날짜 */}
          <div className="flex items-start gap-2">
            <span className="w-[60px] shrink-0 text-14 text-gray06">탈출 날짜</span>
            <span className="flex-1 text-14 text-gray06">
              {escapeDateFormatted || '협의 후 결정'}
            </span>
          </div>

          {/* 연락 방법 */}
          {renderContactMethod() && (
            <div className="flex items-start gap-2">
              <span className="w-[60px] shrink-0 text-14 text-gray06">연락 방법</span>
              <div className="flex-1">{renderContactMethod()}</div>
            </div>
          )}
        </div>
      </div>

      {/* 테마 정보 영역 */}
      {themeDetail && (
        <div className="mt-6">
          <h2 className="text-14 font-bold text-gray06">테마 정보</h2>
          <button
            onClick={handleThemeClick}
            className="mt-1 w-full rounded-[2px] bg-[#FAFAFA] p-2 text-left transition-opacity hover:opacity-80"
          >
            <div className="flex gap-2">
              {/* 좌측: 썸네일 */}
              <ThemeThumbnail theme={themeDetail} />

              {/* 우측: 테마 정보 */}
              <div className="flex flex-1 flex-col gap-1">
                {/* 첫번째 줄: 테마명 */}
                <div className="text-14 font-bold text-gray06">{themeDetail.title}</div>

                {/* 두번째 줄: genre, difficulty, time chip */}
                <div className="flex flex-wrap items-center gap-[6px]">
                  <SChip text={themeDetail.genreType} />
                  <DifficultyChip difficulty={themeDetail.difficulty} />
                  <SChip text={formatTimeLabel(themeDetail.time)} icon={<IconClock />} />
                </div>

                {/* 세번째 줄: city와 store 명 */}
                <div className="text-12 text-gray06">{themeDetail.store?.name}</div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* 모집 내용 영역 */}
      <div className="mt-6">
        <h2 className="text-14 font-bold text-gray06">모집 내용</h2>
        <div className="mt-1 border-b border-t border-gray02 pb-4 pt-4">
          <div className="whitespace-pre-wrap break-words text-14 text-gray07">
            {board.description}
          </div>
        </div>
      </div>

      {/* 하단 액션 영역 */}
      <div className="mt-6 flex items-center justify-between">
        {/* 좌측: 관심 버튼 */}
        <button
          onClick={handleLikeClick}
          className={`flex items-center gap-[8px] rounded-[18px] px-[8px] py-[4px] transition-colors ${
            isLiked ? 'border border-gray05 bg-[#19FFEC33]' : 'border border-gray04 bg-white'
          }`}
        >
          <IconHeart
            width={16}
            height={16}
            fill={isLiked ? '#19FFEC' : '#BDBDBD'}
            stroke={isLiked ? '#757575' : '#BDBDBD'}
          />
          <span className="text-14 text-gray05">관심 {likeCount}</span>
        </button>

        {/* 우측: 댓글 수 */}
        <div className="flex items-center gap-2 px-[6px]">
          <IconComment width={16} height={16} fill="#757575" />
          <span className="text-14 text-gray05">댓글 {board.commentCount}</span>
        </div>
      </div>
    </div>
  )
}

// 테마 썸네일 컴포넌트
function ThemeThumbnail({
  theme,
}: {
  theme: { thumbnail?: string; title: string; store?: { name: string } }
}) {
  const [imgError, setImgError] = useState(false)
  const showFallback = !theme.thumbnail || imgError

  return (
    <div className="relative h-[80px] w-[60px] shrink-0 overflow-hidden bg-gray06">
      {showFallback ? (
        <div className="absolute inset-0 flex items-center justify-center px-1">
          <span className="line-clamp-3 break-words text-center text-[10px] font-semibold text-white">
            {theme.title}_{theme.store?.name}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={theme.thumbnail}
          alt={theme.title}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}

// 난이도 Chip 컴포넌트
function DifficultyChip({ difficulty }: { difficulty?: number }) {
  if (difficulty == null || Number.isNaN(difficulty)) return null

  const difficultyText = difficulty.toFixed(1)
  const icons = renderDifficultyIcons(difficulty)

  return <SChip text={difficultyText} icon={icons} bgColor="gray02" textColor="gray06" />
}
