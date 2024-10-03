'use client'

import type { EncontreiroMontagemData } from '@/app/api/montagem/[slug]/get-encontreiro'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { cleanValueEnum } from '@/utils/clean-value-enum'
import { getInitials } from '@/utils/get-initials'
import { useQuery } from '@tanstack/react-query'
import { Baby, Instagram } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AlocacaoCard } from './AlocacaoCard'

async function getEncontreiroData(slug: string) {
  const encontreiroData = await api.get(`montagem/${slug}`)

  return encontreiroData.data
}

interface CardEncontreiroProps {
  slug: string
}

export function CardEncontreiro({ slug }: CardEncontreiroProps) {
  const { data: encontreiroData, isLoading: isLoadingEncontreiro } =
    useQuery<EncontreiroMontagemData>({
      queryKey: ['encontreiro', { slug }],
      queryFn: async () => await getEncontreiroData(slug),
    })

  const [currentData, setCurrentData] = useState<EncontreiroMontagemData>({
    id: '',
    nome: '-',
    instagram: null,
    slug: '',
    apelido: '-',
    bairro: '-',
    avatarUrl: undefined,
    numeroEncontro: undefined,
    corCirculo: undefined,
    obsBanda: '-',
    disponibilidade: 'NAO_PREENCHEU',
    obs: '-',
    preferencias: [],
    equipeEncontro: [],
    statusMontagem: null,
  })

  useEffect(() => {
    if (encontreiroData) {
      setCurrentData(encontreiroData)
    } else {
      setCurrentData({
        id: '',
        nome: '-',
        instagram: null,
        slug: '',
        apelido: '-',
        bairro: '-',
        avatarUrl: undefined,
        numeroEncontro: undefined,
        corCirculo: undefined,
        obsBanda: '-',
        disponibilidade: 'NAO_PREENCHEU',
        obs: '-',
        preferencias: [],
        equipeEncontro: [],
        statusMontagem: null,
      })
    }
  }, [encontreiroData])

  const corCirculo =
    currentData.corCirculo === 'Amarelo'
      ? 'bg-yellow-500'
      : currentData.corCirculo === 'Azul'
        ? 'bg-blue-500'
        : currentData.corCirculo === 'Laranja'
          ? 'bg-orange-500'
          : currentData.corCirculo === 'Verde'
            ? 'bg-emerald-500'
            : currentData.corCirculo === 'Vermelho'
              ? 'bg-red-500'
              : 'bg-zinc-200'

  return (
    <div className="p-4">
      <Card className="w-full rounded-xl border-none">
        <div className={cn('h-16 w-full rounded-t-xl', corCirculo)} />
        <CardTitle className="flex -translate-y-10 items-center gap-8 px-8">
          <Avatar className="h-44 w-44 ring-4 ring-white">
            <AvatarImage src={currentData.avatarUrl} />
            <AvatarFallback>
              {currentData.nome !== '-' ? getInitials(currentData.nome) : '-'}
            </AvatarFallback>
          </Avatar>
          <div className="flex h-44 w-full translate-y-10 items-center justify-between gap-8">
            <div className="flex w-full flex-col font-bold">
              <h2 className="text-2xl text-zinc-800">
                {isLoadingEncontreiro ? (
                  <Skeleton className="h-20 w-96" />
                ) : (
                  `${currentData.nome} (${currentData.apelido})`
                )}
              </h2>
              <span className="text-xl text-zinc-500">
                {isLoadingEncontreiro ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  `${currentData.numeroEncontro ? currentData.numeroEncontro : '?'}º
                EJC`
                )}
              </span>
              <div className="flex gap-4 pt-2">
                {currentData.instagram && (
                  <Button
                    type="button"
                    variant="outline"
                    className="text-tertiary disabled:cursor-auto disabled:opacity-50"
                    asChild
                  >
                    <a
                      href={`https://www.instagram.com/${currentData.instagram}/`}
                      target="_blank"
                    >
                      <Instagram className="size-5" />
                    </a>
                  </Button>
                )}

                {currentData.statusMontagem === 'CONVIDADO_ESPECIAL' && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Baby className="size-5 cursor-auto" />
                    </TooltipTrigger>
                    <TooltipContent className="w-40 text-center">
                      <span className="text-zinc-400">Convidado especial</span>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            {isLoadingEncontreiro ? (
              <Skeleton className="h-4/5 w-full" />
            ) : (
              <AlocacaoCard idPessoa={currentData.id} slug={currentData.slug} />
            )}
          </div>
        </CardTitle>
        <CardContent className="flex gap-8 pt-8">
          <Card className="w-1/2 border-none bg-zinc-100 p-8">
            <CardTitle className="text-2xl font-bold">
              Informações gerais
            </CardTitle>
            <CardContent className="flex flex-col gap-12 px-0 pt-6">
              <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-xs text-zinc-400">Bairro</h4>
                    <span className="text-lg font-semibold text-zinc-700">
                      {currentData.bairro}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-400">Toca instrumento?</h4>
                    <span className="text-lg font-semibold text-zinc-700">
                      {currentData.obsBanda ? currentData.obsBanda : '-'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-400">
                      Disponibilidade no pré-encontro
                    </h4>
                    <span className="text-lg font-semibold text-zinc-700">
                      {currentData.disponibilidade
                        ? cleanValueEnum(currentData.disponibilidade)
                        : cleanValueEnum('NAO_PREENCHEU')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-400">Observações</h4>
                    <span className="text-base font-semibold text-zinc-700">
                      {currentData.obs ? currentData.obs : '-'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-4 text-xl font-bold leading-none">
                      Lista de preferência
                    </h4>
                    {currentData.preferencias.length > 0 ? (
                      currentData.preferencias.map((preferencia) => (
                        <div key={preferencia.posicao}>
                          <div className="flex items-center justify-between text-sm">
                            {preferencia.posicao}º - {preferencia.equipe}
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-zinc-500">
                        Não preenchido
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <ScrollArea className="h-[32rem] w-1/2 rounded-md bg-zinc-100">
            <div className="w-full p-4 pt-8">
              <h4 className="mb-4 text-2xl font-bold leading-none">
                Últimas equipes
              </h4>
              {currentData.equipeEncontro.length > 0 ? (
                currentData.equipeEncontro.map((equipe) => (
                  <div key={equipe.encontro}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <div className="text-nowrap">
                        {equipe.encontro}º - {equipe.equipe}
                      </div>
                      <div> {equipe.coordenou && <Badge>C</Badge>}</div>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))
              ) : (
                <span className="text-sm text-zinc-500">Nunca trabalhou</span>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
