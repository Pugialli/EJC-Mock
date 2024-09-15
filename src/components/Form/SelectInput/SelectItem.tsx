'use client'

import { Badge } from '@/components/ui/badge'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check } from 'lucide-react'

export interface SelectArray {
  value: string
  label: string
  badge?: string
}

export type SelectItemProps = SelectPrimitive.SelectItemProps & {
  text: string
  badge?: string
}

export function SelectItem({ text, badge, ...props }: SelectItemProps) {
  const convertedBadge =
    badge === 'TIOEXTERNA' ? 'Tio de Externa' : `${badge}º EJC`

  const variant = badge === 'TIOEXTERNA' ? 'default' : 'secondary'

  return (
    <SelectPrimitive.Item
      className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-amber-50 dark:data-[highlighted]:bg-zinc-700"
      {...props}
    >
      <SelectPrimitive.ItemText asChild>
        <div className="flex items-center gap-2">
          <span className="text-zinc-700 dark:text-zinc-100">{text}</span>
          {badge && <Badge variant={variant}>{convertedBadge}</Badge>}
        </div>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-zinc-500 dark:text-zinc-300" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
