import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

interface UserInfo {
  email: string
  name: string
  picture: string
  // Add any other user info fields you need
}

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  userInfo: UserInfo | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('auth_token')
  )
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      try {
        return jwtDecode(savedToken)
      } catch (error) {
        console.error('Error decoding token:', error)
        return null
      }
    }
    return null
  })

  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode(newToken) as UserInfo
      setToken(newToken)
      setUserInfo(decoded)
      localStorage.setItem('auth_token', newToken)
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const logout = () => {
    setToken(null)
    setUserInfo(null)
    localStorage.removeItem('auth_token')
  }

  const value = {
    isAuthenticated: !!token,
    token,
    userInfo,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 