'use client'

import { useState, useMemo, useCallback } from 'react'
import { FaSearch, FaTh, FaList, FaSort, FaFilter, FaTimes, FaExternalLinkAlt, FaHome } from 'react-icons/fa'
import { ListingCard } from '@/components/shared/ListingCard'
import { REAL_LISTINGS } from '@/data/real-listings'
import type { Listing } from '@/types'

/*
 * IDX Frontend — Repliers-ready
 * ─────────────────────────────────────────────────────────────────────
 * Currently using real Zillow-sourced listings.
 * When REPLIERS_API_KEY is configured, swap REAL_LISTINGS for live API fetch.
 */

const CITIES = ['All Areas', 'Arlington', 'McLean', 'Falls Church', 'Alexandria', 'Vienna', 'Great Falls']
const PROPERTY_TYPES = ['All Types', 'Single Family', 'Condo', 'Townhouse']
const STATUSES = ['All', 'Active', 'Coming Soon']

const PRICE_BANDS = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $500K', min: 0, max: 500000 },
  { label: '$500K – $750K', min: 500000, max: 750000 },
  { label: '$750K – $1M', min: 750000, max: 1000000 },
  { label: '$1M – $1.5M', min: 1000000, max: 1500000 },
  { label: '$1.5M – $2.5M', min: 1500000, max: 2500000 },
  { label: '$2.5M+', min: 2500000, max: Infinity },
]

const BED_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+']
const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Sq Ft: Large to Small', value: 'sqft-desc' },
]

interface Filters {
  q: string
  city: string
  propertyType: string
  status: string
  priceBand: number
  beds: string
  sort: string
}

export function ListingSearch({ initialQuery = '' }: { initialQuery?: string }) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    q: initialQuery,
    city: 'All Areas',
    propertyType: 'All Types',
    status: 'All',
    priceBand: 0,
    beds: 'Any',
    sort: 'price-desc',
  })

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = () => {
    setFilters({ q: '', city: 'All Areas', propertyType: 'All Types', status: 'All', priceBand: 0, beds: 'Any', sort: 'price-desc' })
  }

  const filtered = useMemo<Listing[]>(() => {
    let results = [...REAL_LISTINGS]
    const band = PRICE_BANDS[filters.priceBand]

    // Text search
    if (filters.q.trim()) {
      const q = filters.q.toLowerCase()
      results = results.filter((l) =>
        l.address.street.toLowerCase().includes(q) ||
        l.address.city.toLowerCase().includes(q) ||
        l.address.zip.includes(q) ||
        l.address.neighborhood?.toLowerCase().includes(q)
      )
    }

    // City
    if (filters.city !== 'All Areas') {
      results = results.filter((l) => l.address.city === filters.city)
    }

    // Property type
    if (filters.propertyType !== 'All Types') {
      results = results.filter((l) => l.propertyType === filters.propertyType)
    }

    // Status
    if (filters.status !== 'All') {
      results = results.filter((l) => l.status === filters.status)
    }

    // Price
    results = results.filter((l) => l.price >= band.min && l.price <= band.max)

    // Beds
    if (filters.beds !== 'Any') {
      const minBeds = parseInt(filters.beds)
      results = results.filter((l) => l.beds >= minBeds)
    }

    // Sort
    switch (filters.sort) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break
      case 'price-desc': results.sort((a, b) => b.price - a.price); break
      case 'sqft-desc': results.sort((a, b) => b.sqft - a.sqft); break
    }

    return results
  }, [filters])

  const hasActiveFilters =
    filters.q !== '' ||
    filters.city !== 'All Areas' ||
    filters.propertyType !== 'All Types' ||
    filters.status !== 'All' ||
    filters.priceBand !== 0 ||
    filters.beds !== 'Any'

  return (
    <div>
      {/* Search bar */}
      <div className="bg-white shadow-md border-b border-gray-100 sticky top-[72px] z-40">
        <div className="container-xl py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-muted text-sm" />
              <input
                type="text"
                value={filters.q}
                onChange={(e) => updateFilter('q', e.target.value)}
                placeholder="Search address, neighborhood, city, or zip..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold text-charcoal placeholder:text-gray-400 bg-white text-sm"
              />
              {filters.q && (
                <button
                  onClick={() => updateFilter('q', '')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border text-sm font-semibold transition-all duration-200
                ${showFilters ? 'bg-navy text-white border-navy' : 'border-gray-200 text-charcoal hover:border-navy'}`}
            >
              <FaFilter className="text-xs" />
              Filters
              {hasActiveFilters && (
                <span className="bg-gold text-navy text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {[
                    filters.city !== 'All Areas',
                    filters.propertyType !== 'All Types',
                    filters.status !== 'All',
                    filters.priceBand !== 0,
                    filters.beds !== 'Any',
                  ].filter(Boolean).length}
                </span>
              )}
            </button>
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => setView('grid')}
                className={`p-3 transition-colors ${view === 'grid' ? 'bg-navy text-white' : 'text-charcoal-muted hover:text-navy'}`}
                aria-label="Grid view"
              >
                <FaTh className="text-sm" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-3 transition-colors ${view === 'list' ? 'bg-navy text-white' : 'text-charcoal-muted hover:text-navy'}`}
                aria-label="List view"
              >
                <FaList className="text-sm" />
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              <div>
                <label htmlFor="filter-city" className="form-label text-[11px]">Area</label>
                <select
                  id="filter-city"
                  value={filters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                  className="form-input text-sm py-2"
                >
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="filter-type" className="form-label text-[11px]">Type</label>
                <select
                  id="filter-type"
                  value={filters.propertyType}
                  onChange={(e) => updateFilter('propertyType', e.target.value)}
                  className="form-input text-sm py-2"
                >
                  {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="filter-price" className="form-label text-[11px]">Price Range</label>
                <select
                  id="filter-price"
                  value={filters.priceBand}
                  onChange={(e) => updateFilter('priceBand', Number(e.target.value))}
                  className="form-input text-sm py-2"
                >
                  {PRICE_BANDS.map((b, idx) => <option key={b.label} value={idx}>{b.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="filter-beds" className="form-label text-[11px]">Min Beds</label>
                <select
                  id="filter-beds"
                  value={filters.beds}
                  onChange={(e) => updateFilter('beds', e.target.value)}
                  className="form-input text-sm py-2"
                >
                  {BED_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="filter-status" className="form-label text-[11px]">Status</label>
                <select
                  id="filter-status"
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="form-input text-sm py-2"
                >
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 py-2"
                  >
                    <FaTimes className="text-[10px]" />
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results header */}
      <div className="container-xl py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="font-semibold text-navy">{filtered.length}</span>
            <span className="text-charcoal-muted ml-1">
              {filtered.length === 1 ? 'home' : 'homes'} found
              {filters.city !== 'All Areas' && ` in ${filters.city}`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-3 text-xs text-red-400 hover:text-red-500 font-semibold"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaSort className="text-charcoal-muted text-sm" />
            <select
              value={filters.sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="text-sm border border-gray-200 px-3 py-2 text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Listings */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <FaSearch className="text-gold/40 text-5xl mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-navy font-semibold mb-2">No homes found</h3>
            <p className="text-charcoal-muted mb-6">Try adjusting your filters or expanding your search area.</p>
            <button onClick={resetFilters} className="btn-gold">Clear All Filters</button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-10">
            {filtered.map((listing) => (
              <ListingListItem key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="border-t border-gray-100 pt-6">
          <p className="text-gray-400 text-xs leading-relaxed">
            Listing information is sourced from public records and may not reflect current availability.
            Contact Candee Currie to confirm status and schedule a private tour.
          </p>
        </div>
      </div>
    </div>
  )
}

// Compact list view card
function ListingListItem({ listing }: { listing: Listing }) {
  const href = listing.sourceUrl || `/homes-for-sale/${listing.id}`
  const isExternal = !!listing.sourceUrl

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="flex gap-4 bg-white shadow-card hover:shadow-card-hover transition-shadow p-4 overflow-hidden group"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-full border border-navy/10 bg-gradient-to-br from-navy/5 to-cream flex items-center justify-center">
        <FaHome className="text-navy/50 text-xl" />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 text-white
              ${listing.status === 'Active' ? 'bg-green-500' : listing.status === 'Coming Soon' ? 'bg-blue-500' : 'bg-amber-500'}`}>
              {listing.status}
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-navy/15 text-navy/70 bg-white">
              {listing.propertyType}
            </span>
            {isExternal && <FaExternalLinkAlt className="text-gray-300 text-xs" />}
          </div>
          <p className="font-serif text-2xl text-navy font-bold mt-2">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.price)}
          </p>
          <p className="text-charcoal font-medium text-sm">{listing.address.street}</p>
          <p className="text-charcoal-muted text-xs">{listing.address.city}, {listing.address.state} {listing.address.zip}</p>
        </div>
        <div className="flex items-center gap-4 text-charcoal-muted text-sm mt-1 flex-wrap">
          <span>{listing.beds} bd</span>
          <span className="w-px h-3 bg-gray-200" />
          <span>{listing.baths} ba</span>
          <span className="w-px h-3 bg-gray-200" />
          <span>{listing.sqft.toLocaleString()} sqft</span>
          {listing.source && (
            <span className="ml-auto text-gray-300 text-[10px]">Source: {listing.source}</span>
          )}
        </div>
      </div>
    </a>
  )
}
