'use client'

import { TamanhoCamisaData } from '@/app/api/domains/tamanho_camisa/route'
import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectArray,
  SelectItem,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { MultiStep } from '@/components/MultiStep'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
  const response: TamanhoCamisaData[] = await api
    .get('domains/tamanho_camisa')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = {
      label: item.tamanho_camisa,
      value: item.id,
    }

    selectData.push(selectItem)
  })

  return selectData
}

export function OtherDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, previousStep, handleStep, activeStep } = useWizard()

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

  function handleNextFormStep(formDataInput: OtherFormDataInput) {
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))
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
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <span className="text-nowrap text-2xl font-bold">Outros</span>
            <MultiStep size={5} currentStep={activeStep} />
          </div>
          <div className="flex flex-col gap-14 px-0 py-14 text-lg">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">
                  Informações extras
                </span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

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
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="observacoes"
                defaultValue={completeForm.other.observacoes}
                render={({ field }) => (
                  <TextInput label={'Observações'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full p-0">
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={previousStep}>
              Voltar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Avançar
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form>
  )
}
