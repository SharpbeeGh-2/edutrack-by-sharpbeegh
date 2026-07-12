import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function AuthCallbackPage() {
  const { session, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      navigate(session ? '/school' : '/login', { replace: true })
    }
  }, [isLoading, session, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
      Signing you in…
    </div>
  )
}
