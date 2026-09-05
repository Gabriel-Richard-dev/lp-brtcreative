import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DraggableCardBody, DraggableCardContainer } from './ui/draggable-card'
import { portfolio } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const picks = portfolio.slice(2, 10)

const CORNERS = [
  { top: '20%', left: '2%', rot: '-8deg' },
  { top: '16%', right: '2%', rot: '6deg' },
  { top: '46%', left: '1%', rot: '4deg' },
  { top: '44%', right: '1%', rot: '-6deg' },
  { top: '3%', left: '11%', rot: '5deg' },
  { bottom: '3%', right: '10%', rot: '-4deg' },
  { bottom: '10%', left: '3%', rot: '5deg' },
  { bottom: '8%', right: '3%', rot: '-5deg' },
]

function tuckOffset(corner) {
  const x = corner.left !== undefined ? -150 : corner.right !== undefined ? 150 : 0
  const y = corner.top !== undefined ? -150 : corner.bottom !== undefined ? 150 : 0
  return { x, y }
}

export default function DraggableGallery() {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    const slots = gsap.utils.toArray('.drag-scatter__slot')

    slots.forEach((slot, i) => {
      const { x, y } = tuckOffset(CORNERS[i])
      gsap.fromTo(
        slot,
        { x, y, scale: 0.4, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.7, delay: 0.4 + i * 0.08, ease: 'back.out(1.6)' },
      )
    })

    const trigger = ScrollTrigger.create({
      trigger: '#top',
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        el.style.pointerEvents = 'none'
        slots.forEach((slot, i) => {
          const { x, y } = tuckOffset(CORNERS[i])
          gsap.to(slot, { x, y, scale: 0.4, opacity: 0, duration: 0.55, ease: 'power2.in' })
        })
      },
      onEnterBack: () => {
        el.style.pointerEvents = ''
        slots.forEach((slot) => {
          gsap.to(slot, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' })
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <DraggableCardContainer className="drag-scatter" ref={rootRef}>
      {picks.map((item, i) => (
        <div
          className="drag-scatter__slot"
          key={item.src}
          style={{ ...CORNERS[i], '--rot': CORNERS[i].rot }}
        >
          <DraggableCardBody className="drag-scatter__card torn p-0 min-h-0 w-[clamp(80px,7vw,110px)] aspect-[3/4] rounded-none bg-transparent shadow-none dark:bg-transparent">
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover pointer-events-none"
              draggable={false}
            />
          </DraggableCardBody>
        </div>
      ))}
    </DraggableCardContainer>
  )
}
