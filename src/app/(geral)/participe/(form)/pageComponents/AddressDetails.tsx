'use client'

import { BairrosRJ } from '@/app/api/domains/bairrosRJ/route'
import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import { SelectItem } from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { MultiStep } from '@/components/MultiStep'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  AddressFormData,
  CreateEncontristaContext,
} from '@/context/CreateEncontristaContext'
import { api } from '@/lib/axios'
import { CEPResponse, getCEPData } from '@/lib/fetch-cep'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const addressFormScheme = z.object({
  cep: z
    .string({ required_error: 'O cep é obrigatório.' })
    .min(9, { message: 'O cep está incompleto.' }),
  estado: z.string().min(1, { message: 'O estado é obrigatório.' }),
  cidade: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  bairro: z.string().min(1, { message: 'O bairro é obrigatório.' }),
  rua: z.string().min(1, { message: 'A rua é obrigatória.' }),
  numero: z.string().min(1, { message: 'O número é obrigatório.' }),
  complemento: z.string(),
  dormiraEmCasa: z.enum(['sim', 'nao']),
  bairroDuranteOEncontro: z
    .string()
    .min(1, { message: 'Selecione um bairro' })
    .optional(),
})

export type AddressFormDataInput = z.infer<typeof addressFormScheme>

async function getBairros() {
  const response = await api
    .get('domains/bairrosRJ')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  return response
}

export function AddressDetails() {
  const { data: bairros } = useQuery<BairrosRJ[]>({
    queryFn: async () => await getBairros(),
    queryKey: ['bairrosRJ'],
  })

  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, previousStep, handleStep, activeStep } = useWizard()

  const form = useForm<AddressFormDataInput>({
    resolver: zodResolver(addressFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form

  const isOnOtherLocation = !(watch('dormiraEmCasa') === 'nao')

  const cepValue = watch('cep')

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
        setValue('estado', addressData.state, {
          shouldValidate: false,
          shouldDirty: true,
        })
        setValue('cidade', addressData.city, { shouldValidate: false })
        setValue('bairro', addressData.neighborhood, { shouldValidate: false })
        setValue('rua', addressData.street, { shouldValidate: false })
      }
    }
    if (cepValue && cepValue[8] !== '_') {
      fetchAddress(cepValue)
    } else {
      setValue('estado', '')
      setValue('cidade', '')
      setValue('bairro', '')
      setValue('rua', '')
    }
  }, [activeStep, cepValue, setValue])

  const registerWithMask = useHookFormMask(register)

  function handleNextFormStep(formDataInput: AddressFormDataInput) {
    const addressData = formDataInput as AddressFormData
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    handleStep(() => {
      updateData({ data: addressData, step: activeStep })
    })
    nextStep()
  }

  return (
    <Form {...form}>
      <form
        id="addressForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <span className="text-nowrap text-2xl font-bold">Endereço</span>
            <MultiStep size={5} currentStep={activeStep} />
          </div>
          <div className="flex flex-col gap-14 px-0 py-14 text-lg">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">Onde você mora?</span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

              <FormField
                control={control}
                name="cep"
                defaultValue={completeForm.address.cep}
                render={({ field }) => (
                  <TextInput label={'CEP *'}>
                    <Input
                      {...field}
                      {...registerWithMask(field.name, '99999-999')}
                    />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="estado"
                defaultValue={completeForm.address.estado}
                render={({ field }) => (
                  <TextInput label={'Estado *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="cidade"
                defaultValue={completeForm.address.cidade}
                render={({ field }) => (
                  <TextInput label={'Cidade *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="bairro"
                defaultValue={completeForm.address.bairro}
                render={({ field }) => (
                  <TextInput label={'Bairro *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="rua"
                defaultValue={completeForm.address.rua}
                render={({ field }) => (
                  <TextInput label={'Rua *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="numero"
                defaultValue={completeForm.address.numero}
                render={({ field }) => (
                  <TextInput label={'Número *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="complemento"
                defaultValue={completeForm.address.complemento}
                render={({ field }) => (
                  <TextInput label={'Complemento'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">
                  Aonde você ficará?
                </span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

              <FormField
                control={control}
                name="dormiraEmCasa"
                defaultValue={completeForm.address.dormiraEmCasa}
                render={({ field }) => {
                  return (
                    <RadioInputGroup
                      label="Durante o Encontro, você ficará na sua própria casa? *"
                      description='Se você for dormir na casa de algum amigo, marque "Não".'
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
                name="bairroDuranteOEncontro"
                defaultValue={completeForm.address.bairroDuranteOEncontro}
                render={({ field }) => {
                  return (
                    <SelectGroupInput
                      label="Em qual bairro você ficará?"
                      placeholder="Selecione uma opção"
                      onChange={field.onChange}
                      value={field.value}
                      disabled={isOnOtherLocation}
                    >
                      {bairros &&
                        bairros.map((item) => {
                          return (
                            <SelectItem
                              key={item.id}
                              value={item.value}
                              text={item.bairro}
                            />
                          )
                        })}
                    </SelectGroupInput>
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
