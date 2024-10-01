import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ReactNode } from 'react'

type SortableCirculoProps = {
  id: string
  children: ReactNode
}

export function SortableCirculo({ id, children }: SortableCirculoProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  )
}
