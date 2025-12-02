interface SChipProps {
  text: string
  bgColor?: string
  textColor?: string
  icon?: React.ReactNode | React.ReactElement | string
}

const BG: Record<string, string> = {
  transperent: 'bg-transperent',
  gray01: 'bg-gray01',
  gray02: 'bg-gray02',
  gray03: 'bg-gray03',
  gray04: 'bg-gray04',
  gray05: 'bg-gray05',
  gray06: 'bg-gray06',
  gray07: 'bg-gray07',
  white: 'bg-white',
  black: 'bg-black',
}
const TEXT: Record<string, string> = {
  transperent: 'text-transperent',
  gray01: 'text-gray01',
  gray02: 'text-gray02',
  gray03: 'text-gray03',
  gray04: 'text-gray04',
  gray05: 'text-gray05',
  gray06: 'text-gray06',
  gray07: 'text-gray07',
  white: 'text-white',
  black: 'text-black',
}

export default function SChip({
  text,
  bgColor = 'gray02',
  textColor = 'gray06',
  icon,
}: SChipProps) {
  const isHex = (v?: string) => v?.startsWith('#')
  const bgStyle = isHex(bgColor) ? { backgroundColor: bgColor } : undefined
  const textStyle = isHex(textColor) ? { color: textColor } : undefined

  const bgClass = isHex(bgColor) ? '' : (BG[bgColor] ?? '')
  const textClass = isHex(textColor) ? '' : (TEXT[textColor] ?? '')

  return (
    <div
      className={`inline-flex items-center rounded-[2px] px-[4px] ${bgClass} ${textClass}`}
      style={{ ...bgStyle, ...textStyle }}
    >
      {icon && <span className="mr-[2px] shrink-0">{icon}</span>}
      <span className="whitespace-nowrap text-12">{text}</span>
    </div>
  )
}
