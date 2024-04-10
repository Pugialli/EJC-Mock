import { ElementType } from 'react'

export interface NavItemProps {
  title: string
  icon: ElementType
}

export function NavItem({ title, icon: Icon }: NavItemProps) {
  return (
    <div className="group flex items-center gap-4 rounded px-6 py-4 hover:bg-primary">
      <Icon className="h-6 w-6 text-zinc-50" />
      <span className="text-sm font-medium text-zinc-50">{title}</span>
    </div>
  )
}
