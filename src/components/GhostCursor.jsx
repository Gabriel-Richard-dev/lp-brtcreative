import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import cursorPng from '../assets/ui/cursor.png'

// closed loop — first and last point match, so the cycle repeats with no jump-cut
const DEFAULT_PATH = [
  { x: 0, y: 0 },
  { x: 300, y: 30 },
  { x: 340, y: 130 },
  { x: 60, y: 160 },
  { x: 0, y: 0 },
]

export default function GhostCursor({ label = 'Benício', path = DEFAULT_PATH, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
    path.forEach((p) => {
      tl.to(ref.current, { x: p.x, y: p.y, duration: 1.7, ease: 'power1.inOut' })
    })
    return () => tl.kill()
  }, [path])

  return (
    <div className={`ghost-cursor ${className}`} ref={ref}>
      <img src={cursorPng} alt="" className="ghost-cursor__arrow" />
      <span className="ghost-cursor__tag">{label}</span>
    </div>
  )
}
