import { SVGProps } from 'react'

export default function IconBack({
  width = 36,
  height = 36,
  fill = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 28C21.8688 28.0016 21.7388 27.9757 21.6183 27.9241C21.4977 27.8724 21.3893 27.7961 21.3 27.7L12.3 18.7C11.9 18.3 11.9 17.68 12.3 17.28L21.3 8.3C21.7 7.9 22.32 7.9 22.72 8.3C23.12 8.7 23.12 9.32 22.72 9.72L14.42 18L22.72 26.3C23.12 26.7 23.12 27.32 22.72 27.72C22.52 27.92 22.26 28.02 22.02 28.02L22 28Z"
        fill={fill}
      />
    </svg>
  )
}
