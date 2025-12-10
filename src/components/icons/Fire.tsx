import { SVGProps } from 'react'

export default function IconFire({
  width = 12,
  height = 12,
  fill = '#19FFEC',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 11C8.05875 11 9.75 9.3685 9.75 7.2745C9.75 6.7605 9.72375 6.2095 9.43875 5.353C9.15375 4.4965 9.0965 4.386 8.79525 3.857C8.6665 4.93625 7.97775 5.38625 7.80275 5.52075C7.80275 5.38075 7.38625 3.834 6.7545 2.90825C6.13425 2 5.29075 1.40425 4.79625 1C4.79625 1.7675 4.5805 2.9085 4.27125 3.49C3.96225 4.07125 3.90425 4.0925 3.518 4.525C3.13175 4.9575 2.95475 5.09125 2.63175 5.61625C2.30875 6.14125 2.25 6.8405 2.25 7.3545C2.25 9.4485 3.94125 11 6 11Z"
        fill={fill}
        stroke={fill}
        strokeLinejoin="round"
      />
    </svg>
  )
}
