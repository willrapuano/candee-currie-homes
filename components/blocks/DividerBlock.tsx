'use client'

export type DividerStyle = 'line' | 'dashed' | 'dots' | 'space'
export type DividerColor = 'gold' | 'navy'

interface DividerBlockProps {
  style?: DividerStyle
  color?: DividerColor
  className?: string
}

export function DividerBlock({ 
  style = 'line', 
  color = 'gold',
  className = '' 
}: DividerBlockProps) {
  const colorClasses = {
    gold: {
      line: 'border-gold',
      dashed: 'border-gold border-dashed',
      dots: 'bg-gold',
    },
    navy: {
      line: 'border-navy',
      dashed: 'border-navy border-dashed',
      dots: 'bg-navy',
    },
  }

  if (style === 'space') {
    return <div className={`h-12 ${className}`} />
  }

  if (style === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-2 my-8 ${className}`}>
        <span className={`w-2 h-2 rounded-full ${colorClasses[color].dots}`} />
        <span className={`w-2 h-2 rounded-full ${colorClasses[color].dots}`} />
        <span className={`w-2 h-2 rounded-full ${colorClasses[color].dots}`} />
      </div>
    )
  }

  return (
    <hr 
      className={`border-t-2 my-8 ${colorClasses[color][style]} ${className}`}
    />
  )
}
