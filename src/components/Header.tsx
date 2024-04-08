'use client'

// import { LogoEJC } from '@/assets/LogoEJC'
// import { useTheme } from 'next-themes'
import LogoEJCColorido from '@/assets/LogoEJCColorido'
import Link from 'next/link'
import { ModeToggle } from './theme/switch-theme-button'

export function Header() {
  // const { resolvedTheme } = useTheme()
  // const isDark = resolvedTheme === 'dark'
  // const isDark = true
  return (
    <div className="flex w-full justify-between bg-violet-700 px-16 py-6">
      <Link href="/participe">
        {/* <LogoEJC isDark={isDark} colored={true} /> */}
        <LogoEJCColorido />
      </Link>

      <ModeToggle />
    </div>
  )
}
