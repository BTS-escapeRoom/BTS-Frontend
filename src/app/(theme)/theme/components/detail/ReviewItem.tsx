'use client'

import HButton from '@/components/button/HButton'
import MoreMenuButton from '@/components/button/MoreMenuButton'
import SChip from '@/components/chip/SChip'
import { IconKebabVertical, IconLockClose, IconLockOpen } from '@/components/icons'
import type { Review } from '@/features/theme/api/getReviews.types'
import { useModalStore } from '@/store/modalStore'
import ReportModalContent from '@/components/report/ReportModalContent'
import ConfirmModalContent from '@/components/modal/ConfirmModalContent'
import { deleteReview } from '@/features/theme/api/deleteReview'
import { useToast } from '@/hooks/useToast'

type ReviewItemProps = {
  review: Review
  onDeleteSuccess?: () => void
}

type ReviewGuideInfoProps = {
  title: string
  value: string | number
}

type ReviewDetailInfoProps = {
  people: number | null
  hint: number | null
  remainingTime: number
  elapsedTime: number
}

type MorePopupProps = {
  isMyReview: boolean
  reviewId: number
  onDeleteSuccess?: () => void
}

function ReviewGuideInfo({ title, value }: ReviewGuideInfoProps) {
  return (
    <div className="flex gap-[2px]">
      <span>{title}</span>
      <span className="text-[#9F9C9C]">{value}</span>
    </div>
  )
}

function ReviewDetailInfo({ people, hint, remainingTime, elapsedTime }: ReviewDetailInfoProps) {
  const remainingTimeMin = Math.floor(remainingTime / 60)
  const remainingTimeSec = remainingTime % 60

  const elapsedTimeMin = Math.floor(elapsedTime / 60)
  const elapsedTimeSec = elapsedTime % 60

  const elapsedTimeText = elapsedTime > 0 ? `${elapsedTimeMin}분 ${elapsedTimeSec}초` : null
  const remainingTimeText =
    remainingTime > 0 ? `(${remainingTimeMin}분 ${remainingTimeSec}초 남겼어요)` : null

  const timeText =
    elapsedTime || remainingTime ? `${elapsedTimeText || ''} ${remainingTimeText || ''}` : null

  const items = [
    people && <span key="people">플레이원 {people}명</span>,
    hint && <span key="hint">사용 힌트 {hint}개</span>,
    timeText && <span key="elapsed">{timeText}</span>,
  ].filter((item) => item)

  return (
    <div className="flex items-center gap-[6px]">
      {items.reduce((acc: any[], curr, index) => {
        if (index === 0) return [curr]
        return [...acc, <span key={`sep-${index}`}>|</span>, curr]
      }, [])}
    </div>
  )
}

function MorePopup({ isMyReview, reviewId, onDeleteSuccess }: MorePopupProps) {
  const { showToast } = useToast()

  const handleClickEdit = () => {}
  const handleClickDelete = () => {
    useModalStore.setState({
      isOpen: true,
      props: {
        title: '리뷰 삭제',
      },
      view: (
        <ConfirmModalContent
          title="리뷰 삭제"
          message="정말 삭제하시겠습니까?"
          onConfirm={async () => {
            try {
              await deleteReview(reviewId)
              showToast('리뷰가 삭제되었습니다.', 'success')
              onDeleteSuccess?.()
            } catch (error) {
              showToast('리뷰 삭제 중 오류가 발생했습니다.', 'error')
            }
          }}
          confirmText="삭제"
          cancelText="취소"
        />
      ),
    })
  }

  const handleClickReport = () => {
    useModalStore.setState({
      isOpen: true,
      props: {
        title: '신고',
      },
      view: <ReportModalContent reviewId={reviewId} />,
    })
  }
  return (
    <>
      {isMyReview ? (
        <div className="flex flex-col gap-[8px] text-[14px]">
          <MoreMenuButton
            list={[
              { text: '수정', onClick: handleClickEdit },
              { text: '삭제', onClick: handleClickDelete, className: 'text-[#EF4156]' },
            ]}
          />
          <MoreMenuButton
            list={[{ text: '닫기', onClick: () => useModalStore.setState({ isOpen: false }) }]}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-[6px] text-[14px]">
          <MoreMenuButton
            list={[{ text: '신고', onClick: handleClickReport, className: 'text-[#EF4156]' }]}
          />
          <MoreMenuButton
            list={[{ text: '닫기', onClick: () => useModalStore.setState({ isOpen: false }) }]}
          />
        </div>
      )}
    </>
  )
}

export default function ReviewItem({ review, onDeleteSuccess }: ReviewItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleClickMenu = () => {
    useModalStore.setState({
      isOpen: true,
      props: {
        closeOnOverlayClick: true,
        hideCloseButton: true,
        className: 'mx-[8px] mb-[12px]',
        variant: 'bottomSheet',
      },
      view: (
        <MorePopup
          isMyReview={review.isMyReview}
          reviewId={review.id}
          onDeleteSuccess={onDeleteSuccess}
        />
      ),
    })
  }

  return (
    <div className="flex flex-col gap-[12px] border-b border-gray02 py-[24px] last:mb-0 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[4px]">
          {review.isMyReview && <SChip text="내가 쓴 리뷰" bgColor="#9747FF" textColor="#fff" />}
          {review.isSuccess ? (
            <SChip text="탈출성공" bgColor="#000" textColor="#fff" icon={<IconLockOpen />} />
          ) : (
            <SChip text="탈출실패" bgColor="#000" textColor="#fff" icon={<IconLockClose />} />
          )}
        </div>
        <HButton onClick={handleClickMenu}>
          <IconKebabVertical />
        </HButton>
      </div>
      <div className="flex flex-col gap-[2px] text-[12px]">
        <div className="flex items-center gap-[16px]">
          <ReviewGuideInfo title="난이도" value={review.difficulty} />
          <ReviewGuideInfo title="활동성" value={review.activityScore} />
          <ReviewGuideInfo title="공포도" value={review.scareScore} />
        </div>
        <ReviewDetailInfo
          people={review.people}
          hint={review.hints}
          remainingTime={review.remainingTime}
          elapsedTime={review.elapsedTime}
        />
        {review.visitDate && <div>방문일 {formatDate(review.visitDate)}</div>}
      </div>
      {review.content && (
        <div className="rounded-[2px] bg-gray01 p-[10px] text-[14px]">{review.content}</div>
      )}
    </div>
  )
}
