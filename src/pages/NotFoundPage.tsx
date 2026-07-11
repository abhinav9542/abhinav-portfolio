import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-6xl text-navy">404</p>
      <p className="max-w-sm text-warm-gray">
        This page wandered off. Let&apos;s get you back to something real.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white-soft transition-colors hover:bg-terracotta"
      >
        Back home
      </Link>
    </div>
  )
}
