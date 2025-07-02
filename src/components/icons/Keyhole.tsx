import { SVGProps } from 'react'

export default function IconBack({
  width = 36,
  height = 36,
  fill = 'white',
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
        d="M17.7842 2C22.6356 2 26.5683 5.9328 26.5684 10.7842C26.5684 14.5964 24.1394 17.8394 20.7451 19.0547L25.3916 34H10.1768L14.8223 19.0547C11.4285 17.8391 9 14.596 9 10.7842C9.00007 5.93284 12.9328 2.00007 17.7842 2Z"
        fill={fill}
      />
    </svg>
  )
}
