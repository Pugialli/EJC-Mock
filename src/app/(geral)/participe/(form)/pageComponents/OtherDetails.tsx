'use client'

import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectArray,
  SelectItem,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'

import type { TamanhoCamisa } from '@/app/api/domains/tamanho_camisa/get-tamanho-camisa'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  CreateEncontristaContext,
  OtherFormData,
} from '@/context/CreateEncontristaContext'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { z } from 'zod'
import { CardParticipe } from '../components/CardParticipe'
import { CardSection } from '../components/CardSection'

const otherFormScheme = z.object({
  tamanhoCamisa: z.enum(['p', 'm', 'g', 'gg', 'xgg', 'outro']).optional(),
  outroMovimento: z.enum(['sim', 'nao'], {
    required_error: 'Esse campo é obrigatório',
  }),
  nomeMovimento: z.string().optional(),

  restricoesAlimentares: z.string().optional(),
  observacoes: z.string().optional(),
})

export type OtherFormDataInput = z.infer<typeof otherFormScheme>

async function getTamanhoCamisa() {
  const response: TamanhoCamisa[] = await api
    .get('domains/tamanho_camisa')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = {
      label: item.tamanhoCamisa,
      value: item.id,
    }

    selectData.push(selectItem)
  })

  return selectData
}

export function OtherDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, handleStep, activeStep } = useWizard()

  const { data: tamanhoCamisa } = useQuery<SelectArray[]>({
    queryFn: async () => await getTamanhoCamisa(),
    queryKey: ['tamanhoCamisa'],
  })

  const form = useForm<OtherFormDataInput>({
    resolver: zodResolver(otherFormScheme),
  })

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = form

  async function handleNextFormStep(formDataInput: OtherFormDataInput) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000))
    const otherData = formDataInput as OtherFormData

    handleStep(() => {
      updateData({ data: otherData, step: activeStep })
    })
    nextStep()
  }

  const isFromOtherGroup = !(watch('outroMovimento') === 'sim')

  return (
    <Form {...form}>
      <form
        id="otherForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardParticipe title="Outros" isSubmitting={isSubmitting}>
          <CardSection title="Informações extras?">
            <FormField
              control={control}
              name="tamanhoCamisa"
              defaultValue={completeForm.other.tamanhoCamisa}
              render={({ field }) => {
                return (
                  <SelectGroupInput
                    label="Qual é seu tamanho de camisa?"
                    placeholder="Selecione uma opção"
                    onChange={field.onChange}
                    value={field.value}
                  >
                    {tamanhoCamisa &&
                      tamanhoCamisa.map((item) => {
                        return (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            text={item.label}
                          />
                        )
                      })}
                  </SelectGroupInput>
                )
              }}
            />

            <FormField
              control={control}
              name="outroMovimento"
              defaultValue={completeForm.other.outroMovimento}
              render={({ field }) => {
                return (
                  <RadioInputGroup
                    label="Você fez parte ativamente de outro encontro de jovens? *"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <RadioInputItem value="sim" label="Sim" />
                    <RadioInputItem value="nao" label="Não" />
                  </RadioInputGroup>
                )
              }}
            />

            <FormField
              control={control}
              name="nomeMovimento"
              defaultValue={completeForm.other.nomeMovimento}
              render={({ field }) => (
                <TextInput label={'De qual movimento você fez parte?'}>
                  <Input {...field} disabled={isFromOtherGroup} />
                </TextInput>
              )}
            />

            <FormField
              control={control}
              name="restricoesAlimentares"
              defaultValue={completeForm.other.restricoesAlimentares}
              render={({ field }) => (
                <TextInput label={'Restrições alimentares'}>
                  <Input autoFocus {...field} />
                </TextInput>
              )}
            />

            <FormField
              control={control}
              name="observacoes"
              defaultValue={completeForm.other.observacoes}
              render={({ field }) => (
                <TextInput label={'Observações'}>
                  <Textarea {...field} />
                </TextInput>
              )}
            />
          </CardSection>
        </CardParticipe>
      </form>
    </Form>
  )
}
