import { FaStar } from 'react-icons/fa'

const STATS = [
  { number: '241', label: 'Homes Sold', suffix: '' },
  { number: '$105M+', label: '5-Year Volume', suffix: '' },
  { number: '$1.1M', label: 'Avg. Sale Price', suffix: '' },
  { number: '5.0', label: 'Google Rating', suffix: '', icon: 'star' },
  { number: '14', label: 'Years in NoVA', suffix: '+' },
]

export function StatsBar() {
  return (
    <section className="bg-navy py-12">
      <div className="container-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center
                ${idx < STATS.length - 1 ? 'lg:border-r lg:border-white/10' : ''}`}
            >
              <div className="flex items-center gap-1.5">
                {stat.icon === 'star' && (
                  <FaStar className="text-gold text-2xl mb-1" />
                )}
                <span className="font-serif text-3xl md:text-4xl text-white font-bold">
                  {stat.number}
                </span>
                {stat.suffix && (
                  <span className="font-serif text-2xl text-gold font-bold">{stat.suffix}</span>
                )}
              </div>
              <span className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
