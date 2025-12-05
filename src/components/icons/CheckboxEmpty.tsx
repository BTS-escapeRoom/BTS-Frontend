import { SVGProps } from 'react'

export default function IconCheckboxEmpty({
  width = 14,
  height = 14,
  fill = '#E0E0E0',
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
        d="M12.375 0H1.125C0.826631 0 0.540483 0.118526 0.329505 0.329505C0.118526 0.540483 0 0.826631 0 1.125V12.375C0 12.6734 0.118526 12.9595 0.329505 13.1705C0.540483 13.3815 0.826631 13.5 1.125 13.5H12.375C12.6734 13.5 12.9595 13.3815 13.1705 13.1705C13.3815 12.9595 13.5 12.6734 13.5 12.375V1.125C13.5 0.826631 13.3815 0.540483 13.1705 0.329505C12.9595 0.118526 12.6734 0 12.375 0ZM1.125 12.375V1.125H12.375V12.375H1.125Z"
        fill={fill}
      />
    </svg>
  )
}
