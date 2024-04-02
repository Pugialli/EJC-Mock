'use client'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command'

export interface ComboItemProp {
  label: string
  value: string
}

export interface ComboboxProps {
  label: string
  name: string
  value: string | undefined
  comboLabel: string
  comboEmpty?: string
  description?: string
  list: ComboItemProp[]
}

export function Combobox({
  label,
  name,
  value,
  comboLabel,
  comboEmpty,
  description,
  list,
}: ComboboxProps) {
  const { setValue } = useFormContext()
  console.log(value)
  console.log(list)
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-[200px] justify-between',
                !value && 'text-muted-foreground',
              )}
            >
              {value
                ? list.find((item) => item.value === value)?.label
                : comboLabel}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>{comboEmpty}</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={() => {
                    setValue(name, item.value)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      item.value === value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
