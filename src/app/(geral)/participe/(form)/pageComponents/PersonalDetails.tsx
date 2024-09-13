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
  PersonalFormData,
} from '@/context/CreateEncontristaContext'
import { checkPessoa } from '@/utils/check-already-db'
import { getReligioes } from '@/utils/fetch-domains'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'
import { CardParticipe } from '../components/CardParticipe'
import { CardSection } from '../components/CardSection'

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

export type PersonalFormDataInput = z.infer<typeof personalFormScheme>

export function PersonalDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, handleStep, activeStep } = useWizard()

  const { data: religioes } = useQuery<SelectArray[]>({
    queryFn: async () => await getReligioes(),
    queryKey: ['religioes'],
  })

  const form = useForm<PersonalFormDataInput>({
    resolver: zodResolver(personalFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(formDataInput: PersonalFormDataInput) {
    const personalData = formDataInput as PersonalFormData

    const isAlreadyOnDB = await checkPessoa(personalData.email)

    if (isAlreadyOnDB) {
      toast.warning('Este email já está cadastrado', {
        description:
          'Caso queira alterar alguma informação procure quem te indicou ou um de nossos dirigentes.',
        duration: 20000,
      })
    } else {
      handleStep(() => {
        updateData({ data: personalData, step: activeStep })
      })
      nextStep()
    }
  }

  return (
    <Form {...form}>
      <form
        id="personalForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardParticipe title="Dados Pessoais" isSubmitting={isSubmitting}>
          <CardSection title="Sobre Você">
            <FormField
              control={control}
              name="nome"
              defaultValue={completeForm.personal.nome}
              render={({ field }) => (
                <TextInput label={'Nome *'}>
                  <Input autoFocus {...field} />
                </TextInput>
              )}
            />

            <FormField
              control={control}
              name="sobrenome"
              defaultValue={completeForm.personal.sobrenome}
              render={({ field }) => (
                <TextInput label={'Sobrenome *'}>
                  <Input {...field} />
                </TextInput>
              )}
            />
            <FormField
              control={control}
              name="dataNascimento"
              defaultValue={completeForm.personal.dataNascimento}
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
              defaultValue={completeForm.personal.apelido}
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
              defaultValue={completeForm.personal.religiao}
              render={({ field }) => {
                return (
                  <SelectGroupInput
                    label="Religião"
                    onChange={field.onChange}
                    value={field.value}
                  >
                    {religioes &&
                      religioes.map((item) => {
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
              defaultValue={completeForm.personal.paraVoce}
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
          </CardSection>
          <CardSection title="Contato">
            <FormField
              control={control}
              name="celular"
              defaultValue={completeForm.personal.celular}
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
              defaultValue={completeForm.personal.telefone}
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
              defaultValue={completeForm.personal.email}
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
              defaultValue={completeForm.personal.instagram}
              render={({ field }) => {
                return (
                  <TextInput label={'Instagram'}>
                    <Input {...field} prefix="instagram.com/" />
                  </TextInput>
                )
              }}
            />
          </CardSection>
        </CardParticipe>
      </form>
    </Form>
  )
}
