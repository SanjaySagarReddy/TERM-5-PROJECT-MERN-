import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon, LogOut, User, Plus, Settings } from 'lucide-react'
import { useState } from 'react'
import UserSettings from './UserSettings'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to={isAuthenticated ? "/dashboard" : "/login"} 
            className="text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            💰 Expense Tracker
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/dashboard" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/add-transaction" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Add Transaction
              </Link>
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* User info */}
                <div className="hidden sm:flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user?.name}</span>
                </div>

                {/* Settings Button */}
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>

                {/* Add Transaction Button (Mobile) */}
                <Link 
                  to="/add-transaction"
                  className="md:hidden p-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </Link>

                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Dark mode toggle for non-authenticated users */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Auth links */}
                <div className="flex space-x-4">
                  <Link 
                    to="/login" 
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-primary"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* User Settings Modal */}
      <UserSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </nav>
  )
}

export default Navbar
