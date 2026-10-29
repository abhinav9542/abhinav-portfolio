import type { ReactNode } from 'react'
import type { CaseBlock } from '@/types/project'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Figure } from './Figure'

/** Small orange line + label above every section heading. */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-terracotta">
      <span aria-hidden className="h-px w-8 bg-terracotta/70" />
      {children}
    </p>
  )
}

const heading = 'mt-5 font-display text-4xl leading-[1.05] text-navy sm:text-5xl'
const body = 'mt-6 text-lg leading-relaxed text-ink/75'

const MAIN = 62 // width of the main photo, % of the block
const CARD_LEFT = 66 // left edge of the zoomed card, %

/**
 * Wide photo on the left, a zoomed card top-right, and an arrow from a ringed
 * detail in the photo to the card. Geometry lives in one SVG whose viewBox
 * matches the block's aspect ratio, so the ring and arrow stay locked to the
 * photo at any width. On small screens the two images simply stack.
 */
function Callout({ block }: { block: Extract<CaseBlock, { kind: 'callout' }> }) {
  const { image, zoom, target, ratio } = block
  const aspect = (ratio * 100) / MAIN // block width : height
  const vw = aspect * 100
  const tx = (target.x / 100) * (MAIN / 100) * vw
  const ty = target.y
  const rx = (target.rw / 100) * (MAIN / 100) * vw
  const ry = target.rh
  const cardW = ((100 - CARD_LEFT) / 100) * vw
  const cardH = cardW * 0.75
  const sx = tx + rx * 0.8
  const sy = ty - ry * 0.55
  const ex = (CARD_LEFT / 100) * vw + cardW * 0.3
  const ey = cardH + 1.5
  const c2x = ex - 5
  const c2y = ey + 14
  const dx = ex - c2x
  const dy = ey - c2y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const bx = ex - ux * 4
  const by = ey - uy * 4
  const head = `M ${ex} ${ey} L ${bx - uy * 2.2} ${by + ux * 2.2} L ${bx + uy * 2.2} ${by - ux * 2.2} Z`

  return (
    <section id={block.id} className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
      <RevealOnScroll className="max-w-2xl">
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <h2 className={heading}>{block.heading}</h2>
        {block.body && <p className={body}>{block.body}</p>}
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="mt-14">
        {/* Desktop: photo, ring, arrow and zoomed card in one frame. */}
        <div className="relative hidden lg:block" style={{ aspectRatio: aspect }}>
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            draggable={false}
            className="absolute left-0 top-0 h-full rounded-2xl border border-white/10 object-cover shadow-[0_30px_80px_-40px_rgba(255,106,40,0.35)]"
            style={{ width: `${MAIN}%` }}
          />
          <img
            src={zoom.src}
            alt={zoom.alt}
            loading="lazy"
            draggable={false}
            className="absolute right-0 top-0 rounded-2xl border border-terracotta/50 object-cover shadow-[0_0_40px_-10px_rgba(255,106,40,0.5)]"
            style={{ left: `${CARD_LEFT}%`, width: `${100 - CARD_LEFT}%`, aspectRatio: '4 / 3' }}
          />
          <svg aria-hidden viewBox={`0 0 ${vw} 100`} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <ellipse cx={tx} cy={ty} rx={rx} ry={ry} fill="none" stroke="#ff6a2a" strokeWidth={1.3} vectorEffect="non-scaling-stroke" />
            <path
              d={`M ${sx} ${sy} C ${sx + 14} ${sy - 2}, ${c2x} ${c2y}, ${ex} ${ey}`}
              fill="none"
              stroke="#ff6a2a"
              strokeWidth={1.8}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path d={head} fill="#ff6a2a" />
          </svg>
          {(block.caption || zoom.caption) && (
            <div className="absolute bottom-0 right-0 text-sm leading-relaxed text-warm-gray" style={{ left: `${CARD_LEFT + 9}%`, top: `${(cardH / 100) * 100 + 8}%` }}>
              {zoom.caption && <p className="text-ink/80">{zoom.caption}</p>}
              {block.caption && <p className="mt-3">{block.caption}</p>}
            </div>
          )}
        </div>

        {/* Mobile and tablet: stacked. */}
        <div className="space-y-6 lg:hidden">
          <img src={image.src} alt={image.alt} loading="lazy" draggable={false} className="w-full rounded-2xl border border-white/10" />
          <img src={zoom.src} alt={zoom.alt} loading="lazy" draggable={false} className="w-full rounded-2xl border border-terracotta/50" />
          {(zoom.caption || block.caption) && <p className="text-sm text-warm-gray">{[zoom.caption, block.caption].filter(Boolean).join(' ')}</p>}
        </div>
      </RevealOnScroll>
    </section>
  )
}

export function CaseBlockView({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'intro':
      return (
        <section id={block.id} className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <RevealOnScroll className="lg:col-span-4">
              <Eyebrow>{block.eyebrow}</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08} className="lg:col-span-8">
              <p className="font-display text-3xl leading-snug text-navy sm:text-4xl">{block.statement}</p>
              {block.body && <p className={body}>{block.body}</p>}
            </RevealOnScroll>
          </div>
          {block.stats && (
            <RevealOnScroll
              delay={0.12}
              className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3"
            >
              {block.stats.map((stat) => (
                <div key={stat.label} className="bg-[#08080c] p-8">
                  <p className="font-display text-5xl text-terracotta">{stat.value}</p>
                  <p className="mt-3 text-sm text-ink/75">{stat.label}</p>
                  {stat.note &&
                    (stat.href ? (
                      <a
                        href={stat.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-xs text-warm-gray underline decoration-white/20 underline-offset-4 transition-colors hover:text-terracotta-dark"
                      >
                        {stat.note} ↗
                      </a>
                    ) : (
                      <p className="mt-3 text-xs text-warm-gray">{stat.note}</p>
                    ))}
                </div>
              ))}
            </RevealOnScroll>
          )}
        </section>
      )

    case 'feature':
      return (
        <section id={block.id} className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <RevealOnScroll className={`lg:col-span-5 ${block.flip ? 'lg:order-2' : ''}`}>
              <Eyebrow>{block.eyebrow}</Eyebrow>
              <h2 className={heading}>{block.heading}</h2>
              <p className={body}>{block.body}</p>
              {block.bullets && (
                <ul className="mt-6 space-y-3 text-[15px] text-ink/80">
                  {block.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </RevealOnScroll>
            {block.image && (
              <RevealOnScroll delay={0.1} className={`lg:col-span-7 ${block.flip ? 'lg:order-1' : ''}`}>
                <Figure image={block.image} />
              </RevealOnScroll>
            )}
          </div>
        </section>
      )

    case 'wide':
      return (
        <section id={block.id} className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
          <RevealOnScroll>
            <Figure image={block.image} aspect="aspect-[16/9]" />
          </RevealOnScroll>
        </section>
      )

    case 'gallery': {
      const cols = block.columns ?? 3
      const grid =
        cols === 1 ? 'grid-cols-1' : cols === 2 ? 'sm:grid-cols-2' : cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
      return (
        <section id={block.id} className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <RevealOnScroll className="max-w-2xl">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className={heading}>{block.heading}</h2>
            {block.body && <p className={body}>{block.body}</p>}
          </RevealOnScroll>
          <div className={`mt-14 grid gap-6 ${grid}`}>
            {block.images.map((image, i) => (
              <RevealOnScroll key={`${image.src}-${i}`} delay={(i % cols) * 0.08}>
                <Figure image={image} aspect="aspect-square" />
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )
    }

    case 'storyboard':
      return (
        <section id={block.id} className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <RevealOnScroll className="max-w-2xl">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className={heading}>{block.heading}</h2>
            <p className={body}>{block.body}</p>
          </RevealOnScroll>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {block.panels.map((panel, i) => (
              <li key={panel.caption} className="list-none">
                <RevealOnScroll delay={i * 0.1}>
                  <Figure image={panel.image} aspect="aspect-[4/5]" />
                  <div className="mt-5 flex gap-4">
                    <span className="font-display text-2xl leading-none text-terracotta">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[15px] leading-relaxed text-ink/80">{panel.caption}</p>
                  </div>
                </RevealOnScroll>
              </li>
            ))}
          </ol>
        </section>
      )

    case 'specs':
      return (
        <section id={block.id} className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <RevealOnScroll className="max-w-2xl">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className={heading}>{block.heading}</h2>
            {block.body && <p className={body}>{block.body}</p>}
          </RevealOnScroll>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {block.cards.map((card, i) => (
              <RevealOnScroll key={card.name} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <h3 className="font-display text-3xl text-navy">{card.name}</h3>
                  {card.image && (
                    <div className="mt-6">
                      <Figure image={card.image} aspect="aspect-[4/3]" />
                    </div>
                  )}
                  <dl className="mt-6">
                    {card.rows.map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-6 border-t border-white/10 py-3.5">
                        <dt className="text-[11px] font-medium uppercase tracking-[0.25em] text-terracotta">{row.label}</dt>
                        <dd className="text-right text-[15px] text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {card.note && <p className="mt-4 text-sm text-warm-gray">{card.note}</p>}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )

    case 'callout':
      return <Callout block={block} />

    case 'flow':
      return (
        <section id={block.id} className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <RevealOnScroll className="max-w-2xl">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className={heading}>{block.heading}</h2>
            {block.body && <p className={body}>{block.body}</p>}
          </RevealOnScroll>
          <div className="mt-14 space-y-16">
            {block.rows.map((row) => (
              <RevealOnScroll key={row.name}>
                <h3 className="font-display text-3xl text-navy">{row.name}</h3>
                <ol className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-3">
                  {row.steps.map((step, i) => (
                    <li key={step.title} className="relative list-none">
                      <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] ${row.aspect ?? 'aspect-[4/3]'}`}>
                        <img
                          src={step.image.src}
                          alt={step.image.alt}
                          loading="lazy"
                          draggable={false}
                          className="h-full w-full object-cover"
                          style={{ objectPosition: step.focus ?? 'center' }}
                        />
                      </div>
                      <div className="mt-5 flex gap-4">
                        <span className="font-display text-2xl leading-none text-terracotta">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <h4 className="font-display text-xl text-navy">{step.title}</h4>
                          <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{step.body}</p>
                        </div>
                      </div>
                      {i < row.steps.length - 1 && (
                        <span aria-hidden className="absolute -right-8 top-[22%] hidden h-9 w-9 items-center justify-center rounded-full border border-terracotta/50 bg-[#08080c] text-terracotta md:flex">→</span>
                      )}
                    </li>
                  ))}
                </ol>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )

    case 'steps':
      return (
        <section id={block.id} className="border-y border-white/10 bg-white/[0.02] py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className={block.image ? 'grid items-center gap-12 lg:grid-cols-12 lg:gap-16' : ''}>
              <RevealOnScroll className={block.image ? 'lg:col-span-7' : 'max-w-2xl'}>
                <Eyebrow>{block.eyebrow}</Eyebrow>
                <h2 className={heading}>{block.heading}</h2>
                {block.body && <p className={body}>{block.body}</p>}
              </RevealOnScroll>
              {block.image && (
                <RevealOnScroll delay={0.1} className="mx-auto w-full max-w-md lg:col-span-5">
                  <Figure image={block.image} aspect="aspect-[3/4]" />
                </RevealOnScroll>
              )}
            </div>
            <ol className={`mt-14 grid gap-10 sm:grid-cols-2 ${block.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {block.steps.map((step, i) => (
                <li key={step.title} className="list-none border-t border-white/15 pt-5">
                  <RevealOnScroll delay={(i % 3) * 0.08}>
                    <span className="font-display text-3xl text-terracotta">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-3 font-display text-2xl text-navy">{step.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{step.body}</p>
                  </RevealOnScroll>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )

    case 'pullquote':
      return (
        <section className="mx-auto max-w-5xl px-6 py-28 text-center sm:px-10 sm:py-36">
          <RevealOnScroll>
            <p className="font-display text-4xl italic leading-tight text-navy sm:text-6xl">{block.line}</p>
            {block.aside && <p className="mx-auto mt-8 max-w-lg text-base text-warm-gray">{block.aside}</p>}
          </RevealOnScroll>
        </section>
      )

    case 'closing':
      return (
        <section className="relative isolate overflow-hidden px-6 py-32 sm:px-10 sm:py-40">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255,90,31,0.22), transparent 70%)' }}
          />
          <RevealOnScroll className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-terracotta">
              <span aria-hidden className="h-px w-8 bg-terracotta/70" />
              {block.eyebrow}
              <span aria-hidden className="h-px w-8 bg-terracotta/70" />
            </p>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] text-navy sm:text-6xl">{block.heading}</h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink/75">{block.body}</p>
          </RevealOnScroll>
        </section>
      )
  }
}
