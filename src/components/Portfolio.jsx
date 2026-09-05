import { useEffect, useMemo, useRef, useState } from 'react'
import { animate } from 'animejs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio, categories } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { useTilt3D } from '../hooks/useTilt3D'
import Lightbox from './Lightbox'

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const [filter, setFilter] = useState('Todos')
  const [active, setActive] = useState(null)
  const ref = useReveal({ targets: '.portfolio__head' })
  const gridRef = useRef(null)
  useReveal({ targets: '.portfolio__card', stagger: 60, watch: [filter], rootRef: gridRef })
  const tilt = useTilt3D()

  const items = useMemo(
    () => (filter === 'Todos' ? portfolio : portfolio.filter((p) => p.category === filter)),
    [filter],
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.portfolio__frame img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })
    }, gridRef)
    return () => ctx.revert()
  }, [items])

  function handleHover(e, entering) {
    animate(e.currentTarget.querySelector('.portfolio__frame'), {
      scale: entering ? 1.08 : 1,
      duration: 500,
      ease: 'outQuad',
    })
  }

  return (
    <section id="trabalhos" className="portfolio" ref={ref}>
      <div className="container">
        <div className="portfolio__head" data-reveal>
          <p className="eyebrow">Portfólio</p>
          <h2 className="portfolio__title">Trabalhos selecionados</h2>

          <div className="portfolio__filters">
            {categories.map((c) => (
              <button
                key={c}
                className={`chip ${filter === c ? 'chip--active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio__grid" key={filter} ref={gridRef}>
          {items.map((item) => (
            <button
              className="portfolio__card torn"
              data-reveal
              key={item.src}
              onClick={() => setActive(item)}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={(e) => {
                tilt.onMouseLeave(e)
                handleHover(e, false)
              }}
              onMouseEnter={(e) => handleHover(e, true)}
            >
              <div className="portfolio__frame">
                <img src={item.src} alt={item.title} loading="lazy" />
              </div>
              <div className="portfolio__card-overlay">
                <span>{item.title}</span>
                <span className="portfolio__card-tag">{item.category}</span>
              </div>
              <span className="design-select" />
              <span className="design-tag">{item.title.toLowerCase()}.psd</span>
              <span className="design-handle design-handle--tl" />
              <span className="design-handle design-handle--tr" />
              <span className="design-handle design-handle--bl" />
              <span className="design-handle design-handle--br" />
            </button>
          ))}
        </div>
      </div>

      {active && <Lightbox item={active} onClose={() => setActive(null)} />}
    </section>
  )
}
