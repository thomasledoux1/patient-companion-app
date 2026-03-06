'use client'

export type PeriodOption = { value: string; label: string }

const DEFAULT_PERIODS: PeriodOption[] = [
  { value: 'day', label: 'DAY' },
  { value: 'week', label: 'WEEK' },
  { value: 'month', label: 'MONTH' },
  { value: 'year', label: 'YEAR' },
]

const ChevronIcon = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.686014 0.732798C0.437995 0.990452 0.437995 1.40757 0.686014 1.66457L5.94465 7.11352C6.44132 7.62883 7.24706 7.62883 7.74374 7.11352L13.0412 1.62503C13.2866 1.37001 13.2898 0.958163 13.0475 0.69985C12.8001 0.436265 12.3925 0.432971 12.1413 0.692601L7.29412 5.71586C7.04547 5.97352 6.64291 5.97352 6.39426 5.71586L1.58524 0.732798C1.33722 0.475144 0.934669 0.475144 0.686014 0.732798Z"
      fill="currentColor"
    />
  </svg>
)

type PeriodSelectProps = {
  value: string
  onChange: (value: string) => void
  periods?: PeriodOption[]
  'aria-label': string
  className?: string
}

export function PeriodSelect({
  value,
  onChange,
  periods = DEFAULT_PERIODS,
  'aria-label': ariaLabel,
  className = '',
}: PeriodSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className={
          'w-full min-w-24 appearance-none rounded-lg border border-white/20 bg-white/10 py-1.5 pl-3 pr-8 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 ' +
          className
        }
      >
        {periods.map(({ value: v, label }) => (
          <option key={v} value={v} className="bg-background text-white">
            {label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white"
        aria-hidden
      >
        <ChevronIcon />
      </span>
    </div>
  )
}

export { DEFAULT_PERIODS as PERIODS }
