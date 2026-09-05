import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function FlipWords({ words, duration = 2200, className = '' }) {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), duration)
    return () => clearInterval(id)
  }, [words.length, duration])

  useEffect(() => {
    // React already swaps the text node before this runs, so there's no old
    // word left to animate out (unlike AnimatePresence's two-node crossfade)
    // — just play the entrance each time the word changes.
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 16, rotate: -3, filter: 'blur(6px)' },
      { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)', duration: 0.45, ease: 'expo.out' },
    )
    return () => tween.kill()
  }, [index])

  return (
    <span ref={ref} className={`flip-word ${className}`}>
      {words[index]}
    </span>
  )
}
