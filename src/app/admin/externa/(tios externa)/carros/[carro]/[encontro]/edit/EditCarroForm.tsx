'use client'

import type { CarroData } from '@/app/api/carro/[carro]/[encontro]/get-carro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CaronaCard } from './pageComponents/CaronaCard'
import { CarroCard } from './pageComponents/CarroCard'
import { MotoristaCard } from './pageComponents/MotoristaCard'
import { EditNavigation } from './pageComponents/Nav/edit-nav'

interface EditCarroProps {
  data: CarroData
}

const editFormScheme = z.object({
  numeroCarro: z.preprocess(
    (val) => {
      return typeof val === 'string' ? parseInt(val, 10) : val
    },
    z.number().min(1, { message: 'O número é obrigatório.' }),
  ),
  placaCarro: z.string().min(7, { message: 'A placa está incompleta.' }),
  observacao: z.string().optional(),
  modeloCarro: z.string().optional(),
  lugaresCarro: z.preprocess(
    (val) => {
      return typeof val === 'string' ? parseInt(val, 10) : val
    },
    z.number().min(1, { message: 'O número é obrigatório.' }),
  ),
  observacaoMotorista: z.string().optional(),

  motorista: z.object({
    nome: z
      .string({ required_error: 'O nome é obrigatório.' })
      .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
    sobrenome: z
      .string({ required_error: 'O sobrenome é obrigatório.' })
      .min(3, { message: 'O sobrenome precisa ter pelo menos 3 letras' }),
    apelido: z.string().optional(),
    celular: z
      .string()
      .min(14, { message: 'O número de celular está incompleto' }),
    telefone: z.string().nullable(),
    email: z
      .string({ required_error: 'O email é obrigatório.' })
      .email({ message: 'O email não é válido' }),
    cep: z
      .string({ required_error: 'O cep é obrigatório.' })
      .min(9, { message: 'O cep está incompleto.' }),
    cidade: z.string().min(1, { message: 'A cidade é obrigatória.' }),
    bairro: z.string().min(1, { message: 'O bairro é obrigatório.' }),
    rua: z.string().min(1, { message: 'A rua é obrigatória.' }),
  }),

  carona: z
    .object({
      nome: z
        .string({ required_error: 'O nome é obrigatório.' })
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
      sobrenome: z
        .string({ required_error: 'O sobrenome é obrigatório.' })
        .min(3, { message: 'O sobrenome precisa ter pelo menos 3 letras' }),
      apelido: z.string().optional(),
      celular: z
        .string()
        .min(14, { message: 'O número de celular está incompleto' }),
      telefone: z.string().nullable(),
      email: z
        .string({ required_error: 'O email é obrigatório.' })
        .email({ message: 'O email não é válido' }),
      cep: z
        .string({ required_error: 'O cep é obrigatório.' })
        .min(9, { message: 'O cep está incompleto.' }),
      cidade: z.string().min(1, { message: 'A cidade é obrigatória.' }),
      bairro: z.string().min(1, { message: 'O bairro é obrigatório.' }),
      rua: z.string().min(1, { message: 'A rua é obrigatória.' }),
    })
    .nullable(),
})

export type EditFormDataInput = z.infer<typeof editFormScheme>

export function EditCarroForm({ data }: EditCarroProps) {
  const [isUpdating, setUpdating] = useState(false)
  const router = useRouter()

  const form = useForm<EditFormDataInput>({
    resolver: zodResolver(editFormScheme),
    defaultValues: {
      numeroCarro: data.numeroCarro,
      observacao: data.observacao ? data.observacao : '',
      modeloCarro: data.carro.modeloCarro,
      placaCarro: data.carro.placaCarro,
      lugaresCarro: data.carro.lugaresCarro,
      observacaoMotorista: data.carro.observacaoMotorista,
      motorista: {
        nome: data.carro.pessoaMotorista.nome,
        sobrenome: data.carro.pessoaMotorista.sobrenome,
        celular: data.carro.pessoaMotorista.celular,
        telefone: data.carro.pessoaMotorista.telefone
          ? data.carro.pessoaMotorista.telefone
          : '',
        email: data.carro.pessoaMotorista.email,
        cep: data.carro.pessoaMotorista.enderecoCep,
      },
      carona: {
        nome: data.carro.pessoaCarona ? data.carro.pessoaCarona.nome : '',
        sobrenome: data.carro.pessoaCarona
          ? data.carro.pessoaCarona.sobrenome
          : '',
        celular: data.carro.pessoaCarona ? data.carro.pessoaCarona.celular : '',
        telefone:
          data.carro.pessoaCarona && data.carro.pessoaCarona.telefone
            ? data.carro.pessoaCarona.telefone
            : '',
        email: data.carro.pessoaCarona ? data.carro.pessoaCarona.email : '',
        cep: data.carro.pessoaCarona ? data.carro.pessoaCarona.enderecoCep : '',
      },
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  async function handleUpdateCarro(formDataInput: EditFormDataInput) {
    setUpdating(true)
    await api
      .put('/carro/update', formDataInput)
      .then(async () => {
        router.push('/admin/externa/carros')
      })
      .catch((err) => console.log(err, errors))
  }

  return (
    <FormProvider {...form}>
      <form id="editCarroForm" onSubmit={handleSubmit(handleUpdateCarro)}>
        <div className="grid w-full grid-cols-12 gap-7">
          <div className="hidden h-80 w-1/4 lg:col-span-3 lg:grid">
            <Card className="fixed h-auto w-[19%] px-1 py-8 text-zinc-700">
              <CardContent className="w-full py-0">
                <EditNavigation />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-full lg:col-start-4">
            <div className="flex flex-col gap-6">
              <CarroCard />
              <MotoristaCard />
              <CaronaCard />
              <Card
                id="save-section"
                className="w-full px-3 pt-8 text-zinc-700 "
              >
                <CardContent className="w-full">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-2xl font-bold lg:text-nowrap">
                      Salvar Mudanças
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                    <div className="px-0 py-5 text-lg lg:py-7">
                      Lembre-se de salvar qualquer mudança realizada nessa
                      página.
                    </div>
                    <div className="flex items-center justify-center gap-5 px-0 py-5 text-lg lg:flex-row lg:gap-7 lg:py-7">
                      <Button
                        onClick={() => {
                          router.push('/admin/externa/carros')
                        }}
                        type="button"
                        variant="outline"
                        className="disabled:opacity-50' h-10 w-40 disabled:cursor-wait"
                        disabled={isUpdating}
                      >
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        className="h-10 w-40"
                        disabled={isUpdating}
                      >
                        Atualizar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
