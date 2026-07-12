import { Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { SchoolBrandLogo } from '../components/SchoolBrandLogo'

export function SchoolPortalLayout() {
  const { signOut } = useAuth()

  // TODO Phase 1: replace this placeholder with real values from a school
  // context hook reading schools.school_name and
  // school_branding_settings.portal_logo_url for the logged-in user's school.
  const schoolName = 'School Portal'
  const logoUrl: string | null = null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-[280px] shrink-0 bg-white border-r border-gray-200 md:block">
        <div className="p-6">
          <SchoolBrandLogo schoolName={schoolName} logoUrl={logoUrl} size="sm" />
        </div>
        <nav className="px-3 text-body-md text-gray-600">School Portal navigation goes here</nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-[72px] items-center justify-between border-b border-gray-200 bg-white px-6">
          <span className="font-medium text-gray-800">School Portal</span>
          <button onClick={signOut} className="text-body-sm text-gray-500 hover:text-danger">
            Sign out
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}