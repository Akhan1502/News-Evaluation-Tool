import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { googleLogout } from '@react-oauth/google'

interface User {
  name: string
  email: string
  picture: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signIn: (accessToken: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Persist user data
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const signIn = useCallback(async (accessToken: string) => {
    try {
      // Fetch user info from Google
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      const userData = await response.json()
      
      const user = {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      }

      setUser(user)
      localStorage.setItem('auth_token', accessToken)
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      googleLogout()
      setUser(null)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 