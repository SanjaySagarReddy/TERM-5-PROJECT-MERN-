import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { User, Settings, Moon, Sun, Trash2, LogOut, ChevronRight } from 'lucide-react'
import DeleteAccountModal from './DeleteAccountModal'

const UserSettings = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        />
        
        {/* Settings Panel */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
                <Settings className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Settings
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Settings Options */}
          <div className="p-6 space-y-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-gray-900 dark:text-white">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                logout()
                onClose()
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Logout</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>

            {/* Delete Account */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-red-600 dark:text-red-400">Delete Account</span>
              </div>
              <ChevronRight className="h-4 w-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
      />
    </>
  )
}

export default UserSettings
