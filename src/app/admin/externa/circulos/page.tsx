'use client'

import type {
  CirculoEncontro,
  CirculosResponse,
} from '@/app/api/circulo/get-circulos'
import type { CardEncontristaResponse } from '@/app/api/encontrista/confirmados-card/get-confirmados-card'
import { ChangeOrderDialog } from '@/components/Circulos/ChangeOrderDialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { api } from '@/lib/axios'
import { hasDraggableData } from '@/utils/draggable-data'
import { stringToDate } from '@/utils/string-to-date'
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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { compareDesc } from 'date-fns'
import { ArrowDownUp, Download, Puzzle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CardEncontrista, type SortableEncontrista } from './CardEncontristas'
import { Circulos } from './Circulos'
import { ListaConfirmadosSemCirculo } from './ListaConfirmados'

function compareDate(a: SortableEncontrista, b: SortableEncontrista) {
  return compareDesc(
    stringToDate(a.content.nascimento),
    stringToDate(b.content.nascimento),
  )
}

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
  const response: CirculosResponse = await api
    .get('/circulo')
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
  const response: CardEncontristaResponse[] = await api
    .get('/encontrista/confirmados-card')
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
          nascimento: encontrista.nascimento,
          nome: encontrista.nome,
        },
      }
    },
  )

  return sortableResponse
}

function agruparCirculos(
  encontristas: SortableEncontrista[],
  totalCirculos: number,
): SortableEncontrista[][] {
  const encontristaSortedByDate = encontristas.sort(compareDate)

  const resultado: SortableEncontrista[][] = Array.from(
    { length: totalCirculos },
    () => [],
  )

  const tamanhoParte = Math.ceil(encontristaSortedByDate.length / totalCirculos)
  let contador = 0

  for (const encontrista of encontristaSortedByDate) {
    resultado[Math.floor(contador / tamanhoParte)].push(encontrista)
    contador++
  }

  return resultado
}

async function updateCirculo(encontristaId: string, circuloId: string) {
  return await api.patch(
    `/encontrista/${encontristaId}/change-circulo/${circuloId}`,
  )
}

export type CirculoId = string

export default function MontagemCirculos() {
  const queryClient = useQueryClient()

  const { data: circulosEncontrao, isLoading: isLoadingCirculos } =
    useQuery<CirculosResponse>({
      queryKey: ['circulos'],
      queryFn: () => getCirculos(),
    })

  const { data: confirmadosCard } = useQuery<SortableEncontrista[]>({
    queryKey: ['confirmados'],
    queryFn: () => getConfirmados(),
  })
  const [isSorting, setIsSorting] = useState<boolean>(false)

  const [encontristas, setEncontristas] = useState<SortableEncontrista[]>([])
  const [circulos, setCirculos] = useState<CirculoEncontro[]>([
    // {
    //   id: '0',
    //   idCorCirculo: 0,
    //   tioAparente: undefined,
    //   tioSecreto: undefined,
    // },
  ])

  const [activeEncontrista, setActiveEncontrista] =
    useState<SortableEncontrista | null>(null)

  // const pickedUpEncontristaCirculo = useRef<CirculoId | null>(null)

  useEffect(() => {
    if (confirmadosCard) {
      setEncontristas(confirmadosCard)
    }
  }, [confirmadosCard])

  useEffect(() => {
    if (circulosEncontrao) {
      circulosEncontrao.circulos.forEach((circulo) => {
        setCirculos((state) => [...state, circulo])
      })
    }
  }, [circulosEncontrao])

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  // function getDraggingEncontristaData(
  //   encontristaId: UniqueIdentifier,
  //   circuloId: CirculoId,
  // ) {
  //   const encontristasInColumn = encontristas.filter(
  //     (encontrista) => encontrista.circuloId === circuloId,
  //   )
  //   const encontristaPosition = encontristasInColumn.findIndex(
  //     (encontrista) => encontrista.id === encontristaId,
  //   )
  //   const circulo = circulos.find((circulo) => circulo.id === circuloId)
  //   return {
  //     encontristasInColumn,
  //     encontristaPosition,
  //     circulo,
  //   }
  // }

  // const announcements: Announcements = {
  //   onDragStart({ active }) {
  //     if (!hasDraggableData(active)) return
  //     if (active.data.current?.type === 'Encontrista') {
  //       pickedUpEncontristaCirculo.current =
  //         active.data.current.encontrista.circuloId
  //       const { encontristasInColumn, encontristaPosition, circulo } =
  //         getDraggingEncontristaData(
  //           active.id,
  //           pickedUpEncontristaCirculo.current!,
  //         )
  //       return `Picked up Encontrista ${
  //         active.data.current.encontrista.content
  //       } at position: ${encontristaPosition + 1} of ${
  //         encontristasInColumn.length
  //       } in column ${circulo?.idCorCirculo}`
  //     }
  //   },
  //   onDragOver({ active, over }) {
  //     if (!hasDraggableData(active) || !hasDraggableData(over)) return

  //     if (
  //       active.data.current?.type === 'Encontrista' &&
  //       over.data.current?.type === 'Encontrista'
  //     ) {
  //       const { encontristasInColumn, encontristaPosition, circulo } =
  //         getDraggingEncontristaData(
  //           over.id,
  //           over.data.current.encontrista.circuloId,
  //         )
  //       if (
  //         over.data.current.encontrista.circuloId !==
  //         pickedUpEncontristaCirculo.current
  //       ) {
  //         return `Encontrista ${
  //           active.data.current.encontrista.content
  //         } was moved over column ${circulo?.idCorCirculo} in position ${
  //           encontristaPosition + 1
  //         } of ${encontristasInColumn.length}`
  //       }
  //       return `Encontrista was moved over position ${encontristaPosition + 1} of ${
  //         encontristasInColumn.length
  //       } in column ${circulo?.idCorCirculo}`
  //     }
  //   },
  //   onDragEnd({ active, over }) {
  //     if (!hasDraggableData(active) || !hasDraggableData(over)) {
  //       pickedUpEncontristaCirculo.current = null
  //       return
  //     }
  //     if (
  //       active.data.current?.type === 'Encontrista' &&
  //       over.data.current?.type === 'Encontrista'
  //     ) {
  //       const { encontristasInColumn, encontristaPosition, circulo } =
  //         getDraggingEncontristaData(
  //           over.id,
  //           over.data.current.encontrista.circuloId,
  //         )
  //       if (
  //         over.data.current.encontrista.circuloId !==
  //         pickedUpEncontristaCirculo.current
  //       ) {
  //         return `Encontrista was dropped into column ${circulo?.idCorCirculo} in position ${
  //           encontristaPosition + 1
  //         } of ${encontristasInColumn.length}`
  //       }
  //       return `Encontrista was dropped into position ${encontristaPosition + 1} of ${
  //         encontristasInColumn.length
  //       } in column ${circulo?.idCorCirculo}`
  //     }
  //     pickedUpEncontristaCirculo.current = null
  //   },
  //   onDragCancel({ active }) {
  //     pickedUpEncontristaCirculo.current = null
  //     if (!hasDraggableData(active)) return
  //     return `Dragging ${active.data.current?.type} cancelled.`
  //   },
  // }

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return
    const data = event.active.data.current
    if (data) {
      setActiveEncontrista(data.encontrista)
    }
  }

  async function onDragEnd(event: DragEndEvent) {
    setActiveEncontrista(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const response = await updateCirculo(activeId.toString(), overId.toString())

    console.log(response.data)

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

  async function handleAutoSortCirculos() {
    setIsSorting(true)
    const circulosDivididos = agruparCirculos(encontristas, circulos.length - 1)

    circulosDivididos.forEach((circulo, index) => {
      circulo.forEach(async (encontrista) => {
        if (encontrista.circuloId !== circulos[index + 1].id) {
          console.log(encontrista.content.nome)
          await updateCirculo(encontrista.content.id, circulos[index + 1].id)
        } else {
          // await updateCirculo(encontrista.content.id, '0')
        }
      })
    })
    console.log('Circulos atualizados')
    queryClient
      .refetchQueries({
        queryKey: ['confirmados'],
      })
      .then(() => setIsSorting(false))
  }

  return (
    <div className="w-ful h-full">
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
          <Button type="button" disabled>
            <div className="flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              <span className="flex">Baixar lista dos círculos</span>
            </div>
          </Button>
          <Button
            type="button"
            onClick={handleAutoSortCirculos}
            disabled={isLoadingCirculos || isSorting}
          >
            <div className="flex items-center justify-center gap-2">
              <Puzzle className="h-4 w-4" />
              <span className="flex">Sugerir Organização</span>
            </div>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" disabled={isLoadingCirculos || true}>
                <div className="flex items-center justify-center gap-2">
                  <ArrowDownUp className="h-4 w-4" />
                  <span className="flex">Alterar ordem dos Círculos</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="h-auto w-9/10 rounded-lg p-6 lg:h-auto lg:w-screen">
              {circulosEncontrao && (
                <ChangeOrderDialog order={circulosEncontrao.order} />
              )}
            </DialogContent>
          </Dialog>
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
