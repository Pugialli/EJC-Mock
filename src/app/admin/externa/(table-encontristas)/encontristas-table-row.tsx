import { MessageSquareMore, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import type { EncontristaSummaryData } from '@/app/api/encontrista/get-encontristas-summary'
import { DeleteDialog } from '@/components/Table/delete-dialog'
import { EncontristaExterna } from '@/components/Table/encontrista-externa'
import { EncontristaStatus } from '@/components/Table/encontrista-status'
import type { SelectItemAvatarProps } from '@/components/Table/select-item-avatar'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import { getAge } from '@/utils/get-age'
import { stringToDate } from '@/utils/string-to-date'
import type { Value_Status as valueStatus } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'

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

async function getEquipeExterna() {
  const equipe = await api
    .get('/externa')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return equipe
}

export function EncontristaTableRow({ encontrista }: EncontristaTableRowProps) {
  const [open, setOpen] = useState(false)

  const dataInscricao = formatDate(new Date(encontrista.createdAt), 'dd/MM/yy')
  const nomeCompleto = `${encontrista.nome} ${encontrista.sobrenome}`
  const dataNascimento = stringToDate(encontrista.nascimento)
  const idade = getAge(dataNascimento)

  const { data: equipeExterna, isLoading } = useQuery<SelectItemAvatarProps[]>({
    queryFn: async () => await getEquipeExterna(),
    queryKey: ['equipeExterna'],
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <TableRow className="bg-white">
        <TableCell className="w-7 text-nowrap pl-4 font-medium lg:w-[73px]">
          {dataInscricao}
        </TableCell>
        <TableCell>{nomeCompleto}</TableCell>
        <TableCell>{idade}</TableCell>
        <TableCell className="w-7 lg:w-[178px]">
          <EncontristaStatus
            status={encontrista.idStatus}
            encontristaId={encontrista.id}
          />
        </TableCell>
        <TableCell>{encontrista.bairroEncontro}</TableCell>
        <TableCell>{encontrista.celular}</TableCell>
        <TableCell className="w-7 lg:w-[178px]">
          {isLoading ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            <EncontristaExterna
              idExterna={encontrista.idExterna}
              idEncontrista={encontrista.id}
              equipe={equipeExterna}
            />
          )}
        </TableCell>
        <TableCell className="w-7 lg:w-16">
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger>
                <MessageSquareMore className="h-4 w-4 text-zinc-400" />
              </TooltipTrigger>
              <TooltipContent className="w-72 text-center">
                {encontrista.observacoes ? (
                  <span>{encontrista.observacoes}</span>
                ) : (
                  <span className="text-zinc-400">Não tem observação</span>
                )}
              </TooltipContent>
            </Tooltip>
            <Link href={`/admin/externa/${encontrista.id}/edit`}>
              <Button variant="ghost" className="p-0">
                <Pencil className="h-4 w-4 text-zinc-400 hover:text-zinc-500" />
              </Button>
            </Link>
            <AlertDialogTrigger asChild>
              <Button
                // onClick={() => dispatchOrderFn({ orderId: order.orderId })}
                // disabled={isDispatchingOrder}
                variant="ghost"
                className="p-0"
              >
                <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
              </Button>
            </AlertDialogTrigger>
          </div>
        </TableCell>
      </TableRow>

      <DeleteDialog
        idEncontrista={encontrista.id}
        nomeEncontrista={`${encontrista.nome} ${encontrista.sobrenome}`}
        openFn={setOpen}
      />
    </AlertDialog>
  )
}
