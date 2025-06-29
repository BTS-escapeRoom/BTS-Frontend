import { SVGProps } from 'react'

export default function IconNaver({
  width = 24,
  height = 24,
  fill = '#03C75A',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.8491 12.5627L8.91687 4H4V20H9.15088V11.436L15.0831 20H20V4H14.8491V12.5627Z"
        fill={fill}
      />
    </svg>
  )
}
