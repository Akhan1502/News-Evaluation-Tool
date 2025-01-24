import { useAuth } from '@/contexts/auth-context'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export function ProfilePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
        <button 
          onClick={handleBack}
          className="text-sm text-white/70 hover:text-white/90"
        >
          ← Back to Analyzer
        </button>
      </div>
      
      <div className="max-w-md mx-auto pt-12 px-4">
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8">
          <div className="flex flex-col items-center text-center">
            {user?.picture && (
              <img 
                src={user.picture} 
                alt={user.name || 'Profile'} 
                className="w-20 h-20 rounded-full mb-4 border-2 border-white/10"
              />
            )}
            <h1 className="text-xl font-medium mb-1">{user?.name}</h1>
            <p className="text-sm text-white/50 mb-6">{user?.email}</p>

            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 w-full max-w-xs px-6 py-3 
                       bg-white hover:bg-gray-100 text-gray-900 rounded-md 
                       transition-colors duration-200 font-medium
                       shadow-sm hover:shadow"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-white/50">
          <p>Signed in with Google Account</p>
        </div>
      </div>
    </div>
  )
} 