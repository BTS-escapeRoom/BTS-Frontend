'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { createBoard } from '@/features/board/api/createBoard'
import { updateBoard } from '@/features/board/api/updateBoard'
import SButton from '@/components/button/SButton'
import RecruitTitleField from './RecruitTitleField'
import RecruitPeopleField from './RecruitPeopleField'
import RecruitEscapeDateField from './RecruitEscapeDateField'
import RecruitContactField from './RecruitContactField'
import RecruitThemeField from './RecruitThemeField'
import RecruitDeadlineField from './RecruitDeadlineField'
import RecruitContentField from './RecruitContentField'

type Mode = 'create' | 'edit'

interface RecruitFormProps {
  mode: Mode
  boardId?: number
}

export default function RecruitForm({ mode, boardId }: RecruitFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const [title, setTitle] = useState('')
  const [people, setPeople] = useState<number | null>(null)
  const [escapeDate, setEscapeDate] = useState<Date | null>(null)
  const [isEscapeNegotiable, setIsEscapeNegotiable] = useState(false)
  const [contactMethod, setContactMethod] = useState<'OPEN_TALK' | 'GOOGLE' | 'ETC'>('OPEN_TALK')
  const [contactUrl, setContactUrl] = useState('')
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [content, setContent] = useState('')

  // TODO: 테마 선택 로직 연동
  const [themeName] = useState<string | undefined>(undefined)
  const [storeName] = useState<string | undefined>(undefined)

  const formatDateToIsoString = (date: Date | null): string | null => {
    if (!date) return null
    return date.toISOString()
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      showToast('제목을 입력해주세요.', 'warning')
      return
    }

    if (!people) {
      showToast('모집 인원을 입력해주세요.', 'warning')
      return
    }

    if (!deadline) {
      showToast('모집 마감일을 선택해주세요.', 'warning')
      return
    }

    try {
      const escapeDateIso = isEscapeNegotiable ? null : formatDateToIsoString(escapeDate)
      const deadlineIso = formatDateToIsoString(deadline)!

      const payload = {
        // themeId: TODO - 테마 선택 연동 시 추가
        type: 'recruit' as const,
        title: title.trim(),
        description: content.trim(),
        recruit_deadline: deadlineIso,
        escape_date: escapeDateIso,
        recruit_people: people,
        contact_url: contactUrl || undefined,
        contact_method: contactMethod,
      }

      if (mode === 'create') {
        await createBoard(payload)
        showToast('모집글이 작성되었습니다.', 'success')
      } else if (mode === 'edit' && boardId) {
        await updateBoard(boardId, payload)
        showToast('모집글이 수정되었습니다.', 'success')
      }

      const backTo = searchParams.get('backTo')
      if (backTo) {
        router.push(backTo)
      } else {
        router.back()
      }
    } catch (error) {
      console.error('모집글 저장 실패:', error)
      showToast('모집글 저장 중 오류가 발생했습니다.', 'error')
    }
  }

  return (
    <div className="relative">
      {/* 상단 헤더 타이틀은 상위 레이아웃/페이지에서 처리: "모집 글쓰기" / "모집글 수정" */}
      <div className="mx-auto flex max-w-[500px] flex-col gap-[24px] px-[16px] py-[8px] pb-[64px]">
        <RecruitTitleField value={title} onChange={setTitle} />
        <RecruitPeopleField value={people} onChange={setPeople} />
        <RecruitEscapeDateField
          value={escapeDate}
          onChange={setEscapeDate}
          isNegotiable={isEscapeNegotiable}
          onNegotiableChange={setIsEscapeNegotiable}
        />
        <RecruitContactField
          method={contactMethod}
          url={contactUrl}
          onMethodChange={setContactMethod}
          onUrlChange={setContactUrl}
        />
        <RecruitThemeField
          themeName={themeName}
          storeName={storeName}
          onClick={() => {
            // 테마 선택 모달/페이지로 이동
          }}
        />
        <RecruitDeadlineField value={deadline} onChange={setDeadline} />
        <RecruitContentField value={content} onChange={setContent} />
      </div>

      <div className="fixed bottom-[56px] left-1/2 w-full max-w-[600px] -translate-x-1/2 bg-white p-[16px]">
        <div className="mx-auto max-w-[600px]">
          <SButton onClick={handleSubmit}>작성 완료</SButton>
        </div>
      </div>
    </div>
  )
}
