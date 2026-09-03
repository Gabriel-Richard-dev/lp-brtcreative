import { FloatingDock } from './ui/floating-dock'

const TOOLS = [
  { title: 'Photoshop', slug: 'Ps', bg: '#001e36', fg: '#31a8ff' },
  { title: 'Illustrator', slug: 'Ai', bg: '#330000', fg: '#ff9a00' },
  { title: 'Canva', slug: 'C', bg: '#04203c', fg: '#00c4cc' },
]

const items = TOOLS.map((t) => ({
  title: t.title,
  href: '#trabalhos',
  icon: (
    <span
      className="tool-dock__badge"
      style={{ background: t.bg, color: t.fg }}
    >
      {t.slug}
    </span>
  ),
}))

export default function ToolDock(props) {
  return (
    <div className="tool-dock" {...props}>
      <p className="tool-dock__label">Ferramentas do dia a dia</p>
      <FloatingDock
        items={items}
        desktopClassName="tool-dock__desktop"
        mobileClassName="tool-dock__mobile"
      />
    </div>
  )
}
