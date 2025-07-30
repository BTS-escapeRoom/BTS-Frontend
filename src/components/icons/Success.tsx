import { SVGProps } from 'react'

export default function IconKakao({
  width = 28,
  height = 28,
  fill = '#00FB60',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 3C20.0751 3 25 7.92487 25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14C3 7.92487 7.92487 3 14 3ZM19.707 10.293C19.3165 9.90244 18.6835 9.90244 18.293 10.293L13 15.5859L10.707 13.293L10.6309 13.2246C10.2381 12.9043 9.65908 12.9269 9.29297 13.293C8.90244 13.6835 8.90244 14.3165 9.29297 14.707L13 18.4141L19.707 11.707C20.0976 11.3165 20.0976 10.6835 19.707 10.293Z"
        fill={fill}
      />
    </svg>
  )
}
