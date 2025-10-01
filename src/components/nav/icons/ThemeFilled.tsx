import { SVGProps } from 'react'

export default function IconThemeFilled({
  width = 32,
  height = 32,
  fill = '#9747FF',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.46 3.05981V12.0198H20.4199V20.9797H29.3799V28.9397H3.5V3.05981H11.46Z"
        fill={fill}
        stroke="#151515"
      />
    </svg>
  )
}
