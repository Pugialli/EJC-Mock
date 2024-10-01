'use client'

import type {
  CirculoEncontro,
  CirculosResponse,
} from '@/app/api/encontro/[numeroEncontro]/circulos/get-circulos'
import type { CardEncontristaResponse } from '@/app/api/encontro/[numeroEncontro]/confirmados-card/get-confirmados-card'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { hasDraggableData } from '@/utils/draggable-data'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Download, Puzzle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AutoSortButton } from './AutoSortButton'
import { CardEncontrista, type SortableEncontrista } from './CardEncontristas'
import { Circulos } from './Circulos'
import { ListaConfirmadosSemCirculo } from './ListaConfirmados'

function ordenarCirculos(baseOrder: string, circulos: CirculoEncontro[]) {
  // Converter a string de baseOrder em um array de números
  const order = baseOrder.split('').map(Number)

  // Criar um mapeamento dos IDs para suas posições
  const idPositionMap = new Map<number, number>()
  order.forEach((id, index) => {
    idPositionMap.set(id, index)
  })

  // Ordenar o array com base nas posições mapeadas
  return circulos.sort((a, b) => {
    const posA = idPositionMap.get(a.idCorCirculo)
    const posB = idPositionMap.get(b.idCorCirculo)

    // Se um dos IDs não estiver no mapeamento, manter a ordem original entre eles
    if (posA === undefined) return 1
    if (posB === undefined) return -1

    return posA - posB
  })
}

async function getCirculos() {
  const encontro = 71

  const response: CirculosResponse = await api
    .get(`encontro/${encontro}/circulos`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const sortedCirculos = ordenarCirculos(
    response.order.toString(),
    response.circulos,
  )

  const orderedResponse: CirculosResponse = {
    order: response.order,
    circulos: sortedCirculos,
  }

  return orderedResponse
}

async function getConfirmados() {
  const encontro = 71
  const response: CardEncontristaResponse[] = await api
    .get(`encontro/${encontro}/confirmados-card`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const sortableResponse: SortableEncontrista[] = response.map(
    (encontrista) => {
      return {
        id: encontrista.id,
        circuloId: encontrista.idCirculo ? encontrista.idCirculo : '0',
        content: {
          id: encontrista.id,
          bairro: encontrista.bairro,
          dataNasc: encontrista.dataNasc,
          nome: encontrista.nome,
        },
      }
    },
  )

  return sortableResponse
}

export interface UpdateCirculoProps {
  encontristaId: string
  circuloId: string
}

async function updateCirculo({ encontristaId, circuloId }: UpdateCirculoProps) {
  return await api.patch(
    `encontrista/${encontristaId}/change-circulo/${circuloId}`,
  )
}

export type CirculoId = string

export default function MontagemCirculos() {
  const { data: circulosEncontrao, isLoading: isLoadingCirculos } =
    useQuery<CirculosResponse>({
      queryKey: ['circulos'],
      queryFn: () => getCirculos(),
    })

  const { data: confirmadosCard } = useQuery<SortableEncontrista[]>({
    queryKey: ['confirmadosCirculos'],
    queryFn: () => getConfirmados(),
  })
  const queryClient = useQueryClient()

  const [isSorting, setIsSorting] = useState<boolean>(false)

  const [encontristas, setEncontristas] = useState<SortableEncontrista[]>([])
  const [circulos, setCirculos] = useState<CirculoEncontro[]>([])

  const [openDivisao, setOpenDivisao] = useState<boolean>(false)

  const [activeEncontrista, setActiveEncontrista] =
    useState<SortableEncontrista | null>(null)

  function updateEncontristaCirculoOnCache(
    encontristaId: string,
    updatedCirculoId: string,
  ) {
    const encontristaListCache = queryClient.getQueriesData<
      SortableEncontrista[]
    >({ queryKey: ['confirmadosCirculos'] })

    encontristaListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      const newCache = cacheData.map((encontrista) => {
        if (encontrista.content.id === encontristaId) {
          return { ...encontrista, circuloId: updatedCirculoId }
        }
        return encontrista
      })

      queryClient.setQueryData<SortableEncontrista[]>(cacheKey, () => {
        setEncontristas(newCache)
        return newCache
      })
    })
  }

  const { mutateAsync: circuloEncontristaFn } = useMutation({
    mutationFn: updateCirculo,
    onSuccess: (_, { encontristaId, circuloId }) => {
      updateEncontristaCirculoOnCache(encontristaId, circuloId)
    },
  })

  function handleUpdateCirculo(encontristaId: string, circuloId: string) {
    circuloEncontristaFn({
      encontristaId,
      circuloId,
    })
  }

  useEffect(() => {
    if (confirmadosCard) {
      setEncontristas(confirmadosCard)
    }
  }, [confirmadosCard])

  useEffect(() => {
    if (circulosEncontrao) {
      setCirculos(circulosEncontrao.circulos)
    }
  }, [circulosEncontrao])

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return
    const data = event.active.data.current
    if (data) {
      setActiveEncontrista(data.encontrista)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveEncontrista(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    handleUpdateCirculo(activeId.toString(), overId.toString())

    if (!hasDraggableData(active)) return

    const activeData = active.data.current

    if (activeId === overId) return

    const isActiveCirculo = activeData?.type === 'Circulo'
    if (!isActiveCirculo) return

    setCirculos((circulos) => {
      const activeCirculoIndex = circulos.findIndex(
        (circulo) => circulo.id === activeId,
      )

      const overCirculoIndex = circulos.findIndex(
        (circulo) => circulo.id === overId,
      )

      return arrayMove(circulos, activeCirculoIndex, overCirculoIndex)
    })
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    if (!hasDraggableData(active) || !hasDraggableData(over)) return

    const activeData = active.data.current
    const overData = over.data.current

    const isActiveEncontrista = activeData?.type === 'Encontrista'

    if (!isActiveEncontrista) return

    const isOverACirculo = overData?.type === 'Circulo'

    // Im dropping a Encontrista over a Circulo
    if (isActiveEncontrista && isOverACirculo) {
      setEncontristas((encontristas) => {
        const activeIndex = encontristas.findIndex((t) => t.id === activeId)
        const activeEncontrista = encontristas[activeIndex]
        if (activeEncontrista) {
          activeEncontrista.circuloId = overId.toString()
          return arrayMove(encontristas, activeIndex, activeIndex)
        }
        return encontristas
      })
    }
  }

  return (
    <div className="h-full w-full">
      <div className="pb-4">
        <div className="flex items-center justify-between gap-8 pb-8">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-tertiary">
              Montagem de Círculos
            </h1>
            <span className="text-base font-normal text-zinc-500">
              Montagem dos círculos e distribuição dos encontristas
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 lg:flex-row"></div>
        </div>
      </div>

      <div className="grid grid-cols-9">
        <div className="col-span-9 flex flex-col justify-start gap-2 px-4 lg:col-span-6 lg:flex-row">
          <Link href="/api/export/circulo">
            <Button type="button" disabled={isLoadingCirculos || isSorting}>
              <div className="flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                <span className="flex">Baixar lista dos círculos</span>
              </div>
            </Button>
          </Link>
          <AlertDialog open={openDivisao} onOpenChange={setOpenDivisao}>
            <AlertDialogTrigger asChild>
              <Button type="button" disabled={isLoadingCirculos}>
                <div className="flex items-center justify-center gap-2">
                  <Puzzle className="h-4 w-4" />
                  <span className="flex">Sugerir Organização</span>
                </div>
              </Button>
            </AlertDialogTrigger>
            {circulos && (
              <AutoSortButton
                circulos={circulos}
                encontristas={encontristas}
                isSorting={isSorting}
                setIsSorting={setIsSorting}
                updateCirculo={handleUpdateCirculo}
              />
            )}
          </AlertDialog>
        </div>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          collisionDetection={closestCenter}
        >
          <>
            <div className="col-span-9 lg:col-span-6">
              {circulos && encontristas && (
                <Circulos circulos={circulos} encontristas={encontristas} />
              )}
            </div>
            <div className="col-span-9 lg:col-span-3">
              {encontristas && (
                <ListaConfirmadosSemCirculo encontristas={encontristas} />
              )}
            </div>
          </>

          <DragOverlay>
            {activeEncontrista && (
              <CardEncontrista encontrista={activeEncontrista} isOverlay />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
