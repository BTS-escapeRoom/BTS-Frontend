import { SVGProps } from 'react'

export default function IconChevronUp({
  width = 22,
  height = 22,
  fill = '#414141',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.61111 13.594L10.8056 8L16 13.594"
        stroke={fill}
        strokeWidth="0.799145"
        strokeLinecap="square"
      />
    </svg>
  )
}
