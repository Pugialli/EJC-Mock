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

const religionList = [
  { value: 'catolica', label: 'Católica' },
  { value: 'evangelica', label: 'Evangélica' },
  { value: 'espirita', label: 'Espírita' },
  { value: 'matriz_africana', label: 'Religião de matriz afro-brasileira' },
  { value: 'judaica', label: 'Judaica' },
  { value: 'nao_tenho', label: 'Não tenho religião' },
  { value: 'outra', label: 'Outra' },
] as SelectArray[]

const personalFormScheme = z.object({
  nome: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  sobrenome: z
    .string({ required_error: 'O sobrenome é obrigatório.' })
    .min(3, { message: 'O sobrenome precisa ter pelo menos 3 letras' }),
  dataNascimento: z.string().min(10, { message: 'A data está incompleta' }),
  apelido: z.string().optional(),
  religiao: z
    .enum([
      'catolica',
      'evangelica',
      'espirita',
      'matriz_africana',
      'judaica',
      'nao_tenho',
      'outra',
    ])
    .optional(),
  paraVoce: z.enum(['sim', 'nao']),
  celular: z
    .string()
    .min(14, { message: 'O número de celular está incompleto' }),
  telefone: z.string().optional(),
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email({ message: 'O email não é válido' }),
  instagram: z.string().optional(),
})

export type PersonalFormData = z.infer<typeof personalFormScheme>

interface PersonalDetailsProps {
  forward: () => void
  previous: () => void
}

export function PersonalDetails({ forward, previous }: PersonalDetailsProps) {
  const form = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(data: PersonalFormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    forward()
  }

  return (
    <Form {...form}>
      <form
        id="personalForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <span className="text-nowrap text-2xl font-bold">
              Dados Pessoais
            </span>
            <MultiStep size={5} currentStep={1} />
          </div>
          <div className="flex flex-col gap-14 px-0 py-14 text-lg">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">Sobre Você</span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

              <FormField
                control={control}
                name="nome"
                render={({ field }) => (
                  <TextInput label={'Nome *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="sobrenome"
                render={({ field }) => (
                  <TextInput label={'Sobrenome *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="dataNascimento"
                render={({ field }) => {
                  return (
                    <TextInput label={'Nascimento *'}>
                      <Input
                        {...field}
                        {...registerWithMask(field.name, '99/99/9999')}
                        placeholder="DD/MM/AAAA"
                      />
                    </TextInput>
                  )
                }}
              />

              <FormField
                control={control}
                name="apelido"
                render={({ field }) => {
                  return (
                    <TextInput label={'Como gostaria de ser chamado?'}>
                      <Input {...field} />
                    </TextInput>
                  )
                }}
              />

              <FormField
                control={control}
                name="religiao"
                defaultValue="catolica"
                render={({ field }) => {
                  return (
                    <SelectGroupInput
                      label="Religião"
                      onChange={field.onChange}
                      value={field.value}
                    >
                      {religionList.map((item) => {
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
                name="paraVoce"
                defaultValue="sim"
                render={({ field }) => {
                  return (
                    <RadioInputGroup
                      label="Você está preenchendo esse cadastro para si mesmo? *"
                      description='Se você estiver preenchendo o cadastro para um amigo ou conhecido, favor clicar em "Não."'
                      onChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <RadioInputItem value="sim" label="Sim" />
                      <RadioInputItem value="nao" label="Não" />
                    </RadioInputGroup>
                  )
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">Contato</span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

              <FormField
                control={control}
                name="celular"
                render={({ field }) => {
                  return (
                    <TextInput label={'Celular *'}>
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
                name="telefone"
                render={({ field }) => {
                  return (
                    <TextInput label={'Telefone'}>
                      <Input
                        {...field}
                        {...registerWithMask(field.name, '(99) 9999-9999')}
                        placeholder="(__) ____-____"
                      />
                    </TextInput>
                  )
                }}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <TextInput label={'Email *'}>
                      <Input {...field} placeholder="encontrista@gmail.com" />
                    </TextInput>
                  )
                }}
              />

              <FormField
                control={control}
                name="instagram"
                render={({ field }) => {
                  return (
                    <TextInput label={'Instagram'}>
                      <Input {...field} prefix="instagram.com/" />
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
