'use client'

import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { TextInput } from '@/components/Form/TextInput'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  AddressFormData,
  CreateEncontristaContext,
} from '@/context/CreateEncontristaContext'
import { CEPResponse, getCEPData } from '@/lib/fetch-cep'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'
import { CardParticipe } from '../components/CardParticipe'
import { CardSection } from '../components/CardSection'

const addressFormScheme = z.object({
  cep: z
    .string({ required_error: 'O cep é obrigatório.' })
    .min(9, { message: 'O cep está incompleto.' }),
  estado: z.string().min(1, { message: 'O estado é obrigatório.' }),
  cidade: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  bairro: z.string().min(1, { message: 'O bairro é obrigatório.' }),
  rua: z.string().min(1, { message: 'A rua é obrigatória.' }),
  numero: z
    .string()
    .regex(/^\d+$/, { message: 'O número deve conter apenas dígitos.' })
    .min(1, { message: 'O número é obrigatório.' })
    .transform((val) => parseInt(val, 10)),

  complemento: z.string(),
  dormiraEmCasa: z.enum(['sim', 'nao']),

  cepEncontro: z
    .string({ required_error: 'O cep é obrigatório.' })
    .min(9, { message: 'O cep está incompleto.' }),
  estadoEncontro: z.string().min(1, { message: 'O estado é obrigatório.' }),
  cidadeEncontro: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  bairroEncontro: z.string().min(1, { message: 'O bairro é obrigatório.' }),
  ruaEncontro: z.string().min(1, { message: 'A rua é obrigatória.' }),
  numeroEncontro: z
    .string()
    .regex(/^\d+$/, { message: 'O número deve conter apenas dígitos.' })
    .min(1, { message: 'O número é obrigatório.' })
    .transform((val) => parseInt(val, 10)),
  complementoEncontro: z.string(),
})

export type AddressFormDataInput = z.infer<typeof addressFormScheme>

export function AddressDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, handleStep, activeStep } = useWizard()

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
  const cepEncontroValue = watch('cepEncontro')
  const estadoValue = watch('estado')
  const cidadeValue = watch('cidade')
  const bairroValue = watch('bairro')
  const ruaValue = watch('rua')
  const numeroValue = watch('numero')
  const complementoValue = watch('complemento')

  useEffect(() => {
    if (!isOnOtherLocation) {
      setValue('cepEncontro', '')
      setValue('estadoEncontro', '')
      setValue('cidadeEncontro', '')
      setValue('bairroEncontro', '')
      setValue('ruaEncontro', '')
      setValue('numeroEncontro', 0)
      setValue('complementoEncontro', '')
    } else {
      setValue('cepEncontro', cepValue)
      setValue('estadoEncontro', estadoValue)
      setValue('cidadeEncontro', cidadeValue)
      setValue('bairroEncontro', bairroValue)
      setValue('ruaEncontro', ruaValue)
      setValue('numeroEncontro', numeroValue)
      setValue('complementoEncontro', complementoValue)
    }
  }, [
    isOnOtherLocation,
    cepValue,
    estadoValue,
    cidadeValue,
    bairroValue,
    ruaValue,
    numeroValue,
    complementoValue,
    setValue,
  ])

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

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
        setValue('estadoEncontro', addressData.state, {
          shouldValidate: false,
          shouldDirty: true,
        })
        setValue('cidadeEncontro', addressData.city, { shouldValidate: false })
        setValue('bairroEncontro', addressData.neighborhood, {
          shouldValidate: false,
        })
        setValue('ruaEncontro', addressData.street, { shouldValidate: false })
      }
    }
    if (cepEncontroValue && cepEncontroValue[8] !== '_') {
      fetchAddress(cepEncontroValue)
    } else {
      setValue('estadoEncontro', '')
      setValue('cidadeEncontro', '')
      setValue('bairroEncontro', '')
      setValue('ruaEncontro', '')
    }
  }, [activeStep, cepEncontroValue, setValue])
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
        <CardParticipe title="Endereço" isSubmitting={isSubmitting}>
          <CardSection title="Onde você mora?">
            <FormField
              control={control}
              name="cep"
              defaultValue={completeForm.address.cep}
              render={({ field }) => (
                <TextInput label={'CEP *'}>
                  <Input
                    autoFocus
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
          </CardSection>
          <CardSection title="Aonde você ficará?">
            <FormField
              control={control}
              name="dormiraEmCasa"
              defaultValue={completeForm.address.dormiraEmCasa}
              render={({ field }) => {
                return (
                  <RadioInputGroup
                    label="Durante o Encontro, você ficará na sua própria casa? *"
                    description='Para facilitar a organização do retiro e a comunicação, precisamos saber em qual endereço estará durante o final de semana do nosso retiro. Se não for ficar no endereço preenchido anteriormente, marque "não" e diga abaixo onde vai ficar. Obs.: Endereços mais próximos ao Jardim Botânico são bem-vindos, mas não obrigatórios.'
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
          {!isOnOtherLocation && (
            <CardSection title="Pode nos dar mais detalhes?">
              <FormField
                control={control}
                name="cepEncontro"
                defaultValue={completeForm.address.cepEncontro}
                render={({ field }) => (
                  <TextInput label={'CEP *'}>
                    <Input
                      autoFocus
                      {...field}
                      {...registerWithMask(field.name, '99999-999')}
                    />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="estadoEncontro"
                defaultValue={completeForm.address.estadoEncontro}
                render={({ field }) => (
                  <TextInput label={'Estado *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="cidadeEncontro"
                defaultValue={completeForm.address.cidadeEncontro}
                render={({ field }) => (
                  <TextInput label={'Cidade *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="bairroEncontro"
                defaultValue={completeForm.address.bairroEncontro}
                render={({ field }) => (
                  <TextInput label={'Bairro *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="ruaEncontro"
                defaultValue={completeForm.address.ruaEncontro}
                render={({ field }) => (
                  <TextInput label={'Rua *'}>
                    <Input readOnly={true} {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="numeroEncontro"
                defaultValue={completeForm.address.numeroEncontro}
                render={({ field }) => (
                  <TextInput label={'Número *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="complementoEncontro"
                defaultValue={completeForm.address.complementoEncontro}
                render={({ field }) => (
                  <TextInput label={'Complemento'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
            </CardSection>
          )}
        </CardParticipe>
      </form>
    </Form>
  )
}
