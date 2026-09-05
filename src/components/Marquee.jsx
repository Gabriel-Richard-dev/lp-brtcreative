import { isLowPowerDevice } from '../lib/performance'

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
  const style = { animationDirection: reverse ? 'reverse' : undefined }
  // a clipped, rotated ancestor (.torn) plus a track animating forever
  // underneath it is expensive to keep compositing on weaker hardware —
  // freeze the ticker there instead of scrolling it nonstop
  if (isLowPowerDevice()) style.animationPlayState = 'paused'
  return (
    <div className="marquee__track" style={style}>
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
