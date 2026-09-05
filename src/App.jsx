import { Suspense, lazy } from 'react'
import './App.css'
import FloatingLogo from './components/FloatingLogo'
import Hero from './components/Hero'

const Marquee = lazy(() => import('./components/Marquee'))
const About = lazy(() => import('./components/About'))
const Process = lazy(() => import('./components/Process'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <>
      <FloatingLogo />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Marquee />
          <About />
          <Process />
          <Portfolio />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
