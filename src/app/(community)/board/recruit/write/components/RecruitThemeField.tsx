import IconChevronRight from '@/components/icons/ChevronRight'
import ThemeInfoItem from './ThemeInfoItem'
import type { Theme } from '@/features/theme/types/model'

interface RecruitThemeFieldProps {
  theme?: {
    id: string
    title: string
    thumbnail?: string
    time?: number
    difficulty?: number
    genreType?: string
    store?: string
  } | null
  onClick: () => void
}

export default function RecruitThemeField({ theme, onClick }: RecruitThemeFieldProps) {
  const hasTheme = !!theme

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="text-[14px] font-bold text-gray06">테마 정보</div>
      {hasTheme ? (
        <ThemeInfoItem
          theme={theme as Theme}
          isSelected={false}
          onClick={onClick}
          infoText="변경"
        />
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClick()
          }}
          className="flex w-full items-center justify-between rounded-[4px] bg-[#fafafa] px-[16px] py-[16px]"
        >
          <div className="flex flex-1 items-start justify-center">
            <span className="text-[12px] text-gray05 underline">테마 연결하기</span>
          </div>
          <IconChevronRight width={16} height={16} />
        </button>
      )}
    </div>
  )
}
