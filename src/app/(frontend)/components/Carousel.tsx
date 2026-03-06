import Link from 'next/link'
import React from 'react'
import { CommunityIcon, TipsIcon } from './Icons'

const items = [
  {
    label: 'Info',
    color: '#612DF6',
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.5096 14.7202C18.7307 17.0014 16.8707 18.8272 14.7175 20.5047C16.5014 21.5349 20.6868 23.402 22.0428 22.0463C22.9685 21.1208 22.5431 18.2261 20.5096 14.7202M12.5019 19.0642C14.9794 17.252 17.2474 14.9846 19.0588 12.5077C17.2549 10.0395 14.9882 7.76961 12.5019 5.9512C10.0069 7.7746 7.74388 10.047 5.94373 12.5077C7.75511 14.9859 10.0243 17.252 12.5019 19.0642M10.2851 20.5047C8.12687 18.8223 6.26683 16.9964 4.49288 14.7202C2.45944 18.2261 2.03404 21.1208 2.95969 22.0463C4.30325 23.3882 8.45247 21.5648 10.2851 20.5047M4.49288 10.2952C6.27057 8.01406 8.13061 6.18942 10.2851 4.51069C8.50361 3.48051 4.31698 1.61221 2.95969 2.96916C2.03404 3.89458 2.45944 6.78932 4.49288 10.2952M14.7175 4.51069C16.8756 6.19191 18.7344 8.01781 20.5096 10.2952C25.0231 2.51144 21.6099 0.527152 14.7175 4.51069M22.0802 12.5077C28.8729 23.1213 23.0346 28.831 12.5019 22.0924C1.99412 28.8148 -3.89287 23.1563 2.92351 12.5077C-3.82301 1.96766 1.86562 -3.88168 12.5019 2.92301C23.0308 -3.81309 28.8792 1.88535 22.0802 12.5077M13.8317 11.1819C14.5615 11.9128 14.5615 13.0976 13.8317 13.8272C13.1007 14.5581 11.9155 14.5581 11.1845 13.8272C10.4535 13.0976 10.4535 11.9128 11.1845 11.1819C11.9155 10.4511 13.1007 10.4511 13.8317 11.1819"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: 'Tips',
    color: '#63B3B9',
    href: '/tips',
    icon: <TipsIcon width={30} height={30} fill="white" />,
  },
  {
    label: 'Trials',
    color: '#1F977F',
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="30" fill="white" fillOpacity="0.01" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.875 11.625H11.625V9.375H13.875V7.125H16.125V9.375H18.375V11.625H16.125V13.875H13.875V11.625ZM22.875 15V11.625L24 15H22.875ZM24 24H6V17.25H10.5V21.75H19.5V17.25H24V24ZM7.125 11.625V15H6L7.125 11.625ZM9.375 6H20.625V15H17.25V19.5H12.75V15H9.375V6ZM24 8.25H22.875V3.75H7.125V8.25H6L3.75 15V26.25H26.25V15L24 8.25Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: 'Community',
    color: '#EB498A',
    href: '/community',
    icon: <CommunityIcon width={25} height={25} fill="white" />,
  },
  {
    label: 'Extra',
    color: '#A9255A',
    icon: <TipsIcon width={30} height={30} fill="white" />,
  },
  {
    label: 'More',
    color: '#612DF6',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-10"
      >
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(90 12 12)" />
      </svg>
    ),
  },
]

export function Carousel() {
  return (
    <div className="carousel-scroll flex overflow-y-hidden -mr-4">
      {items.map(({ label, color, icon, href }) => (
        <Link className="contents" href={href ?? '/'} key={label}>
          {icon}
          <div key={label} className="flex shrink-0 flex-col items-center gap-1 px-2 pb-2">
            <div
              className="flex size-[50px] items-center justify-center rounded-full text-white"
              style={{ backgroundColor: color }}
            >
              {icon}
            </div>
            <span className="text-[12px] font-medium leading-[14px] tracking-[-0.41px] text-white/90">
              {label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
