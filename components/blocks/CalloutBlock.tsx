'use client'

import { FaInfoCircle, FaLightbulb, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'success'

interface CalloutBlockProps {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
}

const variantConfig = {
  info: {
    borderColor: 'border-navy',
    iconColor: 'text-navy',
    bgColor: 'bg-navy/5',
    Icon: FaInfoCircle,
  },
  tip: {
    borderColor: 'border-gold',
    iconColor: 'text-gold',
    bgColor: 'bg-gold/5',
    Icon: FaLightbulb,
  },
  warning: {
    borderColor: 'border-amber-500',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    Icon: FaExclamationTriangle,
  },
  success: {
    borderColor: 'border-emerald-600',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    Icon: FaCheckCircle,
  },
}

export function CalloutBlock({ 
  variant = 'info', 
  title, 
  children 
}: CalloutBlockProps) {
  const config = variantConfig[variant]
  const Icon = config.Icon

  return (
    <div className={`border-l-4 ${config.borderColor} ${config.bgColor} p-5 my-6`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={`${config.iconColor} text-lg`} />
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-serif text-lg font-semibold ${config.iconColor} mb-2`}>
              {title}
            </h4>
          )}
          <div className="text-charcoal-muted leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
