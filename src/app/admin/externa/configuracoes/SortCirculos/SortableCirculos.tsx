import type { Active, UniqueIdentifier } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import type { ReactNode } from 'react'
import React, { useMemo, useState } from 'react'

import { SortableOverlay } from './SortableOverlay'

interface BaseItem {
  id: UniqueIdentifier
}

interface Props<T extends BaseItem> {
  items: T[]
  onChange(items: T[]): void
  renderItem(item: T): ReactNode
}

export function SortableCirculos<T extends BaseItem>({
  items,
  onChange,
  renderItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id)
          const overIndex = items.findIndex(({ id }) => id === over.id)

          onChange(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items}>
        <ul className="SortableList" role="application">
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  )
}
