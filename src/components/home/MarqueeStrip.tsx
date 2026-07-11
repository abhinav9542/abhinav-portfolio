const words = ['Empathy', 'Research', 'Psychology', 'Interaction', 'Design']

/**
 * Oversized outline-text marquee, trionn-style. Pure CSS animation
 * (animate-marquee token) so it costs nothing on the main thread;
 * pauses entirely under prefers-reduced-motion.
 */
export function MarqueeStrip() {
  const sequence = [...words, ...words]

  return (
    <div
      aria-hidden
      className="select-none overflow-hidden border-y border-navy/10 bg-cream py-6"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap motion-reduce:animate-none">
        {sequence.map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-10">
            <span className="font-display text-6xl text-outline-navy sm:text-7xl">{word}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-terracotta/60" />
          </span>
        ))}
      </div>
    </div>
  )
}
