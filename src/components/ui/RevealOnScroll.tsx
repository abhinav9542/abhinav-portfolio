import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  id?: string
}

export function RevealOnScroll({ children, delay = 0, y = 24, className, id }: RevealOnScrollProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
