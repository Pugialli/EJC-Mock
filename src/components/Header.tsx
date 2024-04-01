'use client'

import { LogoEJC } from '@/assets/LogoEJC'
import { useTheme } from 'next-themes'
import { ModeToggle } from './theme/switch-theme-button'

export function Header() {
  const { resolvedTheme } = useTheme()
  // const isDark = resolvedTheme === 'dark'
  const isDark = true
  return (
    <div className="bg-violet-700 flex w-full justify-between px-16 py-6">
      <LogoEJC isDark={isDark} />

      <ModeToggle />
    </div>
  )
}
