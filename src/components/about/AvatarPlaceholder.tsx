/**
 * Stands in for a real profile photo until one is provided. Echoes the
 * grid + organic blob motif from Abhinav's own deck, in the site's
 * terracotta/navy palette, so the placeholder still feels on-brand rather
 * than generic.
 */
export function AvatarPlaceholder() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl bg-white-soft shadow-soft">
      <svg viewBox="0 0 300 300" className="h-full w-full" role="img" aria-label="Abstract placeholder portrait for Abhinav Tomar">
        <defs>
          <linearGradient id="avatarBlob" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c2603d" />
            <stop offset="100%" stopColor="#1f2a44" />
          </linearGradient>
          <pattern id="avatarGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="#1f2a44" strokeOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="300" height="300" fill="#f5efe6" />
        <rect width="300" height="300" fill="url(#avatarGrid)" />
        <path
          d="M90 40C130 20 190 30 220 70C250 110 240 160 210 190C180 220 130 240 95 215C60 190 40 150 45 110C50 75 60 55 90 40Z"
          fill="url(#avatarBlob)"
          opacity="0.9"
        />
      </svg>
      <span className="absolute bottom-4 right-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-warm-gray">
        Photo coming soon
      </span>
    </div>
  )
}
