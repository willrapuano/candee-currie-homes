'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'

interface Props {
  photos: string[]
  address: string
}

export function PhotoGallery({ photos, address }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="w-full aspect-[16/7] bg-cream flex items-center justify-center">
        <span className="text-charcoal-muted">No photos available</span>
      </div>
    )
  }

  const main = photos[0]
  const thumbs = photos.slice(1, 5)

  const prev = () => setActiveIdx((i) => (i === 0 ? photos.length - 1 : i - 1))
  const next = () => setActiveIdx((i) => (i === photos.length - 1 ? 0 : i + 1))

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-h-[70vh] overflow-hidden">
        {/* Main photo */}
        <div
          className="relative aspect-video md:aspect-auto md:row-span-2 cursor-pointer group"
          onClick={() => { setActiveIdx(0); setLightboxOpen(true) }}
        >
          <Image
            src={main}
            alt={`${address} — main photo`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
          <button className="absolute bottom-4 right-4 bg-white/90 text-navy px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-white transition-colors">
            <FaExpand className="text-xs" />
            View All {photos.length} Photos
          </button>
        </div>

        {/* Thumbnails */}
        <div className="hidden md:grid grid-cols-2 gap-1">
          {thumbs.map((photo, idx) => (
            <div
              key={idx}
              className="relative aspect-video cursor-pointer group overflow-hidden"
              onClick={() => { setActiveIdx(idx + 1); setLightboxOpen(true) }}
            >
              <Image
                src={photo}
                alt={`${address} — photo ${idx + 2}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
              {idx === thumbs.length - 1 && photos.length > 5 && (
                <div className="absolute inset-0 bg-navy/60 flex items-center justify-center">
                  <span className="text-white font-serif text-xl font-bold">+{photos.length - 5}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            aria-label="Close gallery"
          >
            <FaTimes className="text-2xl" />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
            aria-label="Previous photo"
          >
            <FaChevronLeft className="text-3xl" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video mx-16">
            <Image
              src={photos[activeIdx]}
              alt={`${address} — photo ${activeIdx + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
            aria-label="Next photo"
          >
            <FaChevronRight className="text-3xl" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {activeIdx + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
