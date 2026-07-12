import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute() {
  const { session, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center text-gray-500">Loading…</div>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}