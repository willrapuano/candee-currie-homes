import { FaStar } from 'react-icons/fa'

const PLATFORMS = [
  {
    name: 'Google',
    rating: '5.0',
    count: '4',
    color: 'bg-white',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-label="Google">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'Zillow',
    rating: '5.0',
    count: '12',
    color: 'bg-white',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-label="Zillow">
        <path d="M12 2L2 9.5l1.4 1.9L12 5.1l8.6 6.3L22 9.5 12 2z" fill="#006AFF"/>
        <path d="M12 8.5L5 13.5V22h4v-5.5h6V22h4v-8.5L12 8.5z" fill="#006AFF"/>
      </svg>
    ),
  },
  {
    name: 'Realtor.com',
    rating: '5.0',
    count: '8',
    color: 'bg-white',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-label="Realtor.com">
        <circle cx="12" cy="12" r="10" fill="#D92228"/>
        <path d="M8 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4H8V8zm2 6h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2v4z" fill="white"/>
        <path d="M14 14l2 2h-2l-1.5-2H14z" fill="white"/>
      </svg>
    ),
  },
]

export function ReviewBadges() {
  return (
    <section className="bg-[#f0f6f0] py-16 border-t border-b border-[#d8edda]">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold mb-2">
            We&apos;ve Helped <span className="text-gold">241 Families</span> Just Like Yours
          </h2>
          <p className="text-charcoal-muted text-lg">
            Consistently rated 5 stars across every platform — because results speak louder than promises.
          </p>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="bg-white border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-card transition-shadow duration-300"
            >
              {/* Platform icon */}
              <div className="mb-3">{platform.icon}</div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-1">
                {[1,2,3,4,5].map((s) => (
                  <FaStar key={s} className="text-[#FFC107] text-sm" />
                ))}
              </div>

              {/* Rating */}
              <p className="font-serif text-3xl font-bold text-navy">{platform.rating}</p>
              <p className="text-charcoal-muted text-xs mt-0.5">{platform.count} reviews on {platform.name}</p>
            </div>
          ))}
        </div>

        {/* Overall stats */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-gold/30 px-8 py-4 shadow-sm">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <FaStar key={s} className="text-gold text-lg" />
              ))}
            </div>
            <span className="font-serif text-2xl font-bold text-navy">5.0</span>
            <span className="text-charcoal-muted text-sm">Overall Rating · 100% Would Recommend</span>
          </div>
        </div>
      </div>
    </section>
  )
}
