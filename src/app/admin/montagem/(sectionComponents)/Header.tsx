'use client'

import LogoEJCColorido from '@/assets/LogoEJCColorido'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { LogOut, Menu } from 'lucide-react'
import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [avatar, setAvatar] = useState<string>('')
  const [avatarFallback, setAvatarFallback] = useState<string>('JP')

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession()
      if (session) {
        const fallback = session.user.name[0] + session.user.surname[0]
        session.user.avatar_url && setAvatar(session.user.avatar_url)
        setAvatarFallback(fallback.toUpperCase())
      }
    }
    fetchSession()
  }, [])

  async function logout() {
    await signOut()
  }

  return (
    <Collapsible className="z-50 flex flex-col gap-12 bg-violet-700 p-4 lg:flex-row lg:justify-between lg:px-4 lg:py-6 ">
      <div className="flex items-center justify-between lg:justify-center">
        <Link href="/">
          <LogoEJCColorido />
        </Link>
        <CollapsibleTrigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent
        forceMount
        className="flex flex-col gap-12 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <nav className="flex flex-col items-center gap-6 pb-4 text-secondary lg:flex-row lg:pb-0">
          <Button variant="tertiary" onClick={logout}>
            <LogOut />
          </Button>
          <Link href="/admin/profile">
            <Avatar className="text-zinc-700 ring-1 ring-secondary">
              <AvatarImage src={avatar} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </Link>
          {/* <ModeToggle /> */}
        </nav>
      </CollapsibleContent>
    </Collapsible>
  )
}
