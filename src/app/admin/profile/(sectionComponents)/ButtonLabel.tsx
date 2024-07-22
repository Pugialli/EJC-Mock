import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { ElementType } from 'react'

export interface ButtonLabelProps {
  label: string
  icon: ElementType
  link: string
}

export function ButtonLabel({ label, icon: Icon, link }: ButtonLabelProps) {
  return (
    <Link
      href={link}
      className="flex w-16 flex-col items-center justify-start text-center text-tertiary"
    >
      <Button>
        <Icon className="h-6 w-6" />
      </Button>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}
