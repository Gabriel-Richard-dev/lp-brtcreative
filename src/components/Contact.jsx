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
        <a
          className="contact__whatsapp"
          href="https://wa.me/5585992346296"
          target="_blank"
          rel="noreferrer"
          data-reveal
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.05 0C5.495 0 .151 5.335.148 11.892c-.002 2.096.547 4.142 1.588 5.945L.056 24l6.304-1.655a11.86 11.86 0 0 0 5.681 1.448h.005c6.554 0 11.898-5.336 11.9-11.893.001-3.178-1.235-6.164-3.481-8.412A11.822 11.822 0 0 0 12.05 0zm7.192 19.033a9.884 9.884 0 0 1-7.192 2.845h-.004a9.87 9.87 0 0 1-5.036-1.378l-.362-.215-3.741.982.998-3.648-.236-.374a9.86 9.86 0 0 1-1.51-5.253C2.163 6.454 6.542 2.08 12.056 2.08c2.66 0 5.161 1.036 7.042 2.92a9.822 9.822 0 0 1 2.911 6.994c-.003 5.513-4.382 9.888-9.767 9.888z" />
          </svg>
          <span>
            <strong>Chamar no WhatsApp</strong>
            <em>resposta rápida, geralmente no mesmo dia</em>
          </span>
        </a>

        <div className="contact__actions" data-reveal>
          <a className="contact__link" href="mailto:beniciolopesrapazz@gmail.com">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="m3.5 6 8.5 7 8.5-7" />
            </svg>
            beniciolopesrapazz@gmail.com
          </a>
          <a
            className="contact__link"
            href="https://instagram.com/brtcreative_"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
            </svg>
            @brtcreative_
          </a>
        </div>
      </div>
    </section>
  )
}
