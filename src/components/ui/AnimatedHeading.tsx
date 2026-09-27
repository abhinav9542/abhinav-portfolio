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
        <span key={`${textLine}-${lineIndex}`} className="-mb-[0.25em] block overflow-hidden pb-[0.25em]">
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
              // e.g. "the *human* mind." — surrounding text is preserved, so
              // "mind*.*" colours just the full stop (punctuation stays upright).
              const accent = word.match(/^([^*]*)\*(.+)\*(\S*)$/)
              return (
                // pb/-mb gives descenders (g, y, p) room inside the reveal mask
                // without changing line spacing.
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-block overflow-hidden mr-[0.25em] -mb-[0.25em] pb-[0.25em] align-top"
                >
                  <motion.span className="inline-block" variants={line}>
                    {accent ? (
                      <>
                        {accent[1]}
                        {/^\p{P}+$/u.test(accent[2]) ? (
                          <span className="text-terracotta">{accent[2]}</span>
                        ) : (
                          <em className="italic text-terracotta">{accent[2]}</em>
                        )}
                        {accent[3]}
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
