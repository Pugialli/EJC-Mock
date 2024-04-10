import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ElementType, useState } from 'react'

export interface NavItemGroupProps {
  title: string
  icon: ElementType
  children: React.ReactNode
}

export function NavItemGroup({
  title,
  icon: Icon,
  children,
}: NavItemGroupProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-0.5">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="group flex h-full w-full items-center gap-4 rounded px-6 py-4 hover:bg-primary"
        >
          <Icon className="h-6 w-6 text-zinc-50" />
          <span className="text-sm font-medium text-zinc-50">{title}</span>
          {isOpen ? (
            <ChevronUp className="ml-auto h-6 w-6 text-zinc-50" />
          ) : (
            <ChevronDown className="ml-auto h-6 w-6 text-zinc-50" />
          )}
          <span className="sr-only">Abrir</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pl-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
