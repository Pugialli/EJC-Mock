'use client'

import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
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

const addressFormScheme = z.object({
  cep: z
    .number({ required_error: 'O cep é obrigatório.' })
    .min(9, { message: 'O cep está incompleto.' }),
  estado: z.string({ required_error: 'O estado é obrigatório.' }),
  cidade: z.string({ required_error: 'A cidade é obrigatória.' }),
  bairro: z.string({ required_error: 'O bairro é obrigatório.' }),
  rua: z.string({ required_error: 'A rua é obrigatória.' }),
  numero: z.number().min(1, { message: 'O numero é obrigatório.' }),
  complemento: z.string(),

  dormiraEmCasa: z.enum(['sim', 'nao']),
  bairroDuranteOEncontro: z.enum(['sim', 'nao']),
})

export type AddressFormData = z.infer<typeof addressFormScheme>

interface AddressDetailsProps {
  forward: () => void
  previous: () => void
}

export function AddressDetails({ forward, previous }: AddressDetailsProps) {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(data: AddressFormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    forward()
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
            <MultiStep size={5} currentStep={2} />
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
                render={({ field }) => (
                  <TextInput label={'Estado *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="cidade"
                render={({ field }) => (
                  <TextInput label={'Cidade *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="bairro"
                render={({ field }) => (
                  <TextInput label={'Bairro *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="rua"
                render={({ field }) => (
                  <TextInput label={'Rua *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="numero"
                render={({ field }) => (
                  <TextInput label={'Número *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="complemento"
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
                defaultValue="sim"
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
                render={({ field }) => (
                  <TextInput label={'Em qual bairro você ficará?'}>
                    <Input {...field} />
                  </TextInput>
                )}
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
