'use client'

interface TableCell {
  _key?: string
  text: string
}

interface TableRow {
  _key?: string
  cells: TableCell[]
}

interface TableBlockProps {
  headers: TableCell[]
  rows: TableRow[]
  caption?: string
}

export function TableBlock({ headers, rows, caption }: TableBlockProps) {
  if (!headers || headers.length === 0) return null

  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-navy">
            {headers.map((header, index) => (
              <th 
                key={header._key || `th-${index}`}
                className="px-5 py-4 text-left font-serif text-white font-semibold text-sm tracking-wide"
              >
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Body */}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={row._key || `tr-${rowIndex}`}
              className={`${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-cream'
              } hover:bg-gold/5 transition-colors`}
            >
              {row.cells.map((cell, cellIndex) => (
                <td 
                  key={cell._key || `td-${rowIndex}-${cellIndex}`}
                  className="px-5 py-4 text-charcoal-muted text-sm border-b border-gray-100"
                >
                  {cell.text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        
        {/* Caption */}
        {caption && (
          <caption className="caption-bottom mt-3 text-left text-sm text-charcoal-muted italic">
            {caption}
          </caption>
        )}
      </table>
    </div>
  )
}
