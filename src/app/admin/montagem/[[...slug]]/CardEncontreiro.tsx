'use client'

import type { EncontreiroMontagemData } from '@/app/api/encontreiro/[slug]/get-encontreiro'
import { SelectItem } from '@/components/Form/SelectInput/SelectItem'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { cleanValueEnum } from '@/utils/clean-value-enum'
import { getInitials } from '@/utils/get-initials'
import { useEffect, useState } from 'react'

async function getMontagemData(slug: string) {
  const res = await api.get(`/encontreiro/${slug}`)

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const encontreiroData = await res.data

  return encontreiroData
}

interface CardEncontreiroProps {
  slug: string
}

export function CardEncontreiro({ slug }: CardEncontreiroProps) {
  const [currentData, setCurrentData] = useState<
    EncontreiroMontagemData | undefined
  >(undefined)
  const [corCirculo, setCorCirculo] = useState<string>('bg-zinc-200')

  useEffect(() => {
    async function fetchData() {
      console.log(slug)
      if (slug !== '') {
        const data: EncontreiroMontagemData = await getMontagemData(slug)
        setCurrentData(data)
        if (data.corCirculo) {
          if (data.corCirculo === 'Amarelo') {
            setCorCirculo('bg-yellow-500')
          } else if (data.corCirculo === 'Azul') {
            setCorCirculo('bg-blue-500')
          } else if (data.corCirculo === 'Laranja') {
            setCorCirculo('bg-orange-500')
          } else if (data.corCirculo === 'Verde') {
            setCorCirculo('bg-emerald-500')
          } else if (data.corCirculo === 'Vermelho') {
            setCorCirculo('bg-red-500')
          }
        }
      }
    }
    fetchData()
  }, [slug])

  const equipes = [
    {
      index: -1,
      value: 'vazio',
      label: 'Selecione uma equipe',
    },
    {
      index: 0,
      value: 'nao_participara',
      label: 'Não irá participar',
    },
    {
      index: 1,
      value: 'apresentacao',
      label: 'Apresentação',
    },
    {
      index: 2,
      value: 'tio_circulo',
      label: 'Tio de círculo',
    },
    {
      index: 3,
      value: 'boa_vontade',
      label: 'Boa Vontade',
    },
    { index: 4, value: 'externa', label: 'Externa' },
    {
      index: 5,
      value: 'meditacao',
      label: 'Meditação',
    },
    { index: 6, value: 'vigilia', label: 'Vigília' },
    { index: 7, value: 'compras', label: 'Compras' },
    { index: 8, value: 'recepcao', label: 'Recepção' },
    { index: 9, value: 'banda', label: 'Banda' },
    { index: 10, value: 'cozinha', label: 'Cozinha' },
    { index: 11, value: 'garcom', label: 'Garçom' },
    { index: 12, value: 'liturgia', label: 'Liturgia' },
    {
      index: 13,
      value: 'mini',
      label: 'Mini e Trânsito',
    },
    {
      index: 14,
      value: 'ordem',
      label: 'Ordem e Limpeza',
    },
    {
      index: 15,
      value: 'secretaria',
      label: 'Secretaria',
    },
    { index: 16, value: 'teatro', label: 'Teatro' },
  ]

  function handleValueChanged(equipeEncontro: string) {
    console.log(equipeEncontro)
  }
  return (
    <div className="p-4">
      <Card className="w-full rounded-xl border-none lg:h-[53rem]">
        <div className={cn('h-16 w-full rounded-t-xl', corCirculo)} />
        <CardTitle className="flex -translate-y-12 items-center gap-8 px-8">
          <Avatar className="h-44 w-44 ring-4 ring-white">
            <AvatarImage
              src={currentData ? currentData.avatarUrl : undefined}
            />
            <AvatarFallback>
              {currentData ? getInitials(currentData.nome) : '-'}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full items-center justify-between gap-8">
            <div className="flex flex-col font-bold">
              <h2 className="w-9/10 text-2xl text-zinc-800 lg:text-3xl">
                {currentData ? currentData.nome : '-'}
              </h2>
              <span className="text-xl text-zinc-500">
                {currentData ? currentData.numeroEncontro : '?'}º EJC
              </span>
            </div>
            <Card className="mt-16 w-80 border-none bg-zinc-100 p-8">
              <CardTitle className="text-2xl font-bold">
                Neste Encontro
              </CardTitle>
              <CardContent className="flex flex-col gap-12 px-0 pt-6">
                <div className="flex justify-between">
                  <Select onValueChange={handleValueChanged}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma equipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {equipes.map((item) => {
                          return (
                            <SelectItem
                              key={item.index}
                              value={item.value}
                              text={item.label}
                            />
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardTitle>
        <CardContent className="flex gap-8">
          <Card className="w-1/2 border-none bg-zinc-100 px-8 pt-8">
            <CardTitle className="text-2xl font-bold">
              Informações gerais
            </CardTitle>
            <CardContent className="flex flex-col gap-12 px-0 pt-6">
              <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-xs text-zinc-400">Bairro</h4>
                    <span className="text-lg font-semibold text-zinc-700">
                      {currentData ? currentData.bairro : '-'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-400">Toca instrumento?</h4>
                    <span className="text-lg font-semibold text-zinc-700">
                      {currentData && currentData.obsBanda
                        ? currentData.obsBanda
                        : '-'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-400">
                      Disponibilidade no pré-encontro
                    </h4>
                    <span className="text-lg font-semibold text-zinc-700">
                      {currentData && currentData.disponibilidade
                        ? cleanValueEnum(currentData.disponibilidade)
                        : '-'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-400">Observações</h4>
                    <span className="text-lg font-semibold text-zinc-700">
                      {currentData && currentData.obs ? currentData.obs : '-'}{' '}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-4 text-xl font-bold leading-none">
                      Lista de preferência
                    </h4>
                    {currentData && currentData.preferencias.length > 0 ? (
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
              {currentData && currentData.equipeEncontro.length > 0 ? (
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
