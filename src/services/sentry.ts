import * as Sentry from '@sentry/react'

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!dsn) {
    console.warn('VITE_SENTRY_DSN not set — error monitoring is disabled in this environment.')
    return
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_APP_ENV,
    tracesSampleRate: import.meta.env.VITE_APP_ENV === 'production' ? 0.2 : 1.0,
  })
}
