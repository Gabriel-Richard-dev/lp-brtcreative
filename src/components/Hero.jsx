import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../data/portfolio'
import Spotlight from './Spotlight'
import FlipWords from './FlipWords'
import CircularText from './CircularText'
import FeaturedArt from './FeaturedArt'

gsap.registerPlugin(ScrollTrigger)

const VERBS = ['vendem', 'convertem', 'engajam', 'param o feed']

// 8 corners for desktop's wider canvas — the last four only ever show on
// mobile up to nth-child(4), see .hero__floats > :nth-child(5..8){display:none}
const FLOATS = [
  { top: '6%', left: '68%', rot: 7, w: 160, fall: 480, index: 0 },
  { top: '56%', left: '70%', rot: -5, w: 120, fall: 300, index: 1 },
  { top: '30%', left: '8%', rot: -6, w: 130, fall: 260, index: 2 },
  { top: '80%', left: '55%', rot: 5, w: 110, fall: 340, index: 3 },
  { top: '4%', left: '30%', rot: -4, w: 100, fall: 220, index: 4 },
  { top: '45%', left: '88%', rot: 6, w: 120, fall: 400, index: 5 },
  { top: '72%', left: '15%', rot: 4, w: 110, fall: 280, index: 6 },
  { top: '88%', left: '80%', rot: -7, w: 100, fall: 320, index: 7 },
]

const showcase = portfolio.slice(2, 2 + FLOATS.length)

export default function Hero() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const words = rootRef.current.querySelectorAll('.hero__word')
    const isMobile = window.matchMedia('(max-width: 999px)').matches
    // the extra 4 corner stamps are display:none on mobile (CSS) but GSAP
    // doesn't know that — it'll happily keep computing 2 infinite tweens per
    // float forever regardless of visibility, which was the real battery/CPU
    // drain on phones. Only animate the ones actually shown there.
    const floats = gsap.utils.toArray('.hero__float').slice(0, isMobile ? 4 : undefined)
    // sizing itself now scales via CSS (--float-w clamp), so GSAP only owns motion, not scale
    const baseScale = 1

    const entrances = [
      animate(words, {
        opacity: [0, 1],
        translateY: [48, 0],
        rotate: [4, 0],
        duration: 900,
        delay: stagger(70),
        ease: 'outExpo',
      }),
      animate('.hero__sub, .hero__cta', {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 700,
        delay: stagger(90, { start: 500 }),
        ease: 'outQuad',
      }),
    ]

    const quickX = []
    const quickRotate = []

    const ctx = gsap.context(() => {
      floats.forEach((el, i) => {
        const fall = Number(el.dataset.fall)
        const inner = el.querySelector('.hero__float-inner')

        // GSAP is the single owner of this element's transform — mixing in
        // animejs or a CSS media-query scale here gets clobbered on first scroll tick.
        gsap.set(el, { scale: baseScale })
        gsap.from(el, {
          opacity: 0,
          scale: baseScale * 0.7,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
        })
        // scale isn't driven here — it's already owned by the gsap.set/from
        // above. Scrubbing it a second time via scroll fought that entrance
        // tween for the same property, reading as a sudden size jump the
        // moment you started scrolling.
        //
        // scrub ties this to the scroll listener firing continuously — fine
        // on desktop, but on a weaker mobile CPU it's a big chunk of the jank.
        // Ambient stamps on mobile just sit there instead.
        if (!isMobile) {
          gsap.to(el, {
            yPercent: fall,
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top top',
              end: '+=900',
              scrub: 0.6,
            },
          })
        }
        // one combined idle sway instead of two separate infinite tweens per
        // float — same effect, half the ongoing animation work. On desktop
        // it idles between pointermove events, which drive quickX/quickRotate
        // on top of it.
        gsap.to(inner, {
          y: -10,
          x: 10,
          rotation: 6,
          duration: 2.8 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })

        const depth = 14 + i * 4
        quickX.push(gsap.quickTo(inner, 'x', { duration: 0.7, ease: 'power3' }))
        quickRotate.push(
          gsap.quickTo(inner, 'rotation', { duration: 0.7, ease: 'power3' }),
        )
        quickX[i].depth = depth
      })
    }, rootRef)

    const onPointerMove = (e) => {
      const rect = stageRef.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      quickX.forEach((q) => q(px * q.depth))
      quickRotate.forEach((q) => q(px * 4))
    }
    stageRef.current.addEventListener('pointermove', onPointerMove)

    const badgeTrigger = ScrollTrigger.create({
      trigger: '#top',
      start: 'top top',
      end: '+=150',
      onLeave: () => gsap.to('.hero__featured-badge', { opacity: 0, duration: 0.3 }),
      onEnterBack: () => gsap.to('.hero__featured-badge', { opacity: 1, duration: 0.3 }),
    })

    return () => {
      entrances.forEach((a) => a.cancel())
      stageRef.current?.removeEventListener('pointermove', onPointerMove)
      badgeTrigger.kill()
      ctx.revert()
    }
  }, [])

  return (
    <Spotlight className="hero" id="top">
      <section ref={rootRef}>
        <div className="hero__stage" id="hero-stage" ref={stageRef}>
          <div className="hero__floats">
            {FLOATS.map((f, i) => (
              <div
                className={`hero__float torn${i === 0 ? ' design-chrome--active' : ''}`}
                key={f.index}
                data-fall={f.fall}
                style={{
                  top: f.top,
                  left: f.left,
                  '--float-w': `${f.w}px`,
                  '--rot': `${f.rot}deg`,
                }}
              >
                <div className="hero__float-inner">
                  <img src={showcase[i].src} alt={showcase[i].title} loading="eager" />
                </div>
                {i === 0 && (
                  <>
                    <span className="design-select" />
                    <span className="design-tag">{showcase[i].title.toLowerCase()}.psd</span>
                    <span className="design-handle design-handle--tl" />
                    <span className="design-handle design-handle--tr" />
                    <span className="design-handle design-handle--bl" />
                    <span className="design-handle design-handle--br" />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="container hero__inner">
            <div className="hero__copy">
              <div className="hero__frame">
                <span className="hero__frame-handle hero__frame-handle--tl" />
                <span className="hero__frame-handle hero__frame-handle--tr" />
                <span className="hero__frame-handle hero__frame-handle--bl" />
                <span className="hero__frame-handle hero__frame-handle--br" />
                <span className="hero__frame-resize">↗</span>
              </div>

              <h1 className="hero__title">
                {'Artes que'.split(' ').map((w) => (
                  <span className="hero__word" key={w}>
                    {w}{' '}
                  </span>
                ))}
                <span className="hero__word hero__word--accent">
                  <FlipWords words={VERBS} />
                </span>
              </h1>
              <p className="hero__sub">
                BRTcreative cria identidade visual, social media e peças de campanha para marcas e
                igrejas que querem parar o feed. Direção de arte pensada pra converter.
              </p>
              <div className="hero__cta">
                <a href="#contato" className="btn btn--primary">
                  Iniciar projeto
                </a>
                <a href="#trabalhos" className="btn btn--ghost">
                  Ver portfólio
                </a>
              </div>

              <CircularText
                text="BRTCREATIVE • DIREÇÃO DE ARTE • "
                className="hero__badge"
                icon="↓"
              />

              <span className="hero__featured-badge" aria-hidden="true">
                ↓
              </span>
            </div>

            <FeaturedArt />
          </div>
        </div>
      </section>
    </Spotlight>
  )
}
