'use client'

import LogoEJCColorido from '@/assets/LogoEJCColorido'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
// import { FooterNavigation } from './FooterNavigation'
import { MainNavigation } from './MainNavigation'

export function Sidebar() {
  return (
    <Collapsible className="fixed left-0 right-0 top-0 z-20 flex flex-col  gap-12 bg-sidebar p-4 data-[state=open]:bottom-0 lg:right-auto lg:w-80 lg:px-6 lg:py-12 lg:data-[state=closed]:bottom-0 ">
      <div className="flex items-center justify-between lg:justify-center">
        <LogoEJCColorido />
        <CollapsibleTrigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent
        forceMount
        className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <MainNavigation />
        {/* <FooterNavigation /> */}
      </CollapsibleContent>
    </Collapsible>
  )
}
