import { MessageSquareMore, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import type { EncontristaSummaryData } from '@/app/api/encontrista/get-encontristas-summary'
import { DeleteDialog } from '@/components/Table/DeleteDialog'
import { EncontristaExterna } from '@/components/Table/EncontristaExterna'
import { EncontristaStatus } from '@/components/Table/EncontristaStatus'
import type { SelectItemAvatarProps } from '@/components/Table/SelectItemAvatar'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import { getAge } from '@/utils/get-age'
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
  obsExternaLocalizacao: string | null
  obsExternaSaude: string | null
  obsExternaConhecidos: string | null
  obsExternaOutros: string | null
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
  const encontro = 71

  const equipe = await api
    .get(`encontro/${encontro}/externa`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return equipe
}

export function EncontristaTableRow({ encontrista }: EncontristaTableRowProps) {
  const [open, setOpen] = useState(false)

  const dataInscricao = formatDate(new Date(encontrista.createdAt), 'dd/MM/yy')
  const nomeCompleto = `${encontrista.nome} ${encontrista.sobrenome}`
  const idade = encontrista.dataNasc ? getAge(encontrista.dataNasc) : 0

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
                {encontrista.observacoes ||
                encontrista.obsExternaLocalizacao ||
                encontrista.obsExternaConhecidos ||
                encontrista.obsExternaSaude ||
                encontrista.obsExternaOutros ? (
                  <div className="text-left">
                    {encontrista.observacoes && (
                      <div className="flex gap-2">
                        <span className="font-bold text-zinc-600">
                          Observação:
                        </span>
                        <span>{encontrista.observacoes}</span>
                      </div>
                    )}
                    {encontrista.obsExternaLocalizacao && (
                      <div className="flex gap-2">
                        <span className="font-bold text-zinc-600">
                          Localização:
                        </span>
                        <span>{encontrista.obsExternaLocalizacao}</span>
                      </div>
                    )}
                    {encontrista.obsExternaConhecidos && (
                      <div className="flex gap-2">
                        <span className="font-bold text-zinc-600">
                          Conhecidos:
                        </span>
                        <span>{encontrista.obsExternaConhecidos}</span>
                      </div>
                    )}
                    {encontrista.obsExternaSaude && (
                      <div className="flex gap-2">
                        <span className="font-bold text-zinc-600">Saúde:</span>
                        <span>{encontrista.obsExternaSaude}</span>
                      </div>
                    )}
                    {encontrista.obsExternaOutros && (
                      <div className="flex gap-2">
                        <span className="font-bold text-zinc-600">Outros:</span>
                        <span>{encontrista.obsExternaOutros}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-center text-zinc-400">
                    Não tem observação
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
            <Link href={`/admin/externa/${encontrista.slug}/edit`}>
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
