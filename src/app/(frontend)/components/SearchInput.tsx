'use client'

import type { ReactNode } from 'react'

/** Reusable search icon (magnifier) for SearchInput */
export function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.88889 0C3.98 0 0 3.98 0 8.88889C0 13.7978 3.98 17.7778 8.88889 17.7778C10.9427 17.7778 12.8339 17.0811 14.3391 15.9111L18.4289 20L20 18.4289L15.9108 14.3396C17.0809 12.8344 17.7778 10.9429 17.7778 8.88889C17.7778 3.98 13.7978 0 8.88889 0ZM2.22212 8.8889C2.22212 12.5656 5.21323 15.5556 8.88879 15.5556C12.5643 15.5556 15.5555 12.5656 15.5555 8.8889C15.5555 5.21335 12.5643 2.22223 8.88879 2.22223C5.21323 2.22223 2.22212 5.21335 2.22212 8.8889Z"
        fill="currentColor"
      />
    </svg>
  )
}

type SearchInputProps = {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  /** Optional icon rendered at the start of the field (e.g. search magnifier) */
  icon?: ReactNode
  className?: string
}

export function SearchInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon,
  className = '',
}: SearchInputProps) {
  const inputClass =
    'w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 ' +
    (icon ? 'pl-10 ' : '') +
    className.trim()

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {icon && (
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/90"
          aria-hidden
        >
          {icon}
        </span>
      )}
      <input
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  )
}
