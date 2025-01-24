import { useAuth } from '@/contexts/auth-context'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { Card } from '@/components/ui/card'

export function AuthPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await signIn(response.access_token)
        navigate('/')
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
    onError: (error) => console.error('Login Failed:', error)
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/50">Sign in to continue to News Analyzer</p>
        </div>

        <button
          onClick={() => login()}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 
                     hover:bg-gray-100 px-6 py-3 rounded-md transition-colors duration-200
                     font-medium shadow-sm hover:shadow"
        >
          <img 
            src="/google.svg" 
            alt="Google" 
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  )
} 