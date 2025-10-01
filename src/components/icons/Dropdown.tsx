import { SVGProps } from 'react'

export default function IconDropdown({
  width = 16,
  height = 16,
  fill = '#9747FF',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.5 12.5L13.2631 6.3125H3.73686L8.5 12.5Z" fill={fill} />
    </svg>
  )
}
