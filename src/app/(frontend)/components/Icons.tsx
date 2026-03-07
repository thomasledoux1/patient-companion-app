type IconProps = {
  className?: string
  width?: number
  height?: number
  /** @default 'currentColor' */
  fill?: string
  ariaHidden?: boolean
}

const defaultSize = 24

/**
 * Home / house icon. Default size 22×26 (aspect from viewBox).
 */
export function HomeIcon({
  className = '',
  width = 22,
  height = 26,
  fill = 'currentColor',
  ariaHidden = true,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1578 22.1848C19.1578 22.9402 18.5447 23.2631 17.7894 23.2631H16.4209C15.6656 23.2631 15.0525 22.9402 15.0525 22.1848V20.8164C15.0525 19.3043 13.8278 17.7895 12.3157 17.7895H9.57888C8.06679 17.7895 6.84206 19.3043 6.84206 20.8164V22.1848C6.84206 22.9402 6.22901 23.2631 5.47365 23.2631H4.10524C3.34987 23.2631 2.73682 22.9402 2.73682 22.1848V11.1513C2.73682 10.9693 2.80935 10.7955 2.93661 10.6669L9.96614 3.63874C10.5012 3.10369 11.3674 3.10369 11.9011 3.63874L18.958 10.6943C19.0852 10.8229 19.1578 10.9967 19.1578 11.1773V22.1848ZM21.8946 10.4343C21.8946 10.0717 21.7509 9.72548 21.4964 9.46822L12.8768 0.806172C11.8094 -0.265294 10.0756 -0.269399 9.00415 0.797962L0.402313 9.37106C0.145052 9.62832 0 9.9759 0 10.3399V23.5533C0 25.0654 1.22473 26 2.73682 26H6.84206C8.35415 26 9.57888 25.0654 9.57888 23.5533V22.1849C9.57888 21.4295 10.1919 20.8165 10.9473 20.8165C11.7027 20.8165 12.3157 21.4295 12.3157 22.1849V23.5533C12.3157 25.0654 13.5404 26 15.0525 26H19.1578C20.6699 26 21.8946 25.0654 21.8946 23.5533V10.4343Z"
        fill={fill}
      />
    </svg>
  )
}

/**
 * Tips / lightbulb icon. Default size 24×24 (viewBox 0 0 30 30).
 */
export function TipsIcon({
  className = '',
  width = defaultSize,
  height = defaultSize,
  fill = 'currentColor',
  ariaHidden = true,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M13.75 22.5H16.25V23.75C16.25 24.44 15.69 25 15 25C14.31 25 13.75 24.44 13.75 23.75V22.5ZM13.75 27.5H16.25C17.6313 27.5 18.75 26.3813 18.75 25V21.25C18.75 20.56 18.19 20 17.5 20H12.5C11.81 20 11.25 20.56 11.25 21.25V25C11.25 26.3813 12.3688 27.5 13.75 27.5ZM17.7025 15.0262C14.3525 14.9913 15.585 14.9913 12.2962 15.0262C11.2262 13.6637 10 10.9875 10 9.81375C10 7.16 12.2425 5 15 5C17.7575 5 20 7.16 20 9.81375C20 10.9875 18.7738 13.6637 17.7025 15.0262ZM15 2.5C10.8575 2.5 7.5 5.775 7.5 9.81375C7.5 11.8512 9.275 15.485 10.815 17.1238C11.0612 17.385 11.3987 17.535 11.7575 17.5312C16.39 17.4837 18.2513 17.5325 18.2425 17.5312C18.6012 17.535 18.9387 17.385 19.185 17.1238C20.725 15.485 22.5 11.8512 22.5 9.81375C22.5 5.775 19.1425 2.5 15 2.5Z" />
    </svg>
  )
}

/**
 * Community / globe icon. Default size 24×24 (viewBox 0 0 25 25).
 */
export function CommunityIcon({
  className = '',
  width = defaultSize,
  height = defaultSize,
  fill = 'currentColor',
  ariaHidden = true,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M12.4472 0C4.99966 0 -0.91909 6.40875 0.11841 13.9062C0.77966 18.6838 4.40341 22.695 9.14966 23.96C10.9172 24.4312 12.7422 24.5312 14.5747 24.215C16.1047 23.95 17.6747 24.0688 19.1734 24.4438L20.9947 24.8988V24.8988C23.3559 25.49 25.5009 23.3887 24.8972 21.0737C24.8972 21.0737 24.5597 19.7787 24.5497 19.7375C24.1722 18.2875 24.0909 16.7563 24.4809 15.31C24.9634 13.5275 25.0447 11.5862 24.6109 9.575C23.4634 4.26875 18.5909 0 12.4472 0M12.4472 2.5C17.3872 2.5 21.2559 5.8875 22.1672 10.1038C22.5009 11.6488 22.4672 13.18 22.0684 14.6575C20.3809 20.8975 25.3147 23.4025 19.7797 22.0175C17.9384 21.5575 16.0197 21.4275 14.1484 21.7513C12.7047 22.0013 11.2422 21.93 9.79341 21.545C6.00966 20.5363 3.11591 17.3287 2.59466 13.5637C1.75591 7.49625 6.58591 2.5 12.4472 2.5V2.5" />
    </svg>
  )
}

/**
 * Prepare / clipboard list icon. Default size 24×24.
 */
export function PrepareIcon({
  className = '',
  width = defaultSize,
  height = defaultSize,
  fill = 'currentColor',
  ariaHidden = true,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}
