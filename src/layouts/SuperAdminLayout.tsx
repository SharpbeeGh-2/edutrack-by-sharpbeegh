import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { BrandLogo } from '../components/BrandLogo'

export function SuperAdminLayout() {
  const { signOut } = useAuth()

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <aside className="hidden w-[280px] shrink-0 bg-gray-800 md:block">
        <div className="p-6">
          <BrandLogo size="sm" />
        </div>
        <nav className="px-3 text-body-md text-gray-300">Platform navigation goes here</nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-[72px] items-center justify-between border-b border-gray-700 bg-gray-800 px-6">
          <span className="font-medium">Super Admin Portal</span>
          <button onClick={signOut} className="text-body-sm text-gray-400 hover:text-danger">
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
