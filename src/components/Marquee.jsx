const ITEMS = [
  'Direção de Arte',
  'Social Media',
  'Identidade Visual',
  'Campanhas',
  'Recorte & Colagem',
  'Comunicação de Igreja',
]

const ITEMS_ALT = ['Feed', 'Stories', 'Carrossel', 'Branding', 'Editorial', 'Print']

function Row({ items, reverse }) {
  const track = [...items, ...items]
  return (
    <div className="marquee__track" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {track.map((item, i) => (
        <span className="marquee__item" key={`${item}-${i}`}>
          {item}
          <span className="marquee__dot">✦</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-stack">
      <div className="marquee torn">
        <Row items={ITEMS} />
      </div>
      <div className="marquee torn marquee--accent">
        <Row items={ITEMS_ALT} reverse />
      </div>
    </div>
  )
}
