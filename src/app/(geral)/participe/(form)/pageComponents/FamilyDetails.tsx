'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const moraComList = [
  { value: 'sozinho', label: 'Sozinho' },
  { value: 'conjuge', label: 'Cônjuge' },
  { value: 'familiar', label: 'Familiar' },
] as SelectArray[]

const familyFormScheme = z.object({
  moraCom: z.enum(['sozinho', 'conjuge', 'familiar'], {
    required_error: 'Este campo é obrigatório',
  }),
  paisSeparados: z.enum(['sim', 'nao', 'na'], {
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

export function FamilyDetails() {
  const { forwardStep, previousStep, step, completeForm } = useContext(
    CreateEncontristaContext,
  )

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

  async function handleNextFormStep(formDataInput: FamilyFormDataInput) {
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    const familyData = formDataInput as FamilyFormData

    forwardStep({ data: familyData })
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
            <MultiStep size={5} currentStep={step} />
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
                      {moraComList.map((item) => {
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
                name="paisSeparados"
                defaultValue={completeForm.family.paisSeparados}
                render={({ field }) => {
                  return (
                    <RadioInputGroup
                      label="Seus pais são separados? *"
                      onChange={field.onChange}
                    >
                      <RadioInputItem value="sim" label="Sim" />
                      <RadioInputItem value="nao" label="Não" />
                      <RadioInputItem value="na" label="Não se aplica" />
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
