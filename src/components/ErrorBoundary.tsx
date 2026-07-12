import * as Sentry from '@sentry/react'
import type { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

function ErrorFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <h1 className="text-h3 font-semibold text-gray-800">Something went wrong</h1>
      <p className="max-w-sm text-body-md text-gray-500">
        This has been reported automatically. Try reloading the page — if it keeps happening,
        contact support.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-md bg-primary px-5 py-2 text-body-md text-white hover:opacity-90"
      >
        Reload page
      </button>
    </div>
  )
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <Sentry.ErrorBoundary fallback={<ErrorFallback />}>{children}</Sentry.ErrorBoundary>
}
