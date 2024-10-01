'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CirculosForm } from './CirculosForm'
import { OrderForm } from './OrderForm'

const editEncontroFormScheme = z.object({
  amarelo: z.object({
    active: z.boolean(),
    tioAparente: z.string().optional(),
    tioSecreto: z.string().optional(),
  }),
  azul: z.object({
    active: z.boolean(),
    tioAparente: z.string().optional(),
    tioSecreto: z.string().optional(),
  }),
  laranja: z.object({
    active: z.boolean(),
    tioAparente: z.string().optional(),
    tioSecreto: z.string().optional(),
  }),
  verde: z.object({
    active: z.boolean(),
    tioAparente: z.string().optional(),
    tioSecreto: z.string().optional(),
  }),
  vermelho: z.object({
    active: z.boolean(),
    tioAparente: z.string().optional(),
    tioSecreto: z.string().optional(),
  }),
})

export type EditEncontroFormDataInput = z.infer<typeof editEncontroFormScheme>

export default function EditEncontroForm() {
  const form = useForm<EditEncontroFormDataInput>({
    resolver: zodResolver(editEncontroFormScheme),
    defaultValues: {
      amarelo: {
        active: true,
      },
      azul: {
        active: true,
      },
      laranja: {
        active: false,
      },
      verde: {
        active: true,
      },
      vermelho: {
        active: true,
      },
    },
  })

  const { handleSubmit } = form

  function handleUpdateEncontro() {
    return null
  }

  return (
    <FormProvider {...form}>
      <form id="editEncontroForm" onSubmit={handleSubmit(handleUpdateEncontro)}>
        <div className="flex flex-col gap-2 px-4">
          <CirculosForm />
          <OrderForm />
        </div>
      </form>
    </FormProvider>
  )
}
