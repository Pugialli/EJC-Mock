'use client'

// import { LogoEJC } from '@/assets/LogoEJC'
// import { useTheme } from 'next-themes'
import LogoEJCColorido from '@/assets/LogoEJCColorido'
import Link from 'next/link'
import { Button } from './ui/button'

export function Header() {
  // const { resolvedTheme } = useTheme()
  // const isDark = resolvedTheme === 'dark'
  // const isDark = true
  return (
    <div className="flex w-full justify-between bg-violet-700 px-4 py-6 lg:px-16">
      <Link href="/">
        {/* <LogoEJC isDark={isDark} colored={true} /> */}
        <LogoEJCColorido />
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      {/* <ModeToggle /> */}
    </div>
  )
}
