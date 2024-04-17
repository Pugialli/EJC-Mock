'use client'

import { ReligiaoData } from '@/app/api/domains/religiao/route'
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
  PersonalFormData,
} from '@/context/CreateEncontristaContext'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

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

async function getReligioes() {
  const response: ReligiaoData[] = await api
    .get('domains/religiao')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.religiao, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}

export function PersonalDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, previousStep, handleStep, activeStep } = useWizard()

  const { data: religioes } = useQuery<SelectArray[]>({
    queryFn: async () => await getReligioes(),
    queryKey: ['religioes'],
  })

  // const defaultDate = '12/31/1969'

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

  function handleNextFormStep(formDataInput: PersonalFormDataInput) {
    // const dataNascimentoCorrigido = stringToDate(formDataInput.dataNascimento)
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    const personalData = formDataInput as PersonalFormData

    handleStep(() => {
      updateData({ data: personalData, step: activeStep })
    })
    nextStep()
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
            <MultiStep size={5} currentStep={activeStep} />
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
                defaultValue={completeForm.personal.nome}
                render={({ field }) => (
                  <TextInput label={'Nome *'}>
                    <Input {...field} />
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
                // defaultValue={
                //   format(
                //     completeForm.personal.dataNascimento.toString(),
                //     'P',
                //   ) === defaultDate
                //     ? ''
                //     : format(
                //         completeForm.personal.dataNascimento.toString(),
                //         'dd/MM/yyyy',
                //       )
                // }
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
                      {
                        // if (!isLoading) {
                        //   console.log(religioes)
                        //     }
                        religioes &&
                          religioes.map((item) => {
                            return (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                text={item.label}
                              />
                            )
                          })
                      }
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
