import { useEffect, useRef, useState } from 'react'
import {
  IconBookmark,
  IconBrush,
  IconChevronRight,
  IconDots,
  IconHeart,
  IconMessageCircle,
  IconSend2,
} from '@tabler/icons-react'
import { StickyScroll } from './ui/sticky-scroll-reveal'

const stepFiles = import.meta.glob('../assets/process/*', { eager: true, query: '?url', import: 'default' })
const steps = Object.entries(stepFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

const lastIndex = steps.length - 1

const CONTENT = [
  { title: 'Textura' },
  { title: 'Referência' },
  { title: 'Título' },
  { title: 'Headline' },
  { title: 'Assinatura gráfica' },
  { title: 'Ícones & referências' },
  { title: 'Recorte' },
  { title: 'Ilustração' },
  { title: 'Arte finalizada' },
].map((step, i) => {
  const isFinal = i === lastIndex
  return {
    ...step,
    content: (
      <div className={`process__canvas ${isFinal ? 'process__canvas--final' : ''}`}>
        {isFinal ? (
          <div className="process__chrome-top process__chrome-top--ig">
            <span className="process__chrome-avatar" />
            <span className="process__chrome-label">brtcreative</span>
            <IconDots size={16} className="process__chrome-menu" />
          </div>
        ) : (
          <div className="process__ps-chrome">
            <div className="process__ps-menu">
              <span className="process__ps-badge">Ps</span>
              {['File', 'Edit', 'Image', 'Layer', 'Type', 'Select', 'Filter', 'View', 'Window'].map(
                (m) => (
                  <span key={m}>{m}</span>
                ),
              )}
            </div>
            <div className="process__ps-options">
              <IconBrush size={12} />
              <span className="process__ps-options-divider" />
              <span>Mode: Normal</span>
              <span className="process__ps-options-divider" />
              <span>Opacity: 100%</span>
              <span className="process__ps-options-divider" />
              <span>Flow: 100%</span>
            </div>
          </div>
        )}

        <img src={steps[i]} alt={step.title} className="process__full" />

        {isFinal ? (
          <div className="process__chrome-bottom process__chrome-bottom--ig">
            <div className="process__chrome-actions">
              <IconHeart size={20} />
              <IconMessageCircle size={20} />
              <IconSend2 size={20} />
              <IconBookmark size={20} className="process__chrome-bookmark" />
            </div>
            <p className="process__chrome-caption">
              <strong>brtcreative</strong> criado pra criar ✦
            </p>
          </div>
        ) : (
          <div className="process__ps-status">
            <span>100%</span>
            <IconChevronRight size={10} />
            <span>Doc: 12.4M/12.4M</span>
          </div>
        )}
      </div>
    ),
  }
})

export default function Process() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="process" ref={sectionRef}>
      <div className="container">
        <StickyScroll
          content={CONTENT}
          contentClassName="aspect-[1080/1450] h-auto w-full max-w-md bg-transparent lg:w-[32rem]"
          header={
            <div className="process__head">
              <p className="eyebrow">Como funciona</p>
              <h2 className="process__title">O design se monta em camadas</h2>
            </div>
          }
        />
      </div>
      <div className={`process__scroll-hint ${inView ? 'is-visible' : ''}`} aria-hidden="true">
        <span className="process__scroll-hint-dot" />
      </div>
    </section>
  )
}
