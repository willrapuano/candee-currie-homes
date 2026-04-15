'use client'

import { useEffect, useId, useRef, useState } from 'react'

type Suggestion = {
  label: string
  street: string
  city: string
  zip: string
  state: string
}

type Props = {
  id?: string
  value: string
  onChange: (value: string) => void
  onSelect?: (suggestion: Suggestion) => void
  placeholder?: string
  className?: string
  autoComplete?: string
  required?: boolean
  name?: string
}

export function AddressAutocompleteInput({
  id,
  value,
  onChange,
  onSelect,
  placeholder = 'Enter address',
  className = 'form-input',
  autoComplete = 'street-address',
  required,
  name,
}: Props) {
  const generatedId = useId()
  const inputId = id || generatedId
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const query = value.trim()
    if (query.length < 3) {
      setSuggestions([])
      setOpen(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/address-autocomplete?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
        const data = await res.json().catch(() => ({ results: [] }))
        const results = Array.isArray(data?.results) ? data.results : []
        setSuggestions(results)
        setOpen(results.length > 0)
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([])
          setOpen(false)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, 250)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [value])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleSelect = (suggestion: Suggestion) => {
    onChange(suggestion.street || suggestion.label)
    onSelect?.(suggestion)
    setSuggestions([])
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        id={inputId}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          if (!open && e.target.value.trim().length >= 3) setOpen(true)
        }}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true)
        }}
        placeholder={placeholder}
        className={className}
        autoComplete={autoComplete}
        required={required}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={`${inputId}-suggestions`}
      />

      {loading && value.trim().length >= 3 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          Searching…
        </div>
      )}

      {open && suggestions.length > 0 && (
        <div
          id={`${inputId}-suggestions`}
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl"
        >
          <ul className="max-h-72 overflow-y-auto py-1">
            {suggestions.map((suggestion, index) => (
              <li key={`${suggestion.label}-${index}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(suggestion)}
                  className="block w-full px-4 py-3 text-left hover:bg-cream focus:bg-cream focus:outline-none"
                >
                  <div className="text-sm font-medium text-navy">
                    {suggestion.street || suggestion.label}
                  </div>
                  <div className="text-xs text-charcoal-muted">
                    {[suggestion.city, suggestion.state, suggestion.zip].filter(Boolean).join(', ').replace(', ', ' ')}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
