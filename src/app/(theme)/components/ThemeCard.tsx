import Image from 'next/image'
import { Theme } from '../types/theme'
import SChip from '@/components/chip/SChip'
import { IconClock } from '@/components/icons'
import GenreChip from './GenreChip'

type ThemeCardProps = {
  theme: Theme
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const { title, store, district, genre, time, difficulty, thumbnail } = theme
  return (
    <div className="flex w-[150px] flex-col">
      {/* 이미지 영역 */}
      <div className="relative h-[190px] w-full overflow-hidden rounded-md bg-gray06">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-[8px] text-14 text-white">
            {title}_{store}
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="mt-[8px] flex flex-col gap-[4px]">
        <div className="text-bold-16 truncate text-[#151515]">{title}</div>
        <div className="item-center flex flex-nowrap gap-[4px] text-[#414141]">
          <span className="truncate text-12 font-semibold">{store}</span>
          <span className="text-12 font-semibold text-[#B9B9B9]">|</span>
          <span className="whitespace-nowrap text-12">{district}</span>
        </div>
        <div className="item-center flex gap-[2px]">
          {genre && <GenreChip genre={genre} />}
          <SChip text={`${time}분`} icon={<IconClock />} />
          <SChip text={`난이도 ${difficulty}`} bgColor="transparent" />
        </div>
      </div>
    </div>
  )
}
