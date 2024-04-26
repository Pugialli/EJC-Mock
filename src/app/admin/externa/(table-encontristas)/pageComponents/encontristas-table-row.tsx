import { Pencil, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { BairrosRJ } from '@/app/api/domains/bairrosRJ/route'
import { EncontristaExterna } from '@/components/Table/encontrista-externa'
import { EncontristaStatus } from '@/components/Table/encontrista-status'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import { textEllipsis } from '@/utils/ellipsis-text'
import { formatDate } from 'date-fns'
import { useEffect, useState } from 'react'

export interface Encontrista {
  id_pessoa: string
  end_complemento: string
  end_numero: string
  id_bairro_encontro: string
  id_moracom: string
  id_status: EncontristaStatus
  modified_at: string
  observacao: string
  pessoa: {
    nome: string
    sobrenome: string
    celular: string
    created_at: string
  }
  id_responsavel_externa: string
}

interface EncontristaTableRowProps {
  encontrista: Encontrista
}

async function getBairro(bairroValue: string) {
  const response = await api
    .get(`domains/bairrosRJ?bairro=${bairroValue}`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

export function EncontristaTableRow({ encontrista }: EncontristaTableRowProps) {
  const [bairroEncontro, setBairroEncontro] = useState<string | undefined>(
    undefined,
  )
  // const queryClient = useQueryClient()

  // function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
  //   const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
  //     queryKey: ['orders'],
  //   })

  //   ordersListCache.forEach(([cacheKey, cacheData]) => {
  //     if (!cacheData) return

  //     queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
  //       ...cacheData,
  //       orders: cacheData.orders.map((order) => {
  //         if (order.orderId === orderId) {
  //           return { ...order, status }
  //         }
  //         return order
  //       }),
  //     })
  //   })
  // }

  // const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
  //   useMutation({
  //     mutationFn: cancelOrder,
  //     onSuccess: (_, { orderId }) => {
  //       updateOrderStatusOnCache(orderId, 'canceled')
  //     },
  //   })

  // const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
  //   useMutation({
  //     mutationFn: approveOrder,
  //     onSuccess: (_, { orderId }) => {
  //       updateOrderStatusOnCache(orderId, 'processing')
  //     },
  //   })

  // const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
  //   useMutation({
  //     mutationFn: dispatchOrder,
  //     onSuccess: (_, { orderId }) => {
  //       updateOrderStatusOnCache(orderId, 'delivering')
  //     },
  //   })

  // const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
  //   useMutation({
  //     mutationFn: deliverOrder,
  //     onSuccess: (_, { orderId }) => {
  //       updateOrderStatusOnCache(orderId, 'delivered')
  //     },
  //   })

  const dataInscricao = formatDate(
    new Date(encontrista.pessoa.created_at),
    'dd/MM/yy',
  )
  const nomeCompleto = `${encontrista.pessoa.nome} ${encontrista.pessoa.sobrenome}`

  useEffect(() => {
    async function fetchBairroName() {
      const bairro: BairrosRJ = await getBairro(encontrista.id_bairro_encontro)

      setBairroEncontro(bairro.bairro)
    }
    fetchBairroName()
  }, [encontrista.id_bairro_encontro])
  return (
    <TableRow className="text-sm">
      <TableCell className="text-xs font-medium">{dataInscricao}</TableCell>
      <TableCell className="">{nomeCompleto}</TableCell>
      <TableCell>
        <EncontristaStatus status={encontrista.id_status} />
      </TableCell>
      <TableCell>
        {bairroEncontro === undefined ? (
          <Skeleton className="h-4 w-14" />
        ) : (
          <p>{bairroEncontro}</p>
        )}
      </TableCell>
      <TableCell className="text-xs">{encontrista.pessoa.celular}</TableCell>
      <TableCell className="text-xs">
        <EncontristaExterna
          idResponsavel={encontrista.id_responsavel_externa}
        />
      </TableCell>
      <TableCell className="text-sm">
        <Tooltip>
          <TooltipTrigger>
            {textEllipsis(encontrista.observacao, 25)}
          </TooltipTrigger>
          <TooltipContent>
            <p>{encontrista.observacao}</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            // onClick={() => approveOrderFn({ orderId: order.orderId })}
            // disabled={isApprovingOrder}
            variant="outline"
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            // onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            // disabled={isDispatchingOrder}
            variant="outline"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
