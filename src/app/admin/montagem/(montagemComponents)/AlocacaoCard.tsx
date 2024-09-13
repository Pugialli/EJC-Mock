'use client'

import type { Equipes } from '@/app/api/domains/equipes/get-equipes'
import type { EncontreiroEquipeMontagem } from '@/app/api/montagem/[slug]/equipe/get-equipe'
import type { changeEquipeProps } from '@/app/api/montagem/alocate-equipe/alocate-equipe'
import type { EncontreiroSummary } from '@/app/api/montagem/summary/[encontro]/get-encontreiros-summary'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { api } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export interface AlocacaoCardProps {
  idPessoa: string
  slug: string
}

export async function getEquipes() {
  const response = await api
    .get('domains/equipes')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

async function getEncontreiroEquipe(slug: string) {
  const response = await api.get(`montagem/${slug}/equipe`)

  return response.data as EncontreiroEquipeMontagem
}

function checkAutoCoord(equipeValue: string) {
  if (
    equipeValue === 'apresentacao' ||
    equipeValue === 'compras' ||
    equipeValue === 'dirigente' ||
    equipeValue === 'externa' ||
    equipeValue === 'meditacao' ||
    equipeValue === 'recepcao' ||
    equipeValue === 'vigilia'
  ) {
    return true
  }
  return false
}

export async function changeEncontreiroEquipe({
  idEncontreiro,
  coordenando,
  valueEquipe,
}: changeEquipeProps) {
  await api.post('montagem/alocate-equipe', {
    idEncontreiro,
    coordenando,
    valueEquipe,
  })
}

export function AlocacaoCard({ idPessoa, slug }: AlocacaoCardProps) {
  const { data: equipes } = useQuery<Equipes[]>({
    queryFn: async () => await getEquipes(),
    queryKey: ['equipes'],
  })

  const [equipeSelected, setEquipeSelected] = useState({
    valueEquipe: 'select_equipe',
    coordenando: false,
  })

  const disableCoord = !!(
    equipeSelected.valueEquipe === 'apresentacao' ||
    equipeSelected.valueEquipe === 'compras' ||
    equipeSelected.valueEquipe === 'dirigente' ||
    equipeSelected.valueEquipe === 'externa' ||
    equipeSelected.valueEquipe === 'meditacao' ||
    equipeSelected.valueEquipe === 'recepcao' ||
    equipeSelected.valueEquipe === 'vigilia' ||
    equipeSelected.valueEquipe === 'select_equipe' ||
    equipeSelected.valueEquipe === 'boa_vontade' ||
    equipeSelected.valueEquipe === 'nao_participara' ||
    equipeSelected.valueEquipe === 'tio_aparente' ||
    equipeSelected.valueEquipe === 'tio_circulo' ||
    equipeSelected.valueEquipe === 'tio_secreto'
  )

  const queryClient = useQueryClient()

  function updateEquipesOnCache(
    encontreiroId: string,
    equipeMontagem: string,
    coordenador: boolean,
  ) {
    const encontreiroEquipeListCache =
      queryClient.getQueriesData<EncontreiroSummary>({
        queryKey: ['encontreiroSummary'],
      })

    encontreiroEquipeListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<EncontreiroSummary>(cacheKey, {
        ...cacheData,
        encontreiro: cacheData.encontreiro.map((encontreiroAtivo) => {
          if (encontreiroAtivo.id === encontreiroId) {
            return { ...encontreiroAtivo, equipeMontagem, coordenador }
          }
          return encontreiroAtivo
        }),
      })
    })
  }

  const { mutateAsync: changeEncontreiroEquipeFn } = useMutation({
    mutationFn: changeEncontreiroEquipe,
    onSuccess: (
      _,
      {
        idEncontreiro: encontreiroId,
        valueEquipe: equipeMontagem,
        coordenando: coordenador,
      },
    ) => {
      updateEquipesOnCache(encontreiroId, equipeMontagem, coordenador)
    },
  })

  function handleUpdateEquipeEncontreiro(equipeMontagem: string) {
    if (equipeMontagem === 'select_equipe') {
      setEquipeSelected({ valueEquipe: 'select_equipe', coordenando: false })
      changeEncontreiroEquipeFn({
        idEncontreiro: idPessoa,
        coordenando: false,
        valueEquipe: equipeMontagem,
      })
    } else {
      const isAutoCoord = checkAutoCoord(equipeMontagem)
      setEquipeSelected({
        valueEquipe: equipeMontagem,
        coordenando: isAutoCoord,
      })
      changeEncontreiroEquipeFn({
        idEncontreiro: idPessoa,
        coordenando: isAutoCoord,
        valueEquipe: equipeMontagem,
      })
    }
  }

  function handleCoordChanged() {
    const coord = !equipeSelected.coordenando
    setEquipeSelected({
      valueEquipe: equipeSelected.valueEquipe,
      coordenando: coord,
    })
    changeEncontreiroEquipeFn({
      idEncontreiro: idPessoa,
      coordenando: coord,
      valueEquipe: equipeSelected.valueEquipe,
    })
  }

  useEffect(() => {
    async function fetchEquipe(slug: string) {
      const encontreiroData = await getEncontreiroEquipe(slug)

      if (encontreiroData && encontreiroData.equipeMontagem) {
        setEquipeSelected(encontreiroData.equipeMontagem)
      }
    }
    fetchEquipe(slug)
  }, [slug])

  return (
    <Card className="w-96 border-none bg-zinc-100 px-8 py-4">
      <CardTitle className="text-2xl font-bold">Neste Encontro</CardTitle>
      <CardContent className="flex flex-col gap-4 px-0 pb-0 pt-2">
        <Select
          onValueChange={handleUpdateEquipeEncontreiro}
          value={equipeSelected.valueEquipe}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma equipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="select_equipe" value="select_equipe">
                Selecione uma equipe
              </SelectItem>

              {equipes &&
                equipes.map((item) => {
                  return (
                    <SelectItem key={item.equipeValue} value={item.equipeValue}>
                      {item.equipeLabel}
                    </SelectItem>
                  )
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="coordenador"
            disabled={disableCoord}
            checked={equipeSelected.coordenando}
            onCheckedChange={handleCoordChanged}
          />
          <Label htmlFor="coordenador">Coordenador</Label>
        </div>
      </CardContent>
    </Card>
  )
}
