'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check } from 'lucide-react'

export interface SelectArray {
  value: string
  label: string
}

export type SelectItemProps = SelectPrimitive.SelectItemProps & {
  text: string
}

export function SelectItem({ text, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-amber-50 dark:data-[highlighted]:bg-zinc-700"
      {...props}
    >
      <SelectPrimitive.ItemText asChild>
        <span className="text-zinc-700 dark:text-zinc-100">{text}</span>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-zinc-500 dark:text-zinc-300" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
