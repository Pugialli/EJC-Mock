'use client'

import type { ProfileData } from '@/app/api/profile/[id]/get-profile'
import AvatarGroup, { type EncontreiroTropa } from '@/components/AvatarGroup'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import { CarFront, ClipboardList, FolderOpen, Users } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { ButtonLabel } from './(sectionComponents)/ButtonLabel'

async function getProfile(id: string) {
  const res = await api.get(`/profile/${id}`)

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const profileData = await res.data

  return profileData
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData | undefined>(
    undefined,
  )
  const [corCirculo, setCorCirculo] = useState<string>('bg-zinc-200')

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession()
      if (session) {
        const data: ProfileData = await getProfile(session.user.id)
        setProfileData(data)
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
    fetchSession()
  }, [])

  const dirigente = false

  const tropa: EncontreiroTropa[] = [
    {
      name: 'Amanda Padilha',
      avatarURl: '',
      role: 'COORDENADOR',
    },
    {
      name: 'Isabella Xavier',
      avatarURl: '',
      role: 'SECRETARIA',
    },
    {
      name: 'Lucas Zirreta',
      avatarURl: '',
      role: 'DIRIGENTE',
    },
    {
      name: 'João Paulo Pugialli',
      avatarURl: '',
      role: 'EXTERNA',
    },
    {
      name: 'Flávia Messa',
      avatarURl: '',
      role: 'ENCONTREIRO',
    },
    {
      name: 'Maurício Falbo',
      avatarURl: '',
      role: 'ADMIN',
    },
    {
      name: 'Ceci',
      avatarURl: '',
      role: 'TIOSECRETO',
    },
    {
      name: 'João Ximenes',
      avatarURl: '',
      role: 'TIOSECRETO',
    },
    {
      name: 'Panda',
      avatarURl: '',
      role: 'TIOSECRETO',
    },
    {
      name: 'Wesley',
      avatarURl: '',
      role: 'TIOSECRETO',
    },
  ]

  const membrosCoord = tropa.filter(
    (encontreiro) =>
      encontreiro.role === 'COORDENADOR' ||
      encontreiro.role === 'DIRIGENTE' ||
      encontreiro.role === 'EXTERNA' ||
      encontreiro.role === 'SECRETARIA',
  )
  const membrosTropa = tropa.filter(
    (encontreiro) =>
      encontreiro.role !== 'COORDENADOR' &&
      encontreiro.role !== 'DIRIGENTE' &&
      encontreiro.role !== 'EXTERNA' &&
      encontreiro.role !== 'SECRETARIA',
  )

  return (
    <div className="w-full px-40 py-16">
      <Card className="w-full rounded-xl border-none">
        <div className={cn('h-36 w-full rounded-t-xl', corCirculo)} />
        <CardTitle className="flex -translate-y-8 items-center gap-8 px-8">
          <Avatar className="h-44 w-44 ring-4 ring-white">
            <AvatarImage
              src={profileData ? profileData.avatarUrl : undefined}
            />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col font-bold">
            <h2 className="text-3xl  text-zinc-800">{profileData?.nome}</h2>
            <span className="text-xl text-zinc-500">
              {profileData?.numeroEncontro ? profileData.numeroEncontro : '?'}º
              EJC
            </span>
          </div>
        </CardTitle>
        <CardContent className="flex gap-8">
          <Card className="w-full border-none bg-zinc-100 p-8 pr-24">
            <CardTitle className="text-2xl font-bold">
              Próximo Encontro
            </CardTitle>
            <CardContent className="flex flex-col gap-12 px-0 pt-6">
              <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-sm text-zinc-400">Sua Equipe</h4>
                    <span className="text-xl font-semibold text-zinc-700">
                      Externa (Rosa)
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm text-zinc-400">Função</h4>
                    <span className="text-xl font-semibold text-zinc-700">
                      Coordenador
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm text-zinc-400">Membros</h4>
                  <div className="flex flex-col gap-4">
                    <AvatarGroup encontreiros={membrosCoord} loose />
                    {!dirigente && <AvatarGroup encontreiros={membrosTropa} />}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <h4 className="text-2xl font-bold">Seus acessos</h4>
                <div className="flex gap-8">
                  <ButtonLabel
                    label="Painel da Externa"
                    icon={CarFront}
                    link="/"
                  />
                  <ButtonLabel
                    label="Pasta Virtual"
                    icon={FolderOpen}
                    link="/"
                  />
                  <ButtonLabel
                    label="Ficha de Cadastro"
                    icon={ClipboardList}
                    link="/"
                  />
                  <ButtonLabel label="Tropa" icon={Users} link="/" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-100 border-none bg-zinc-100 p-8">
            <CardContent className="flex flex-col justify-start gap-4">
              <div>
                <h4 className="text-sm text-zinc-400">Edição</h4>
                <span className="text-zinc-700">71º EJC</span>
              </div>
              <div>
                <h4 className="text-sm text-zinc-400">Data</h4>
                <span>24 de maio</span>
              </div>
              <div>
                <h4 className="text-sm text-zinc-400">Local</h4>
                <span>Colégio Divina Providência</span>
              </div>
              <div>
                <h4 className="text-sm text-zinc-400">Tema espiritual</h4>
                <span>O Amor de Cristo nos uniu</span>
              </div>
              <div>
                <h4 className="text-sm text-zinc-400">Tema fantasia</h4>
                <span>Madagascar</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
