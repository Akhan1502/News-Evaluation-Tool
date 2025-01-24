import { useAuth } from '@/contexts/auth-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function ProfilePage() {
  const { userInfo, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  if (!userInfo) {
    return <div className="bg-[#0a0a0a] text-gray-200">Loading...</div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <Card className="w-full max-w-md space-y-6 p-6 bg-[#121212] border-[#1a1a1a]">
        <div className="flex flex-col items-center space-y-4">
          <img 
            src={userInfo.picture} 
            alt="Profile" 
            className="w-24 h-24 rounded-full ring-2 ring-[#1a1a1a]"
          />
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-200">{userInfo.name}</h1>
            <p className="text-gray-400">{userInfo.email}</p>
          </div>

          <div className="w-full pt-4">
            <Button 
              onClick={handleLogout}
              className="w-full bg-[#1a1a1a] hover:bg-[#242424] text-gray-200"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 