import { NavLink } from 'react-router-dom'
import { FaHome, FaSeedling, FaTasks, FaTools, FaCog } from 'react-icons/fa'

function Sidebar({ isOpen, toggleSidebar }) {
  const navItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/crops', icon: <FaSeedling />, label: 'Crops' },
    { path: '/tasks', icon: <FaTasks />, label: 'Tasks' },
    { path: '/equipment', icon: <FaTools />, label: 'Equipment' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' }
  ]

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '16rem' }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary-600">Farm Management</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <svg
              className={`h-6 w-6 transform transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 