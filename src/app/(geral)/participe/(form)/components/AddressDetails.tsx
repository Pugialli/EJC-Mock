'use client'

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
import { bairrosProps, getBairros } from '@/lib/fetch-bairros'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
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
  bairroDuranteOEncontro: z.enum(['botafogo', 'copacabana']).optional(),
})

export type AddressFormDataInput = z.infer<typeof addressFormScheme>

export const getStaticProps = (async () => {
  const bairros = getBairros()
  return { props: { bairros } }
}) satisfies GetStaticProps<{
  bairros: bairrosProps[]
}>

export function AddressDetails({
  bairros,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { forwardStep, previousStep, step, completeForm } = useContext(
    CreateEncontristaContext,
  )

  const form = useForm<AddressFormDataInput>({
    resolver: zodResolver(addressFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    // setValue,
    formState: { isSubmitting },
  } = form

  const isOnOtherLocation = !(watch('dormiraEmCasa') === 'nao')

  // Falbo: comentei essa parte pq achei que ele podia estar dando ruim enquanto não conseguia realizar o fetch

  // const cepValue = watch('cep')

  // useEffect(() => {
  //   async function fetchAddress(cep: string) {
  //     const response = await getCEPData(cep)
  //     const addressData: CEPResponse = await response.json()
  //     setValue('estado', addressData.state, {
  //       shouldValidate: false,
  //       shouldDirty: true,
  //     })
  //     setValue('cidade', addressData.city, { shouldValidate: false })
  //     setValue('bairro', addressData.neighborhood, { shouldValidate: false })
  //     setValue('rua', addressData.street, { shouldValidate: false })
  //   }
  //   if (cepValue && cepValue[8] !== '_') {
  //     fetchAddress(cepValue)
  //   } else {
  //     setValue('estado', '')
  //     setValue('cidade', '')
  //     setValue('bairro', '')
  //     setValue('rua', '')
  //   }
  // }, [cepValue, setValue])

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(formDataInput: AddressFormDataInput) {
    const data = formDataInput as AddressFormData
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    forwardStep({ data })
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
            <MultiStep size={5} currentStep={step} />
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
                      {bairros.map((item) => {
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
