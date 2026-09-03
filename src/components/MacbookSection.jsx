import { MacbookScroll } from './ui/macbook-scroll'

export default function MacbookSection({ artwork }) {
  return (
    <div className="macbook-wrap">
      <MacbookScroll title={null} src={artwork.src} showGradient />
    </div>
  )
}
