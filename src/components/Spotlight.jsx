import { useRef } from 'react'

export default function Spotlight({ children, className = '', ...rest }) {
  const ref = useRef(null)

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} className={`spotlight ${className}`} onMouseMove={onMouseMove} {...rest}>
      {children}
    </div>
  )
}
