import { StickyScroll } from './ui/sticky-scroll-reveal'
import { FollowerPointerCard } from './ui/following-pointer'
import { portfolio } from '../data/portfolio'

const artwork = portfolio[0]

const CONTENT = [
  {
    title: 'Briefing',
    description:
      'Entendo a marca, o público e o que a peça precisa gritar em 2 segundos de scroll.',
    content: (
      <div className="process__canvas process__canvas--blank">
        <span className="process__hint">ideia em aberto</span>
      </div>
    ),
  },
  {
    title: 'Recorte & Composição',
    description:
      'Referências viram colagem: texturas, tipografia e recorte manual guiam o layout.',
    content: (
      <div className="process__canvas">
        <div className="process__cutout torn">
          <img src={artwork.src} alt="" />
        </div>
      </div>
    ),
  },
  {
    title: 'Direção de Arte',
    description: 'Paleta, hierarquia e ritmo visual fechados antes de qualquer arte final.',
    content: (
      <div className="process__canvas">
        <img src={artwork.src} alt="" className="process__full process__full--muted" />
        <div className="process__swatches">
          <span style={{ background: '#3b6bff' }} />
          <span style={{ background: '#ede6d8' }} />
          <span style={{ background: '#0a0a0b' }} />
        </div>
      </div>
    ),
  },
  {
    title: 'Entrega',
    description: 'Arquivos prontos pro feed, story ou impressão — revisão inclusa.',
    content: (
      <div className="process__canvas">
        <img src={artwork.src} alt="" className="process__full" />
        <span className="process__done">✓ pronto pra postar</span>
      </div>
    ),
  },
]

export default function Process() {
  return (
    <section className="process">
      <div className="container">
        <p className="eyebrow">Como funciona</p>
        <h2 className="process__title">O design se monta em camadas</h2>
      </div>

      <div className="container">
        <FollowerPointerCard title="montando a arte">
          <StickyScroll
            content={CONTENT}
            contentClassName="h-64 w-full max-w-sm bg-transparent lg:h-72 lg:w-96"
          />
        </FollowerPointerCard>
      </div>
    </section>
  )
}
