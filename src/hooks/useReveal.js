import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

export function useReveal({ targets = '[data-reveal]', stagger: staggerMs = 80, translateY = 40 } = []) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const els = root.matches(targets) ? [root] : Array.from(root.querySelectorAll(targets))
    if (!els.length) return

    els.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = `translateY(${translateY}px)`
    })

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target)
        if (!visible.length) return
        animate(visible, {
          opacity: [0, 1],
          translateY: [translateY, 0],
          duration: 900,
          delay: stagger(staggerMs),
          ease: 'outExpo',
        })
        visible.forEach((el) => obs.unobserve(el))
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [targets, staggerMs, translateY])

  return rootRef
}
