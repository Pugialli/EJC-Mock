'use client'

import { TableCell, TableRow } from '@/components/ui/table'

import type {
  CartaSummary,
  CartaSummaryData,
} from '@/app/api/carta/get-cartas-sumary'
import type { updateCartaFisicaRouteProps } from '@/app/api/carta/update-carta-fisica/route'
import type { EncontristaIdentification } from '@/app/api/encontrista/identification/[slug]/get-identification'
import type { Carta } from '@/app/api/export/carta/[slug]/get-encontrista-cartas'
import { PrintCartasEncontristaDocx } from '@/components/Docx/PrintCartasEncontristaDocx'
import { EditCartasStatus } from '@/components/Table/Cartas/EditCartasStatus'
import { EncontristaCartaStatus } from '@/components/Table/Cartas/EncontristaCartaStatus'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  MailCheck,
  MailWarning,
  MailX,
  MinusCircle,
  PlusCircle,
} from 'lucide-react'
import type { ElementType } from 'react'

interface EncontristaCartasTableRowProps {
  encontristaCartas: CartaSummaryData
}

export async function changeCartasFisicas({
  id,
  cartasFisicas,
}: updateCartaFisicaRouteProps) {
  await api.patch('/carta/update-carta-fisica/', { id, cartasFisicas })
}

async function getCartasEncontrista(slug: string) {
  const cartas = await api.get(`export/carta/${slug}`)

  return cartas.data
}

async function getEncontristaShortData(slug: string) {
  const encontrista = await api.get(`encontrista/identification/${slug}`)

  return encontrista.data
}

export interface StatusCartaProps {
  label: string
  icon: ElementType
  color: string
}

const statusCarta: StatusCartaProps[] = [
  {
    color: 'text-red-500',
    icon: MailX,
    label: 'Sem cartas',
  },
  {
    color: 'text-amber-500',
    icon: MailWarning,
    label: 'Precisa de cartas',
  },
  {
    color: 'text-green-500',
    icon: MailCheck,
    label: 'Cartas Ok',
  },
]

export function EncontristaCartasTableRow({
  encontristaCartas,
}: EncontristaCartasTableRowProps) {
  const totalCartas =
    encontristaCartas.cartasFisicas + encontristaCartas.cartasVirtuaisTotais

  const statusCartaEncontrista =
    totalCartas === 0
      ? statusCarta[0]
      : totalCartas <= 10
        ? statusCarta[1]
        : statusCarta[2]

  const nomeCompleto = `${encontristaCartas.nome} ${encontristaCartas.sobrenome}`
  const slug = encontristaCartas.slug

  const { data: cartas, isLoading: isLoadingCartas } = useQuery<Carta[]>({
    queryKey: ['carta', { slug }],
    queryFn: async () => await getCartasEncontrista(slug),
  })

  const { data: encontristaData } = useQuery<EncontristaIdentification>({
    queryKey: ['encontristaShort', { slug }],
    queryFn: async () => await getEncontristaShortData(slug),
  })

  const queryClient = useQueryClient()

  function updateCartasFisicasOnCache(
    encontristaId: string,
    cartasFisicas: number,
  ) {
    const encontristaCartaListCache = queryClient.getQueriesData<CartaSummary>({
      queryKey: ['cartasSumary'],
    })

    encontristaCartaListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<CartaSummary>(cacheKey, {
        ...cacheData,
        encontristas: cacheData.encontristas.map((encontrista) => {
          if (encontrista.id === encontristaId) {
            return { ...encontrista, cartasFisicas }
          }
          return encontrista
        }),
      })
    })
  }

  const { mutateAsync: cartaEncontristaFn } = useMutation({
    mutationFn: changeCartasFisicas,
    onSuccess: (_, { id: encontristaId, cartasFisicas }) => {
      updateCartasFisicasOnCache(encontristaId, cartasFisicas)
    },
  })

  function handleUpdateCartasFisicas(cartasFisicas: number) {
    cartaEncontristaFn({
      id: encontristaCartas.id,
      cartasFisicas,
    })
  }

  return (
    <TableRow className="bg-white">
      <TableCell>{nomeCompleto}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() =>
              handleUpdateCartasFisicas(encontristaCartas.cartasFisicas - 1)
            }
            variant="ghost"
            className="p-0"
          >
            <MinusCircle className="h-4 w-4 text-tertiary" />
          </Button>
          <span className="text-tertiary">
            {encontristaCartas.cartasFisicas}
          </span>
          <Button
            onClick={() =>
              handleUpdateCartasFisicas(encontristaCartas.cartasFisicas + 1)
            }
            variant="ghost"
            className="p-0"
          >
            <PlusCircle className="h-4 w-4 text-tertiary" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {encontristaCartas.cartasVirtuaisImpressas} (
        {encontristaCartas.cartasVirtuaisTotais})
      </TableCell>
      <TableCell className="text-center">{totalCartas}</TableCell>
      <TableCell>
        <EncontristaCartaStatus
          color={statusCartaEncontrista.color}
          icon={statusCartaEncontrista.icon}
          label={statusCartaEncontrista.label}
        />
      </TableCell>
      <TableCell>[Em breve...]</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          {isLoadingCartas && <Skeleton className="w-5" />}
          {cartas && encontristaData && (
            <>
              <EditCartasStatus cartas={cartas} encontrista={encontristaData} />
              <PrintCartasEncontristaDocx
                cartas={cartas}
                encontrista={encontristaData}
              />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
