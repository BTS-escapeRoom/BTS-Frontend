import { SVGProps } from 'react'

export default function IconMyOutline({
  width = 32,
  height = 32,
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
        d="M16.1875 3.05981C19.7846 3.06006 22.7 5.97133 22.7002 9.56177C22.7002 12.0572 21.2889 14.2237 19.2168 15.3147L18.8623 15.5022L18.9678 15.8889L22.5264 28.9397H9.73926L13.3115 15.8411L13.415 15.4602L13.0684 15.2708C11.0441 14.1659 9.67383 12.0226 9.67383 9.56177C9.67398 5.97149 12.5903 3.05981 16.1875 3.05981Z"
        stroke="#757575"
      />
    </svg>
  )
}
