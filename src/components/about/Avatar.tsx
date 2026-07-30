/**
 * Profile portrait. The photo is black and white, so a light sepia warms it
 * into the cream + terracotta field instead of leaving it on the page as a
 * neutral grey rectangle; hovering clears it back to true monochrome.
 *
 * The warmth is a filter on the image, deliberately NOT a `mix-blend-mode`
 * overlay: blended against this figure's own backdrop the layer flattened to
 * an opaque wash and hid the photo entirely.
 *
 * The offset grid behind it carries over the grid motif from Abhinav's own
 * deck, which the earlier placeholder established.
 */
export function Avatar() {
  return (
    <div className="group relative mx-auto w-full max-w-xs">
      <div
        aria-hidden
        className="absolute -bottom-5 -left-5 h-32 w-32 rounded-2xl border border-navy/15"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(26,36,64,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,36,64,0.10) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div
        aria-hidden
        className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-terracotta/15 blur-xl"
      />

      <figure className="relative overflow-hidden rounded-3xl bg-cream-dark shadow-soft">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src="/about/abhinav.jpg"
            alt="Abhinav Tomar"
            width={1000}
            height={1250}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover [filter:sepia(0.3)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:[filter:sepia(0)]"
          />
        </div>
      </figure>
    </div>
  )
}
