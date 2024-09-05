import { ElementType } from 'react'

export interface NavItemProps {
  title: string
  icon: ElementType
  active: boolean
}

export function EditNavItem({ title, icon: Icon, active }: NavItemProps) {
  return (
    <div
      aria-selected={active}
      className="group flex items-center gap-4 rounded-xl px-6 py-4 hover:bg-primary/20 aria-selected:bg-primary"
    >
      <Icon className="h-6 w-6 text-zinc-800" />
      <span className="text-sm font-medium text-zinc-800">{title}</span>
    </div>
  )
}
