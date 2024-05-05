import { MessageSquareMore, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import type { BairrosRJ } from '@/app/api/domains/bairrosRJ/get-bairros-rj'
import type { EncontristaSummaryData } from '@/app/api/encontrista/get-encontristas-summary'
import { EncontristaExterna } from '@/components/Table/encontrista-externa'
import { EncontristaStatus } from '@/components/Table/encontrista-status'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import { stringToDate } from '@/utils/string-to-date'
import type { Value_Status as valueStatus } from '@prisma/client'
import { differenceInCalendarYears, formatDate } from 'date-fns'
import { useEffect, useState } from 'react'

export interface Encontrista {
  id_pessoa: string
  end_complemento: string
  end_numero: string
  id_bairro_encontro: string
  id_moracom: string
  id_status: valueStatus
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
  encontrista: EncontristaSummaryData
}

async function getBairro(bairroValue: string) {
  const response = await api
    .get(`domains/bairrosRJ/${bairroValue}`)
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

  const dataInscricao = formatDate(new Date(encontrista.createdAt), 'dd/MM/yy')
  const nomeCompleto = `${encontrista.nome} ${encontrista.sobrenome}`
  const dataNascimento = stringToDate(encontrista.nascimento)
  const idade = differenceInCalendarYears(new Date(), dataNascimento)

  useEffect(() => {
    async function fetchBairroName() {
      const bairro: BairrosRJ = await getBairro(encontrista.idBairroEncontro)

      setBairroEncontro(bairro.bairro)
    }
    fetchBairroName()
  }, [encontrista.idBairroEncontro])
  return (
    <TableRow>
      <TableCell className="w-7 text-nowrap rounded-tl-xl pl-4 font-medium lg:w-[73px]">
        {dataInscricao}
      </TableCell>
      <TableCell>{nomeCompleto}</TableCell>
      <TableCell>{idade}</TableCell>
      <TableCell className="w-7 lg:w-[178px]">
        <EncontristaStatus
          status={encontrista.idStatus}
          idEncontrista={encontrista.id}
        />
      </TableCell>
      <TableCell>
        {bairroEncontro === undefined ? (
          <Skeleton className="h-4 w-14" />
        ) : (
          <p>{bairroEncontro}</p>
        )}
      </TableCell>
      <TableCell>{encontrista.celular}</TableCell>
      <TableCell className="w-7 lg:w-[178px]">
        <EncontristaExterna
          idResponsavel={encontrista.idExterna}
          idEncontrista={encontrista.id}
        />
      </TableCell>
      <TableCell className="w-7 lg:w-16">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Button
                // onClick={() => approveOrderFn({ orderId: order.orderId })}
                // disabled={isApprovingOrder}
                variant="ghost"
                className="p-0"
              >
                <MessageSquareMore className="h-4 w-4 text-zinc-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="w-72 text-center">
              {encontrista.observacoes ? (
                <span>{encontrista.observacoes}</span>
              ) : (
                <span className="text-zinc-400">Não tem observação</span>
              )}
            </TooltipContent>
          </Tooltip>
          <Button
            // onClick={() => approveOrderFn({ orderId: order.orderId })}
            // disabled={isApprovingOrder}
            variant="ghost"
            className="p-0"
          >
            <Pencil className="h-4 w-4 text-zinc-400" />
          </Button>
          <Button
            // onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            // disabled={isDispatchingOrder}
            variant="ghost"
            className="p-0"
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
