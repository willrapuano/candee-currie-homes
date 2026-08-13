import { format, isValid } from 'date-fns'

/**
 * Sanity stores editorial publication dates as ISO timestamps, often at
 * midnight UTC. Treat the calendar portion as the authored date so readers in
 * western time zones do not see the previous day.
 */
export function formatPublishedDate(dateString: string | undefined, pattern: string): string {
  if (!dateString) return ''

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString)
  if (!match) return ''

  const [, year, month, day] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  return isValid(date) ? format(date, pattern) : ''
}
