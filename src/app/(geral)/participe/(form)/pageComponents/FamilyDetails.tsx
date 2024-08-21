'use client'

import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectArray,
  SelectItem,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  CreateEncontristaContext,
  FamilyFormData,
} from '@/context/CreateEncontristaContext'
import { getMoraCom, getStatusPais } from '@/utils/fetch-domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'
import { CardParticipe } from '../components/CardParticipe'
import { CardSection } from '../components/CardSection'

const familyFormScheme = z.object({
  moraCom: z.enum(['sozinho', 'conjuge', 'familiar', 'amigos'], {
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
  parentescoFamiliar: z
    .string()
    .min(2, { message: 'O grau de parentesco é obrigatório' }),
  nomeFamiliar2: z.string().optional(),
  telFamiliar2: z.string().optional(),
  parentescoFamiliar2: z.string().optional(),
})

export type FamilyFormDataInput = z.infer<typeof familyFormScheme>

export function FamilyDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, handleStep, activeStep } = useWizard()

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
        <CardParticipe title="Família" isSubmitting={isSubmitting}>
          <CardSection title="Informações familiares">
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
                    defaultValue={field.value}
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
          </CardSection>
          <CardSection title="Contato de Emergência">
            <FormField
              control={control}
              name="nomeFamiliar"
              defaultValue={completeForm.family.nomeFamiliar}
              render={({ field }) => (
                <TextInput label={'Nome de um familiar ou amigo *'}>
                  <Input autoFocus {...field} />
                </TextInput>
              )}
            />

            <FormField
              control={control}
              name="telFamiliar"
              defaultValue={completeForm.family.telFamiliar}
              render={({ field }) => {
                return (
                  <TextInput label={'Telefone do familiar ou amigo *'}>
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
              name="parentescoFamiliar"
              defaultValue={completeForm.family.parentescoFamiliar}
              render={({ field }) => (
                <TextInput label={'Grau de parentesco *'}>
                  <Input {...field} />
                </TextInput>
              )}
            />

            <FormField
              control={control}
              name="nomeFamiliar2"
              defaultValue={completeForm.family.nomeFamiliar2}
              render={({ field }) => (
                <TextInput label={'Nome de outro familiar ou amigo'}>
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
                  <TextInput label={'Telefone do familiar ou amigo'}>
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
              name="parentescoFamiliar2"
              defaultValue={completeForm.family.parentescoFamiliar2}
              render={({ field }) => (
                <TextInput label={'Grau de parentesco'}>
                  <Input {...field} />
                </TextInput>
              )}
            />
          </CardSection>
        </CardParticipe>
      </form>
    </Form>
  )
}
