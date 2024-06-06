'use client'

// import { LogoEJC } from '@/assets/LogoEJC'
// import { useTheme } from 'next-themes'
import LogoEJCColorido from '@/assets/LogoEJCColorido'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { HTMLAttributes, ReactNode } from 'react'
import { Separator } from './ui/separator'

interface FooterSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
  className?: string
}

function FooterSection({ title, children, className }: FooterSectionProps) {
  return (
    <div className={cn('flex flex-col gap-3 lg:gap-6', className)}>
      <h3 className="font-bold underline">{title}</h3>
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <div className="flex flex-col gap-4 bg-tertiary px-5 py-7 text-sm text-secondary lg:gap-8 lg:px-20 lg:py-14">
      <div className="flex w-full justify-between">
        <FooterSection
          title="Sobre o movimento"
          className="hidden md:flex lg:flex"
        >
          <Link href="/espiritualidade">Espiritualidade</Link>
          <Link href="/movimento">O Movimento</Link>
          <Link href="/paroquia">A Paróquia</Link>
        </FooterSection>
        <FooterSection title="Acessos" className="hidden lg:flex">
          <Link href="/login">Log in</Link>
          <Link href="/participe">Quero participar</Link>
        </FooterSection>
        <FooterSection title="Equipe do site">
          <span>Amanda Padilha</span>
          <span>Antônio Alves</span>
          <span>Isabella Xavier</span>
          <span>João Paulo Pugialli</span>
        </FooterSection>
        <FooterSection title="Fale Conosco">
          <Link href="mailto:dirigentesnsdp@gmail.com">
            dirigentesnsdp@gmail.com
          </Link>
        </FooterSection>
      </div>
      <Separator className="bg-secondary" />
      <Link href="/" className="w-28">
        <LogoEJCColorido />
      </Link>
    </div>
  )
}
