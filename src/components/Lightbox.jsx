import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export default function Lightbox({ item, onClose }) {
  const boxRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const entrances = [
      animate('.lightbox__backdrop', { opacity: [0, 1], duration: 250, ease: 'outQuad' }),
      animate(boxRef.current, {
        opacity: [0, 1],
        scale: [0.94, 1],
        duration: 350,
        ease: 'outExpo',
      }),
    ]

    const onKey = (e) => e.key === 'Escape' && onCloseRef.current()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      entrances.forEach((a) => a.cancel())
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
