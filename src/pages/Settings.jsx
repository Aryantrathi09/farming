import { useState } from 'react'
import { FaUser, FaLock, FaBell, FaLanguage } from 'react-icons/fa'

function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', icon: <FaUser />, label: 'Profile' },
    { id: 'security', icon: <FaLock />, label: 'Security' },
    { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
    { id: 'language', icon: <FaLanguage />, label: 'Language' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="card">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <p className="text-gray-600">Manage your personal information and preferences.</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Security Settings</h2>
              <p className="text-gray-600">Update your password and security preferences.</p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Notification Settings</h2>
              <p className="text-gray-600">Configure how you receive notifications.</p>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Language Settings</h2>
              <p className="text-gray-600">Choose your preferred language.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings 