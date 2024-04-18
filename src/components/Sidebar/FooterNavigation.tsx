import { LogOut, UserRound } from 'lucide-react'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function FooterNavigation() {
  return (
    <div className="group flex items-center justify-between rounded-xl py-3">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
          // src="https://github.com/shadcn.png"
          />
          <AvatarFallback>
            {/* EN */}
            <UserRound className="h-full w-full pt-1" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-light text-zinc-50">Encontreiro</span>
      </div>
      <Link href="/">
        <LogOut className="h-6 w-6 text-zinc-50 hover:opacity-80" />
      </Link>
    </div>
  )
}
