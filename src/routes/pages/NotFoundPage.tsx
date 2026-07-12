import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <h1 className="text-h1 font-semibold text-gray-800">404</h1>
      <p className="text-body-md text-gray-500">This page doesn't exist.</p>
      <Link to="/login" className="text-primary underline">
        Back to login
      </Link>
    </div>
  )
}
