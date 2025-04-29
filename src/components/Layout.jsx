import { Outlet, Link, useLocation } from 'react-router-dom'
import { FaHome, FaSeedling, FaTasks, FaCloudSun, FaTractor } from 'react-icons/fa'

function Layout() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Dashboard' },
    { path: '/crops', icon: <FaSeedling />, label: 'Crops' },
    { path: '/tasks', icon: <FaTasks />, label: 'Tasks' },
    { path: '/weather', icon: <FaCloudSun />, label: 'Weather' },
    { path: '/equipment', icon: <FaTractor />, label: 'Equipment' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">Smart Farming</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 ${
                location.pathname === item.path ? 'bg-primary-50 text-primary-600' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout 