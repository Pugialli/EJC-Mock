import { cn } from '@/lib/utils'
import type { Value_Status as valueStatus } from '@prisma/client'
import type { ElementType } from 'react'
import { SelectItem } from '../ui/select'

export interface SelectItemIconProps {
  value: valueStatus
  label: string
  icon: ElementType
  color: string
}

export function SelectItemIcon({
  value,
  label,
  icon: Icon,
  color,
}: SelectItemIconProps) {
  return (
    <SelectItem value={value} className="hover:bg-violet-100">
      <div className="flex w-full items-center gap-2 pr-2">
        <Icon className={cn('h-4 w-4', color)} />
        <span className="text-nowrap text-tertiary">{label}</span>
      </div>
    </SelectItem>
  )
}
