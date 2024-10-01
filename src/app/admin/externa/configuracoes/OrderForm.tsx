import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { SortableCirculo } from './SortCirculos/SortableCirculo'
import { SortableCirculos } from './SortCirculos/SortableCirculos'

function createRange<T>(
  length: number,
  initializer: (index: number) => T,
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index))
}

function getMockItems() {
  return createRange(5, (index) => ({ id: index + 1 }))
}

export function OrderForm() {
  const [items, setItems] = useState(getMockItems)

  return (
    <Card className="w-full px-3 pt-8 text-zinc-700 ">
      <div className="px-4 pb-8">
        <h3 className="text-2xl font-bold text-tertiary">Ordem dos círculos</h3>
        <span className="text-base font-normal text-zinc-500">
          Ordene os círculos deste encontro
        </span>
      </div>

      <CardContent className="w-full">
        <SortableCirculos
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableCirculo id={item.id.toString()}>{item.id}</SortableCirculo>
          )}
        />
      </CardContent>
    </Card>
  )
}
