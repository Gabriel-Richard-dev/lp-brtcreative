const logo = '/logo-brt.svg'

export default function FloatingLogo() {
  return (
    <a href="#top" className="floating-logo" aria-label="BRTcreative">
      <img src={logo} alt="" />
    </a>
  )
}
