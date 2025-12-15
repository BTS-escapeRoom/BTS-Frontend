import IconChevronRight from '@/components/icons/ChevronRight'

interface RecruitThemeFieldProps {
  themeName?: string
  storeName?: string
  onClick: () => void
}

export default function RecruitThemeField({
  themeName,
  storeName,
  onClick,
}: RecruitThemeFieldProps) {
  const hasTheme = !!themeName
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="text-[14px] font-bold text-gray06">테마 정보</div>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-[4px] bg-[#fafafa] px-[16px] py-[16px]"
      >
        <div className="flex flex-1 items-start justify-center">
          {hasTheme ? (
            <>
              <span className="text-[12px] text-gray06 underline">{themeName}</span>
              {storeName && <span className="mt-[2px] text-[11px] text-gray05">{storeName}</span>}
            </>
          ) : (
            <span className="text-[12px] text-gray05 underline">테마 연결하기</span>
          )}
        </div>
        <IconChevronRight width={16} height={16} />
      </button>
    </div>
  )
}
