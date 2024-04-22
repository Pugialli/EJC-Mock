'use server'

import { authOptions } from '@/lib/auth/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface LoginLayoutProps {
  children: ReactNode
}

export default async function LoginLayout({ children }: LoginLayoutProps) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/admin/externa')
  }
  return <>{children}</>
}
