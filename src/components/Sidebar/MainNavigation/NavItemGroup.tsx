import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ElementType } from 'react'

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
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="tios-externa" className="border-none">
        <AccordionTrigger className="group flex h-full w-full items-center gap-4 rounded-xl px-6 py-4 text-zinc-50 hover:bg-primary/20">
          <div className="flex items-center gap-4">
            <Icon className="h-6 w-6 text-zinc-50" />
            <span className="text-sm font-medium text-zinc-50">{title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 py-2 pl-4">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    // <Collapsible
    //   open={isOpen}
    //   onOpenChange={setIsOpen}
    //   className="flex flex-col gap-4"
    // >
    //   <CollapsibleTrigger asChild>
    //     <Button
    //       variant="ghost"
    //       className="group flex h-full w-full items-center gap-4 rounded-xl px-6 py-4 hover:bg-primary/20"
    //     >
    //       <Icon className="h-6 w-6 text-zinc-50" />
    //       <span className="text-sm font-medium text-zinc-50">{title}</span>
    //       <ChevronDown className="ml-auto h-6 w-6 text-zinc-50 group-aria-expanded:rotate-180" />
    //       <span className="sr-only">Abrir</span>
    //     </Button>
    //   </CollapsibleTrigger>
    //   <CollapsibleContent className="space-y-2 pl-4">
    //     {children}
    //   </CollapsibleContent>
    // </Collapsible>
  )
}
