export function MarketStats() {
  const stats = [
    { label: 'Median List Price', value: '$885,000', change: '+4.2%', up: true },
    { label: 'Avg. Days on Market', value: '12 days', change: '-3 days', up: true },
    { label: 'New Listings (30d)', value: '284', change: '+18%', up: true },
    { label: 'Homes with Price Cuts', value: '9%', change: '-2%', up: true },
    { label: 'Sale-to-List Ratio', value: '101.3%', change: '+0.8%', up: true },
    { label: 'Months of Supply', value: '1.4', change: '-0.2', up: true },
  ]

  return (
    <section className="section-padding-sm bg-white border-y border-gray-100">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <p className="section-label">Real-Time Data</p>
            <h2 className="font-serif text-2xl md:text-3xl text-navy font-bold">
              Northern Virginia Market at a Glance
            </h2>
          </div>
          <p className="text-charcoal-muted text-sm">
            Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-cream p-4 border-l-2 border-gold">
              <p className="font-serif text-2xl font-bold text-navy mb-0.5">{stat.value}</p>
              <p className="text-charcoal-muted text-xs leading-tight mb-2">{stat.label}</p>
              <span className={`text-xs font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change} YoY
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
