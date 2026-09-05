const logo = '/logo-brt.svg'

const LINKS = [
  { href: '#top', label: 'Início' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#top" className="footer__brand">
            <img src={logo} alt="" className="footer__logo" />
            <span>BRTcreative</span>
          </a>
          <a href="#contato" className="btn btn--primary">
            Bora criar algo
          </a>
        </div>

        <div className="footer__grid">
          <nav className="footer__nav">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="footer__contact">
            <a href="https://wa.me/5585992346296" target="_blank" rel="noreferrer">
              (85) 99234-6296
            </a>
            <a href="mailto:beniciolopesrapazz@gmail.com">beniciolopesrapazz@gmail.com</a>
            <a href="https://instagram.com/brtcreative_" target="_blank" rel="noreferrer">
              @brtcreative_
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} BRTcreative. Todos os direitos reservados.</p>
          <p>Feito com colagem, café e scroll.</p>
        </div>
      </div>
    </footer>
  )
}
