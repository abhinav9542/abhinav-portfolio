import { motion, type Variants } from 'framer-motion'

interface AnimatedHeadingProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
}

const line: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function AnimatedHeading({
  text,
  as = 'h2',
  className = '',
  delay = 0,
}: AnimatedHeadingProps) {
  const Tag = motion[as]
  const lines = text.split('\n')

  return (
    <Tag className={className}>
      {lines.map((textLine, lineIndex) => (
        <span key={`${textLine}-${lineIndex}`} className="block overflow-hidden">
          <motion.span
            className="block"
            variants={container}
            custom={delay + lineIndex * 0.08}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {textLine.split(' ').map((word, wordIndex) => {
              // Words wrapped in *asterisks* render as the italic accent,
              // e.g. "the *human* mind." — trailing punctuation is preserved.
              const accent = word.match(/^\*(.+)\*(\S*)$/)
              return (
                <span key={`${word}-${wordIndex}`} className="inline-block overflow-hidden mr-[0.25em] align-top">
                  <motion.span className="inline-block" variants={line}>
                    {accent ? (
                      <>
                        <em className="italic text-terracotta">{accent[1]}</em>
                        {accent[2]}
                      </>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
              )
            })}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
