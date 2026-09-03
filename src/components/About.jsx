import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '../hooks/useReveal'
import { portfolio } from '../data/portfolio'
import ToolDock from './ToolDock'

gsap.registerPlugin(ScrollTrigger)

const WHEEL = portfolio.slice(0, 7)

export default function About() {
  const ref = useReveal()
  const ringRef = useRef(null)

  useEffect(() => {
    const chips = gsap.utils.toArray('.about__wheel-chip')
    gsap.set(chips, { xPercent: -50, yPercent: -50 })

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
            Direção de arte com identidade própria, feita pra parar o polegar.
          </h2>
          <p className="about__text" data-reveal>
            A BRTcreative desenha peças para redes sociais, campanhas de moda e comunicação de
            igreja com o mesmo cuidado: composição limpa, tipografia forte e uma paleta que
            respeita a marca. Cada arte nasce de um objetivo — vender, convidar ou emocionar.
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
