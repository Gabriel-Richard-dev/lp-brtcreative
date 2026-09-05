import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useTilt3D } from '../hooks/useTilt3D'
import GhostCursor from './GhostCursor'
import artwork from '../assets/process/09-final.jpeg'

// the default path is tuned for the wide desktop card — on the narrower
// mobile card it would wander clean off the screen
const MOBILE_PATH = [
  { x: 0, y: 0 },
  { x: 110, y: 14 },
  { x: 125, y: 60 },
  { x: 20, y: 70 },
  { x: 0, y: 0 },
]

const TILT_MAX = 10

export default function FeaturedArt() {
  const tilt = useTilt3D(TILT_MAX)
  const wrapRef = useRef(null)
  const cardRef = useRef(null)
  const [isMobile] = useState(() => window.matchMedia('(max-width: 999px)').matches)

  useEffect(() => {
    // symmetric -10/+10 swing so the card rests centered on average,
    // instead of drifting from 0 to +10 and spending most of its time leaning right
    gsap.set(wrapRef.current, { rotateY: -10, rotateX: 4 })
    const tween = gsap.to(wrapRef.current, {
      rotateY: 10,
      rotateX: -4,
      duration: 3.4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
    return () => tween.kill()
  }, [])

  useEffect(() => {
    // no mouse on a phone — tilt the card with the device's orientation instead
    if (!isMobile || typeof DeviceOrientationEvent === 'undefined') return

    function onOrientation(e) {
      const card = cardRef.current
      if (!card || e.beta == null || e.gamma == null) return
      const px = Math.max(-1, Math.min(1, e.gamma / 45))
      const py = Math.max(-1, Math.min(1, (e.beta - 45) / 45))
      card.style.setProperty('--tilt-x', `${(-py * TILT_MAX).toFixed(2)}deg`)
      card.style.setProperty('--tilt-y', `${(px * TILT_MAX).toFixed(2)}deg`)
    }

    function start() {
      window.addEventListener('deviceorientation', onOrientation)
    }

    // iOS 13+ only grants motion access from a user gesture
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const onFirstTouch = () => {
        document.removeEventListener('touchend', onFirstTouch)
        DeviceOrientationEvent.requestPermission()
          .then((state) => state === 'granted' && start())
          .catch(() => {})
      }
      document.addEventListener('touchend', onFirstTouch, { once: true })
      return () => document.removeEventListener('touchend', onFirstTouch)
    }

    start()
    return () => window.removeEventListener('deviceorientation', onOrientation)
  }, [isMobile])

  return (
    <div className="hero__featured-wrap" ref={wrapRef}>
      <div
        className="hero__featured torn"
        ref={cardRef}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <span className="hero__featured-handle hero__featured-handle--tl" />
        <span className="hero__featured-handle hero__featured-handle--tr" />
        <span className="hero__featured-handle hero__featured-handle--bl" />
        <span className="hero__featured-handle hero__featured-handle--br" />
        <img src={artwork} alt="Arte finalizada BRTcreative" />
      </div>
      <GhostCursor
        label="Benício"
        path={isMobile ? MOBILE_PATH : undefined}
        className="hero__featured-cursor"
      />
    </div>
  )
}
