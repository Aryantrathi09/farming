import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Crops from './pages/Crops'
import Tasks from './pages/Tasks'
import Equipment from './pages/Equipment'
import Settings from './pages/Settings'
import Login from './pages/Login'
import useStore from './store/useStore'

function App() {
  const { user, logout } = useStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="flex h-screen bg-gray-100">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
          <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <button
                    onClick={toggleSidebar}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-4">{user.name}</span>
                    <button
                      onClick={logout}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <div className="container mx-auto px-6 py-8">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/crops" element={<Crops />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/equipment" element={<Equipment />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default App 