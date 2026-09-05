import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Lightbox({ item, onClose }) {
  const boxRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const entrances = [
      gsap.fromTo(
        '.lightbox__backdrop',
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' },
      ),
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'expo.out' },
      ),
    ]

    const onKey = (e) => e.key === 'Escape' && onCloseRef.current()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      entrances.forEach((a) => a.kill())
    }
  }, [])

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__backdrop" />
      <div className="lightbox__box" ref={boxRef} onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <div className="lightbox__caption">
          <span>{item.title}</span>
          <span className="lightbox__tag">{item.category}</span>
        </div>
        <button className="lightbox__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
      </div>
    </div>
  )
}
