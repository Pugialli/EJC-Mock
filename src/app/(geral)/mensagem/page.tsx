'use client'

import type { EncontristaConfirmadosData } from '@/app/api/encontro/[numeroEncontro]/confirmados/get-confirmados'

import { type SelectArray } from '@/components/Form/SelectInput/SelectItem'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { MensagemAberta } from './MensagemAberta'
import { MensagemFechada } from './MensagemFechada'

async function getConfirmados() {
  const encontro = '71'
  const response: EncontristaConfirmadosData[] = await api
    .get(`encontro/${encontro}/confirmados`)
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = {
      label: `${item.nome} ${item.sobrenome}`,
      value: item.slug,
    }

    selectData.push(selectItem)
  })

  return selectData
}

async function getCartasStatus() {
  const res = await api.get(`encontro/71/get-carta-status`)
  return res.data as boolean
}

const messageScheme = z.object({
  encontrista: z.string({ required_error: 'O encontrista é obrigatório.' }),
  para: z
    .string({ required_error: 'Para quem devemos enviar?' })
    .min(2, { message: 'Para quem deve conter pelo menos 2 letras' }),
  de: z
    .string({ required_error: 'Não esqueça de assinar.' })
    .min(2, { message: 'Sua assinatura deve conter pelo menos 2 letras' }),
  conteudo: z
    .string({ required_error: 'Opa, faltou sua mensagem.' })
    .min(5, { message: 'Opa, faltou sua mensagem.' }),
})

export type messageData = z.infer<typeof messageScheme>

export default function Mensagem() {
  const { data: statusCarta } = useQuery<boolean>({
    queryKey: ['statusCarta'],
    queryFn: async () => await getCartasStatus(),
  })

  const { data: encontristas } = useQuery<SelectArray[]>({
    queryFn: async () => await getConfirmados(),
    queryKey: ['encontristasConfirmados'],
  })

  return (
    <div className="flex w-auto items-center justify-center px-4 pt-11">
      {statusCarta && encontristas && statusCarta ? (
        <MensagemAberta encontristas={encontristas} />
      ) : (
        <MensagemFechada />
      )}
    </div>
  )
}
