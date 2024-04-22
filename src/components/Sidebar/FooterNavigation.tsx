import { LogOut } from 'lucide-react'

import { getSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

export function FooterNavigation() {
  const [name, setName] = useState<string>('Carregando...')
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession()
      if (session) {
        setName(session.user.name)
        session.user.avatar_url && setAvatar(session.user.avatar_url)
      }
    }
    fetchSession()
  }, [])

  async function logout() {
    console.log('teste')
    await signOut()
  }

  return (
    <div className="group flex items-center justify-between rounded-xl py-3">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>
            AP
            {/* <UserRound className="h-full w-full pt-1" /> */}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-light text-zinc-50">{name}</span>
      </div>
      <Button variant="ghost" onClick={logout}>
        <LogOut className="h-6 w-6 text-zinc-50 hover:opacity-80" />
      </Button>
    </div>
  )
}
