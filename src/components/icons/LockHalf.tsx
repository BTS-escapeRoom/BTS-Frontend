import { SVGProps } from 'react'

export default function IconLockHalf({ fill = '#9747FF', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="5"
      height="12"
      viewBox="0 0 5 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 4V12H5V9.14286C4.65792 9.14438 4.36375 9.03257 4.1175 8.80743C3.87125 8.58229 3.74875 8.31314 3.75 8C3.75125 7.68686 3.87375 7.41791 4.1175 7.19314C4.36125 6.96838 4.65569 6.85714 5 6.85714V4H3.125V2.85714C3.125 2.38095 3.30729 1.97619 3.67188 1.64286C4.03646 1.30952 4.47929 1.14286 5 1.14286V0C4.13583 0.000380952 3.39896 0.279048 2.78938 0.836C2.17979 1.39295 1.875 2.06667 1.875 2.85714V4H0Z"
        fill={fill}
      />
    </svg>
  )
}
