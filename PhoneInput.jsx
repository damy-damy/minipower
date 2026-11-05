
import { useState, useRef, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Search, ChevronDown, Check, X } from 'lucide-react'
import { COUNTRIES, DEFAULT_COUNTRY } from '../data/countries'

export default function PhoneInput({
  id = 'register-phone',
  value = '',
  onChange,
  onBlur,
  error,
  selectedCountry = DEFAULT_COUNTRY,
  onCountryChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownStyle, setDropdownStyle] = useState({})

  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)
  const phoneInputRef = useRef(null)

  // Filter countries
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES

    const q = searchQuery.toLowerCase().trim()

    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    const screenPadding = 8
    const dropdownWidth = Math.min(340, window.innerWidth - screenPadding * 2)
    const dropdownHeight = 300

    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    const openUpwards =
      spaceBelow < dropdownHeight && spaceAbove > spaceBelow

    const left = Math.max(
      screenPadding,
      Math.min(
        rect.left,
        window.innerWidth - dropdownWidth - screenPadding
      )
    )

    setDropdownStyle({
      position: 'fixed',
      left,
      width: dropdownWidth,
      zIndex: 99999,
      ...(openUpwards
        ? {
          bottom: window.innerHeight - rect.top + 8,
          maxHeight: Math.max(150, spaceAbove - 16),
        }
        : {
          top: rect.bottom + 8,
          maxHeight: Math.max(150, spaceBelow - 16),
        }),
    })
  }

  // Close dropdown
  const closeDropdown = () => {
    setIsOpen(false)
    setSearchQuery('')
  }

  // Open and close dropdown
  const toggleDropdown = () => {
    if (disabled) return

    if (isOpen) {
      closeDropdown()
    } else {
      updateDropdownPosition()
      setIsOpen(true)
    }
  }

  // Focus search when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Update position on scroll and resize
  useEffect(() => {
    if (!isOpen) return

    const handlePositionUpdate = () => {
      updateDropdownPosition()
    }

    window.addEventListener('resize', handlePositionUpdate)
    window.addEventListener('scroll', handlePositionUpdate, true)

    return () => {
      window.removeEventListener('resize', handlePositionUpdate)
      window.removeEventListener('scroll', handlePositionUpdate, true)
    }
  }, [isOpen])

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      const clickedInsideInput =
        containerRef.current?.contains(event.target)

      const clickedInsideDropdown =
        dropdownRef.current?.contains(event.target)

      if (!clickedInsideInput && !clickedInsideDropdown) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  // Close with Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeDropdown()
        phoneInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Select country
  const handleSelectCountry = (country) => {
    onCountryChange?.(country)
    closeDropdown()
    phoneInputRef.current?.focus()
  }

  // Handle phone input
  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^\d\s-]/g, '')
    onChange?.(val)
  }

  return (
    <>
      <div
        ref={containerRef}
        className={`relative w-full ${isOpen ? 'z-[9999]' : ''}`}
      >
        {/* Phone input container */}
        <div
          className={`relative flex items-center rounded-xl border transition-all duration-200 bg-gray-50 focus-within:bg-white focus-within:shadow-sm ${error
            ? 'border-green-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100'
            : 'border-gray-200 focus-within:border-green-400   focus-within:ring-2 focus-within:ring-green-100'
            }`}
        >
          {/* Country selector */}
          <button
            type="button"
            onClick={toggleDropdown}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
            className="flex items-center gap-2 px-3 py-2.5 sm:py-3 border-r border-gray-200 bg-gray-50/70 hover:bg-gray-100/70 active:bg-gray-200/50 transition-colors duration-150 rounded-l-xl focus:outline-none select-none shrink-0"
          >
            <span
              className={`fi fi-${selectedCountry.code.toLowerCase()} shrink-0 rounded-[2px]`}
              title={selectedCountry.name}
            />

            <span className="font-mono text-xs sm:text-sm font-semibold text-gray-700">
              {selectedCountry.dialCode}
            </span>

            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-green-600' : ''
                }`}
            />
          </button>

          {/* Phone number input */}
          <input
            ref={phoneInputRef}
            id={id}
            type="tel"
            autoComplete="tel-national"
            disabled={disabled}
            placeholder={selectedCountry.placeholder || 'Enter phone number'}
            value={value}
            onChange={handleInputChange}
            onBlur={onBlur}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            className="w-full pl-3 pr-4 py-2.5 sm:py-3 rounded-r-xl text-sm text-gray-800 placeholder:text-gray-400 bg-transparent outline-none transition-colors"
          />
        </div>
      </div>

      {/* Country dropdown rendered outside registration card */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Select Country"
            style={dropdownStyle}
            className="bg-white border border-green-200 rounded-2xl shadow-2xl shadow-gray-300/50 overflow-hidden"
          >
            {/* Search */}
            <div className="p-2.5 border-b border-gray-100 bg-gray-50">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400">
                  <Search size={15} />
                </span>

                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search country or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Country options */}
            <div
              className="overflow-y-auto divide-y divide-gray-50 scrollbar-thin"
              style={{ maxHeight: dropdownStyle.maxHeight || 280 }}
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const isSelected =
                    country.code === selectedCountry.code

                  return (
                    <button
                      key={country.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectCountry(country)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${isSelected
                        ? 'bg-green-50 text-green-800 font-semibold'
                        : 'bg-white text-gray-700 hover:bg-green-50/70'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-3">
                        <span
                          className={`fi fi-${country.code.toLowerCase()} shrink-0 rounded-[2px]`}
                          title={country.name}
                        />

                        <span className="text-sm truncate">
                          {country.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs text-gray-400">
                          {country.dialCode}
                        </span>

                        {isSelected && (
                          <Check
                            size={15}
                            className="text-green-600 stroke-[2.5]"
                          />
                        )}
                      </div>
                    </button>
                  )
                })
              ) : (
                <div className="p-4 text-center text-sm text-gray-400">
                  No countries found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
