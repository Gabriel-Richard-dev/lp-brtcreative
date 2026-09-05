import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTilt3D } from '../hooks/useTilt3D'
import GhostCursor from './GhostCursor'
import artwork from '../assets/process/09-final.jpeg'

export default function FeaturedArt() {
  const tilt = useTilt3D(10)
  const wrapRef = useRef(null)

  useEffect(() => {
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

  return (
    <div className="hero__featured-wrap" ref={wrapRef}>
      <div
        className="hero__featured torn"
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <img src={artwork} alt="Arte finalizada BRTcreative" />
      </div>
      <GhostCursor label="Benício" className="hero__featured-cursor" />
    </div>
  )
}
