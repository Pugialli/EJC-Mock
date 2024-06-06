'use client'

import LogoEJCColorido from '@/assets/LogoEJCColorido'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'

export function Header() {
  // const { resolvedTheme } = useTheme()
  // const isDark = resolvedTheme === 'dark'
  // const isDark = true

  return (
    // <Collapsible className="z-50 flex flex-col gap-12 bg-violet-700 p-4 lg:h-full lg:min-h-screen lg:px-2 lg:py-12 ">
    <Collapsible className="z-50 flex flex-col gap-12 bg-violet-700 p-4 lg:flex-row lg:justify-between lg:px-4 lg:py-6 ">
      <div className="flex items-center justify-between lg:justify-center">
        <LogoEJCColorido />
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
          <Link href="/" className="hover:text-secondary/80">
            Home
          </Link>
          <Link href="/espiritualidade" className="hover:text-secondary/80">
            Espiritualidade
          </Link>
          <Link href="/movimento" className="hover:text-secondary/80">
            O Movimento
          </Link>
          <Link href="/paroquia" className="hover:text-secondary/80">
            A Paróquia
          </Link>
          <Link href="/login">
            <Button variant="tertiary">Log In</Button>
          </Link>
          <Link href="/participe">
            <Button>Quero Participar</Button>
          </Link>
          {/* <ModeToggle /> */}
        </nav>
      </CollapsibleContent>
    </Collapsible>
  )
}
