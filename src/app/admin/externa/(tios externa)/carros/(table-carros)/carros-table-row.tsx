import { MessageSquareMore, Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import type { CarroSummaryData } from '@/app/api/carro/get-carros-summary'
import { CarroExterna } from '@/components/Table/CarroExterna'
import { DeleteCarroDialog } from '@/components/Table/DeleteCarroDialog'
import { ImportCarroButton } from '@/components/Table/ImportCarroButton'
import type { SelectItemAvatarProps } from '@/components/Table/SelectItemAvatar'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import type { Value_Status as valueStatus } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
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
  carro: CarroSummaryData
}

async function getEquipeExterna() {
  const encontro = 71

  const equipe = await api
    .get(`encontro/${encontro}/externa`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return equipe
}

export function CarrosTableRow({ carro }: EncontristaTableRowProps) {
  const [open, setOpen] = useState(false)

  const isFromThisEncontro = carro.ultimaExterna === 72

  const { data: equipeExterna, isLoading } = useQuery<SelectItemAvatarProps[]>({
    queryFn: async () => await getEquipeExterna(),
    queryKey: ['equipeExterna'],
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <TableRow className="bg-white">
        <TableCell>{carro.ultimaExterna}</TableCell>
        <TableCell>{carro.nomeMotorista}</TableCell>
        <TableCell className="text-nowrap">{carro.contatoMotorista}</TableCell>
        <TableCell>{carro.bairro}</TableCell>
        <TableCell className="text-nowrap">{carro.placa}</TableCell>
        <TableCell>{carro.modelo}</TableCell>
        <TableCell>{carro.vagas}</TableCell>
        <TableCell className="w-7 lg:w-[178px]">
          {isLoading ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            <CarroExterna
              idExterna={carro.idExterna}
              idCarro={carro.id}
              equipe={equipeExterna}
              disabled={!isFromThisEncontro}
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
                {carro.obsExterna || carro.obsMotorista ? (
                  <div className="text-left">
                    {carro.obsExterna && (
                      <div className="flex gap-2">
                        <span className="font-bold text-zinc-600">
                          Externa:
                        </span>
                        <span>{carro.obsExterna}</span>
                      </div>
                    )}
                    {carro.obsMotorista && (
                      <div className="flex gap-2">
                        <span className="font-bold text-zinc-600">
                          Motorista:
                        </span>
                        <span>{carro.obsMotorista}</span>
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
            <Link
              href={`/admin/externa/carros/${carro.id}/${carro.ultimaExterna}/edit`}
            >
              <Button variant="ghost" className="p-0">
                <Pencil className="h-4 w-4 text-zinc-400 hover:text-zinc-500" />
              </Button>
            </Link>
            {isFromThisEncontro ? (
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
                </Button>
              </AlertDialogTrigger>
            ) : (
              <ImportCarroButton
                key={carro.id}
                idCarro={carro.id}
                observacao={carro.obsExterna}
              />
            )}
          </div>
        </TableCell>
      </TableRow>

      <DeleteCarroDialog
        idCarro={carro.id}
        nomeMotorista={carro.nomeMotorista}
        placaCarro={carro.placa}
        openFn={setOpen}
      />
    </AlertDialog>
  )
}
