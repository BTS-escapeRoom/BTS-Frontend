import { SVGProps } from 'react'

export default function IconChevronRight({
  width = 16,
  height = 16,
  fill = '#757575',
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
      <g clipPath={`url(#clip0_1409_90891)`}>
        <path
          d="M6.72244 12.1098C6.77344 12.1104 6.82401 12.1004 6.87089 12.0803C6.91778 12.0602 6.95994 12.0305 6.99466 11.9931L10.4947 8.49314C10.6502 8.33759 10.6502 8.09648 10.4947 7.94092L6.99466 4.4487C6.83911 4.29314 6.59799 4.29314 6.44244 4.4487C6.28688 4.60425 6.28688 4.84536 6.44244 5.00092L9.67022 8.22092L6.44244 11.4487C6.28688 11.6043 6.28688 11.8454 6.44244 12.0009C6.52022 12.0787 6.62133 12.1176 6.71466 12.1176L6.72244 12.1098Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id={`clip0_1409_90891`}>
          <rect width="5.44444" height="12.4444" fill="white" transform="matrix(-1 0 0 1 11 2)" />
        </clipPath>
      </defs>
    </svg>
  )
}
