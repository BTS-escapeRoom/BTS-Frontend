interface SChipProps {
  text: string
  bgColor?: string
  textColor?: string
  icon?: React.ReactNode
}

export default function SChip({
  text,
  bgColor = 'gray02',
  textColor = 'gray06',
  icon,
}: SChipProps) {
  const isHex = (value?: string) => value?.startsWith('#')

  const bgStyle = isHex(bgColor) ? { backgroundColor: bgColor } : {}
  const textStyle = isHex(textColor) ? { color: textColor } : {}

  return (
    <div
      className={`inline-flex items-center rounded-[2px] px-[4px] ${isHex(bgColor) ? '' : `bg-${bgColor}`} ${isHex(textColor) ? '' : `text-${textColor}`}`}
      style={{ ...bgStyle, ...textStyle }}
    >
      {icon && <span className="mr-[2px]">{icon}</span>}
      <span className="whitespace-nowrap text-12">{text}</span>
    </div>
  )
}
