import './App.css'
import FloatingLogo from './components/FloatingLogo'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <FloatingLogo />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
