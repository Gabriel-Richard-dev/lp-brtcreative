import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function FlipWords({ words, duration = 2200, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), duration)
    return () => clearInterval(id)
  }, [words.length, duration])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        className={`flip-word ${className}`}
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)', rotate: -3 }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotate: 0 }}
        exit={{ opacity: 0, y: -16, filter: 'blur(6px)', rotate: 3 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  )
}
