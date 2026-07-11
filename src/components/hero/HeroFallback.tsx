export function HeroFallback() {
  return (
    <div
      className="absolute inset-0 opacity-60"
      style={{
        background:
          'radial-gradient(circle at 60% 40%, rgba(210,96,58,0.35), transparent 55%), radial-gradient(circle at 35% 60%, rgba(26,36,64,0.2), transparent 60%)',
      }}
    />
  )
}
