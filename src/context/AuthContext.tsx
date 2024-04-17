'use client'

import { loginData } from '@/app/(geral)/login/page'
import { recoverUserInformation, signInRequest } from '@/lib/auth'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'

export interface UserCookieData {
  name: string
  email: string
  avatar: string | null
}

interface AuthProviderProps {
  children: React.ReactNode
}
interface AuthContextType {
  user: UserCookieData | undefined
  isAuthenticated: boolean
  signIn: ({ email, password }: loginData) => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserCookieData | undefined>(undefined)

  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const { ejcToken: token } = parseCookies()

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user)
      })
    }
  }, [])

  async function signIn({ email, password }: loginData) {
    const { token, user } = await signInRequest({
      email,
      password,
    })

    setCookie(undefined, 'ejcToken', token, {
      maxAge: 60 * 60 * 1, // 1 hora
      path: '/',
    })

    api.defaults.headers.Authorization = `Bearer ${token}`

    setUser(user)
    router.push('/externa/')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
