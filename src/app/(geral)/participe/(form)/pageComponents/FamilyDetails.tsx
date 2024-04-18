'use client'

import { MoraComData } from '@/app/api/domains/mora_com/route'
import { StatusPaisData } from '@/app/api/domains/status_pais/route'
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
  FamilyFormData,
} from '@/context/CreateEncontristaContext'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const familyFormScheme = z.object({
  moraCom: z.enum(['sozinho', 'conjuge', 'familiar'], {
    required_error: 'Este campo é obrigatório',
  }),
  statusPais: z.enum(['sim', 'nao', 'na'], {
    required_error: 'Este campo é obrigatório',
  }),
  nomeFamiliar: z
    .string({
      required_error: 'O nome de pelo menos um familiar é obrigatório.',
    })
    .min(3, { message: 'O nome de pelo menos um familiar é obrigatório.' }),
  telFamiliar: z
    .string()
    .min(13, { message: 'O número de telefone está incompleto' }),
  nomeFamiliar2: z.string(),
  telFamiliar2: z.string(),
})

export type FamilyFormDataInput = z.infer<typeof familyFormScheme>

async function getMoraCom() {
  const response: MoraComData[] = await api
    .get('domains/mora_com')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.mora_com, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}

async function getStatusPais() {
  const response: StatusPaisData[] = await api
    .get('domains/status_pais')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.status_pais, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}

export function FamilyDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, previousStep, handleStep, activeStep } = useWizard()

  const { data: moraCom } = useQuery<SelectArray[]>({
    queryFn: async () => await getMoraCom(),
    queryKey: ['moraCom'],
  })

  const { data: statusPais } = useQuery({
    queryFn: async () => await getStatusPais(),
    queryKey: ['statusPais'],
  })

  const form = useForm<FamilyFormDataInput>({
    resolver: zodResolver(familyFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  function handleNextFormStep(formDataInput: FamilyFormDataInput) {
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    const familyData = formDataInput as FamilyFormData

    handleStep(() => {
      updateData({ data: familyData, step: activeStep })
    })
    nextStep()
  }

  return (
    <Form {...form}>
      <form
        id="familyForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <span className="text-nowrap text-2xl font-bold">Família</span>
            <MultiStep size={5} currentStep={activeStep} />
          </div>
          <div className="flex flex-col gap-14 px-0 py-14 text-lg">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">
                  Informações familiares
                </span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

              <FormField
                control={control}
                name="moraCom"
                defaultValue={completeForm.family.moraCom}
                render={({ field }) => {
                  return (
                    <SelectGroupInput
                      label="Com quem você mora? *"
                      placeholder="Selecione uma opção"
                      onChange={field.onChange}
                      value={field.value}
                    >
                      {moraCom &&
                        moraCom.map((item) => {
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
                name="statusPais"
                defaultValue={completeForm.family.statusPais}
                render={({ field }) => {
                  return (
                    <RadioInputGroup
                      label="Seus pais são separados? *"
                      onChange={field.onChange}
                    >
                      {statusPais &&
                        statusPais.map((item) => {
                          return (
                            <RadioInputItem
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            />
                          )
                        })}
                    </RadioInputGroup>
                  )
                }}
              />

              <FormField
                control={control}
                name="nomeFamiliar"
                defaultValue={completeForm.family.nomeFamiliar}
                render={({ field }) => (
                  <TextInput label={'Nome de um familiar *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="telFamiliar"
                defaultValue={completeForm.family.telFamiliar}
                render={({ field }) => {
                  return (
                    <TextInput label={'Telefone do familiar *'}>
                      <Input
                        {...field}
                        {...registerWithMask(field.name, '(99) [9]9999-9999')}
                        placeholder="(__) _____-____"
                      />
                    </TextInput>
                  )
                }}
              />

              <FormField
                control={control}
                name="nomeFamiliar2"
                defaultValue={completeForm.family.nomeFamiliar2}
                render={({ field }) => (
                  <TextInput label={'Nome de outro familiar'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="telFamiliar2"
                defaultValue={completeForm.family.telFamiliar2}
                render={({ field }) => {
                  return (
                    <TextInput label={'Telefone do familiar'}>
                      <Input
                        {...field}
                        {...registerWithMask(field.name, '(99) [9]9999-9999')}
                        placeholder="(__) _____-____"
                      />
                    </TextInput>
                  )
                }}
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
