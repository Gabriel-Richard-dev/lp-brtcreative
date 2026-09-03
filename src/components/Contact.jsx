import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contato" className="contact" ref={ref}>
      <div className="container contact__inner">
        <p className="eyebrow" data-reveal>
          Vamos criar
        </p>
        <h2 className="contact__title" data-reveal>
          Tem uma arte pra sair do papel?
        </h2>
        <p className="contact__text" data-reveal>
          Fale comigo e vamos alinhar prazo, estilo e escopo do projeto.
        </p>
        <div className="contact__actions" data-reveal>
          <a
            className="btn btn--primary"
            href="https://wa.me/5585992346296"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a className="btn btn--ghost" href="mailto:beniciolopesrapazz@gmail.com">
            beniciolopesrapazz@gmail.com
          </a>
          <a
            className="btn btn--ghost"
            href="https://instagram.com/brtcreative_"
            target="_blank"
            rel="noreferrer"
          >
            @brtcreative_
          </a>
        </div>
      </div>
    </section>
  )
}
