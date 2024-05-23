import type { CirculoEncontro } from '@/app/api/encontro/[numeroEncontro]/circulos/get-circulos'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { stringToDate } from '@/utils/string-to-date'
import { useQueryClient } from '@tanstack/react-query'
import { compareDesc } from 'date-fns'
import type { SetStateAction } from 'react'
import type { SortableEncontrista } from './CardEncontristas'

function compareDate(a: SortableEncontrista, b: SortableEncontrista) {
  return compareDesc(
    stringToDate(a.content.nascimento),
    stringToDate(b.content.nascimento),
  )
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

interface AutoSortButtonProps {
  isSorting: boolean
  encontristas: SortableEncontrista[]
  circulos: CirculoEncontro[]
  setIsSorting: (value: SetStateAction<boolean>) => void
  updateCirculo(encontristaId: string, circuloId: string): void
}

export function AutoSortButton({
  isSorting,
  encontristas,
  circulos,
  setIsSorting,
  updateCirculo,
}: AutoSortButtonProps) {
  const queryClient = useQueryClient()

  async function handleAutoSortCirculos() {
    setIsSorting(true)
    const circulosDivididos = agruparCirculos(encontristas, circulos.length)

    await Promise.all(
      circulosDivididos.map(async (circulo, index) => {
        circulo.forEach(async (encontrista) => {
          if (encontrista.circuloId !== circulos[index].id) {
            updateCirculo(encontrista.content.id, circulos[index].id)
          } else {
            // await updateCirculo(encontrista.content.id, '0')
          }
        })
      }),
    )
    queryClient
      .refetchQueries({
        queryKey: ['confirmadosCirculos'],
      })
      .then(() => setIsSorting(false))
  }

  async function handleResetCirculos() {
    setIsSorting(true)
    const circulosDivididos = agruparCirculos(encontristas, circulos.length)

    await Promise.all(
      circulosDivididos.map(async (circulo) => {
        circulo.forEach(async (encontrista) => {
          updateCirculo(encontrista.content.id, '0')
        })
      }),
    )
    queryClient
      .refetchQueries({
        queryKey: ['confirmadosCirculos'],
      })
      .then(() => setIsSorting(false))
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Atenção!</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja dividir os círculos? Caso já existe a divisão
          atual será perdida!
        </AlertDialogDescription>

        <AlertDialogFooter className="py-4">
          <AlertDialogCancel
            disabled={isSorting}
            className="disabled:cursor-wait disabled:opacity-50"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isSorting}
            className="disabled:cursor-wait disabled:opacity-50"
            onClick={handleAutoSortCirculos}
          >
            Dividir Círculos
          </AlertDialogAction>
          <AlertDialogAction
            disabled={isSorting}
            className="disabled:cursor-wait disabled:opacity-50"
            onClick={handleResetCirculos}
          >
            Limpar Divisão Atual
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogHeader>
    </AlertDialogContent>
  )
}
