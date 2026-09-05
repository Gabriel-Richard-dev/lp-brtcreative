import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useReveal({
  targets = '[data-reveal]',
  stagger: staggerMs = 80,
  translateY = 40,
  watch = [],
  rootRef: externalRootRef,
} = []) {
  const internalRootRef = useRef(null)
  const rootRef = externalRootRef ?? internalRootRef

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
        gsap.to(visible, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: staggerMs / 1000,
          ease: 'expo.out',
        })
        visible.forEach((el) => obs.unobserve(el))
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [targets, staggerMs, translateY, ...watch])

  return rootRef
}
