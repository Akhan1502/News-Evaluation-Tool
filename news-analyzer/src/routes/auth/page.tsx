import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/contexts/auth-context'
import { Card } from '@/components/ui/card'

export function AuthPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSuccess = async (credentialResponse: any) => {
    try {
      if (credentialResponse.credential) {
        login(credentialResponse.credential)
        navigate('/analyzer')
      }
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <Card className="w-full max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tighter text-gray-200">
            News Analyzer
          </h1>
          <p className="text-gray-400">
            Sign in to continue
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error('Login Failed')}
            theme="filled_black"
            size="large"
            text="continue_with"
            useOneTap
            auto_select
          />
        </div>
      </Card>
    </div>
  )
} 