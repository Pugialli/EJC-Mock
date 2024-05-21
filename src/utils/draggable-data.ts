import type { EncontristaDragData } from '@/app/admin/externa/circulos/CardEncontristas'
import type { CirculoDropData } from '@/app/admin/externa/circulos/Circulo'
import { Active, DataRef, Over } from '@dnd-kit/core'

type DraggableData = EncontristaDragData | CirculoDropData

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>
} {
  if (!entry) {
    return false
  }

  const data = entry.data.current

  if (data?.type === 'Encontrista' || data?.type === 'Circulo') {
    return true
  }

  return false
}
