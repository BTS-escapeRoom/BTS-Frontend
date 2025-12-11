import { SVGProps } from 'react'

export default function IconExternal({
  width = 14,
  height = 14,
  fill = '#424242',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.74935 2.04102H11.9577M11.9577 2.04102V5.24935M11.9577 2.04102L7.29102 6.70768"
        stroke={fill}
      />
      <path
        d="M6.70801 3.20703H4.37467C4.06526 3.20703 3.76851 3.32995 3.54972 3.54874C3.33092 3.76753 3.20801 4.06428 3.20801 4.3737V9.6237C3.20801 9.93312 3.33092 10.2299 3.54972 10.4487C3.76851 10.6674 4.06526 10.7904 4.37467 10.7904H9.62467C9.93409 10.7904 10.2308 10.6674 10.4496 10.4487C10.6684 10.2299 10.7913 9.93312 10.7913 9.6237V7.29036"
        stroke={fill}
        strokeLinecap="round"
      />
    </svg>
  )
}
