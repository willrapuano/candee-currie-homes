import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Candee Currie — Corcoran McEnearney Associate Broker in Northern Virginia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f7f6f4',
          color: '#181716',
          padding: '72px 82px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: 'Arial, sans-serif', fontSize: 22, letterSpacing: 5, textTransform: 'uppercase' }}>
          <span style={{ width: 54, height: 3, background: '#b3263e' }} />
          Corcoran McEnearney
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, letterSpacing: -3 }}>Candee Currie</div>
          <div style={{ width: 140, height: 5, background: '#db7184', margin: '26px 0 28px' }} />
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 30, letterSpacing: 2, textTransform: 'uppercase' }}>
            Associate Broker · Northern Virginia
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif', fontSize: 22, color: '#5c5751' }}>
          <span>Arlington · McLean · Falls Church · Alexandria</span>
          <span>candeecurriehomes.com</span>
        </div>
      </div>
    ),
    size,
  )
}
