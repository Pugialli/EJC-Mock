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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const moraComList = [
  { value: 'sozinho', label: 'Sozinho' },
  { value: 'conjuge', label: 'Cônjuge' },
  { value: 'pais', label: 'Pais' },
  { value: 'pai', label: 'Pai' },
  { value: 'mae', label: 'Mãe' },
] as SelectArray[]

const familyFormScheme = z.object({
  moraCom: z.enum(['sozinho', 'conjuge', 'pais', 'pai', 'mae'], {
    required_error: 'Este campo é obrigatório',
  }),
  paisSeparados: z.enum(['sim', 'nao'], {
    required_error: 'Este campo é obrigatório',
  }),
  nomeMae: z.string({ required_error: 'O nome da mãe é obrigatório.' }),
  telMae: z
    .string()
    .min(13, { message: 'O número de telefone está incompleto' }),
  nomePai: z.string({ required_error: 'O nome do pai é obrigatório.' }),
  telPai: z
    .string()
    .min(13, { message: 'O número de telefone está incompleto' }),
})

export type FamilyFormData = z.infer<typeof familyFormScheme>

interface FamilyDetailsProps {
  forward: () => void
  previous: () => void
}

export function FamilyDetails({ forward, previous }: FamilyDetailsProps) {
  const form = useForm<FamilyFormData>({
    resolver: zodResolver(familyFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(data: FamilyFormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    forward()
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
            <MultiStep size={5} currentStep={3} />
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
                render={({ field }) => {
                  return (
                    <RadioInputGroup
                      label="Seus pais são separados?*"
                      onChange={field.onChange}
                    >
                      <RadioInputItem value="sim" label="Sim" />
                      <RadioInputItem value="nao" label="Não" />
                    </RadioInputGroup>
                  )
                }}
              />

              <FormField
                control={control}
                name="nomeMae"
                render={({ field }) => (
                  <TextInput label={'Nome da mãe *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="telMae"
                render={({ field }) => {
                  return (
                    <TextInput label={'Telefone da mãe *'}>
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
                name="nomePai"
                render={({ field }) => (
                  <TextInput label={'Nome do pai *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="telPai"
                render={({ field }) => {
                  return (
                    <TextInput label={'Telefone do pai *'}>
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
            <Button variant="outline" onClick={previous}>
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
