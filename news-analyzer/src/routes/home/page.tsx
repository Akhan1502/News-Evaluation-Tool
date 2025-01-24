import { useAuth } from '@/contexts/auth-context'
import { useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export function HomePage() {
  const { userInfo, logout } = useAuth()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Automatically redirect to analyzer
  if (userInfo) {
    return <Navigate to="/analyzer" replace />
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.addEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-3 py-3">
      {/* Header with Profile */}
      <div className="flex items-center justify-between mb-3 bg-[#121212] p-2.5 rounded-lg border border-white/10">
        <h1 className="text-xl font-bold text-gray-200">News Analyzer</h1>
        
        {userInfo && (
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 rounded-lg hover:bg-[#1a1a1a] p-1.5 transition-colors duration-200 border border-white/10"
            >
              <img 
                src={userInfo.picture} 
                alt="Profile" 
                className="h-8 w-8 rounded-full ring-1 ring-white/10"
              />
              <span className="text-gray-400 text-sm font-medium">{userInfo.name}</span>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#121212] py-1 shadow-xl border border-white/10">
                <button
                  onClick={() => navigate('/profile')}
                  className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] text-left transition-colors duration-200"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] text-left transition-colors duration-200 border-t border-white/10"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Simple centered content */}
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center space-y-2 p-6 rounded-lg border border-white/10 bg-[#121212]">
          <h2 className="text-gray-200 text-2xl font-medium">Welcome to News Analyzer</h2>
          <p className="text-gray-500 text-sm">Your personal news analysis assistant</p>
        </div>
      </div>
    </div>
  )
} 