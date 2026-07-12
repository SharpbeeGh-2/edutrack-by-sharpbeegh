import { Link } from 'react-router-dom'
import { BrandLogo } from '../../components/BrandLogo'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4">
        <BrandLogo size="sm" />
        <div className="flex gap-3">
          <Link to="/login" className="rounded-md px-4 py-2 text-body-md text-primary hover:bg-gray-100">
            Sign in
          </Link>
          <Link to="/register" className="rounded-md bg-primary px-4 py-2 text-body-md text-white hover:opacity-90">
            Get started
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <BrandLogo size="lg" />
        <p className="mt-4 text-body-lg text-gray-600">
          School management built for Ghanaian schools — admissions, attendance, assessments,
          fees, and GES-compliant report cards in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="rounded-md bg-primary px-6 py-3 text-body-md font-medium text-white hover:opacity-90"
          >
            Start free trial
          </Link>
          <Link
            to="/login"
            className="rounded-md border border-gray-300 px-6 py-3 text-body-md font-medium text-gray-700 hover:bg-gray-100"
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  )
}