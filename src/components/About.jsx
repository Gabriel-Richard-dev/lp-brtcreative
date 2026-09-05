import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import { portfolio } from '../data/portfolio'
import { isLowPowerDevice } from '../lib/performance'
import ToolDock from './ToolDock'

gsap.registerPlugin(ScrollTrigger)

const WHEEL = portfolio.slice(0, 7)

export default function About() {
  const ref = useReveal({ disabled: isLowPowerDevice() })
  const ringRef = useRef(null)

  useEffect(() => {
    const chips = gsap.utils.toArray('.about__wheel-chip')
    gsap.set(chips, { xPercent: -50, yPercent: -50 })

    // writes a transform to the ring AND all 7 chips on every scroll tick
    // across the whole section — real continuous cost, not worth it on
    // weaker hardware for a decorative spin
    if (isLowPowerDevice()) return

    const tween = gsap.to(ringRef.current, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
      onUpdate() {
        const r = gsap.getProperty(ringRef.current, 'rotation')
        chips.forEach((c) => gsap.set(c, { rotation: -r }))
      },
    })

    return () => tween.scrollTrigger?.kill()
  }, [ref])

  return (
    <section id="sobre" className="about torn" ref={ref}>
      <div className="container about__inner">
        <div>
          <p className="eyebrow" data-reveal>
            Sobre
          </p>
          <h2 className="about__title" data-reveal>
            Arte com a nossa cara, feita pra travar o dedo no scroll.
          </h2>
          <p className="about__text" data-reveal>
            A gente bola peça pra rede social, campanha de moda ou comunicação de igreja com o
            mesmo capricho: composição que funciona, tipografia que grita na medida certa e uma
            paleta que não trai a marca. Toda arte sai daqui com um motivo pra existir — vender,
            convidar ou arrancar aquele "uau".
          </p>
          <ToolDock data-reveal />
        </div>

        <div className="about__wheel" data-reveal>
          <div className="about__wheel-ring" ref={ringRef}>
            {WHEEL.map((item, i) => {
              const angle = (i / WHEEL.length) * 360
              const rad = (angle * Math.PI) / 180
              const x = 50 + Math.cos(rad) * 38
              const y = 50 + Math.sin(rad) * 38
              return (
                <div
                  className="about__wheel-chip torn"
                  key={item.src}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <img src={item.src} alt={item.title} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
