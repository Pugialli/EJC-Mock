import { CardNewCarro } from '@/app/(geral)/participe/(form)/components/CardNewCarro'
import type { PossiveisTiosExterna } from '@/app/api/encontro/[numeroEncontro]/possiveisExternas/get-possiveis-externas'
import type { TioDeExternaData } from '@/app/api/pessoa/tio-externa/[id]/get-tio-externa'
import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectItem,
  type SelectArray,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { NewCarContext, type PersonFormData } from '@/context/NewCarroContext'
import { api } from '@/lib/axios'
import { getCEPData, type CEPResponse } from '@/utils/fetch-cep'
import { getTioExternaData } from '@/utils/fetch-tio-externa'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'
import { TwoRowInput } from '../components/TwoRowInput'

const caronaFormScheme = z.object({
  possiuCarona: z.enum(['sim', 'nao']),
  carona: z
    .object({
      id: z.string().optional(),
      nome: z
        .string({ required_error: 'O nome é obrigatório.' })
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' })
        .optional(),
      sobrenome: z
        .string({ required_error: 'O sobrenome é obrigatório.' })
        .min(3, { message: 'O sobrenome precisa ter pelo menos 3 letras' })
        .optional(),
      apelido: z.string().optional(),
      celular: z.string().optional(),
      telefone: z.string().optional(),
      email: z
        .string({ required_error: 'O email é obrigatório.' })
        .email({ message: 'O email não é válido' })
        .optional(),
      cep: z.string({ required_error: 'O cep é obrigatório.' }).optional(),
      cidade: z.string().optional(),
      endNumero: z
        .string()
        .regex(/^\d+$/, { message: 'O número deve conter apenas dígitos.' })
        .optional(),
      bairro: z.string().optional(),
      rua: z.string().optional(),
      estado: z.string().optional(),
    })
    .optional(),
})

export type CaronaFormDataInput = z.infer<typeof caronaFormScheme>

export async function getPossiveisTios() {
  const response: PossiveisTiosExterna[] = await api
    .get('encontro/1/possiveisExternas')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = {
      label: item.nome,
      badge: item.encontro ? item.encontro : item.role,
      value: item.id,
    }

    selectData.push(selectItem)
  })

  return selectData
}

export function CaronaDetails() {
  const { updateData } = useContext(NewCarContext)

  const form = useForm<CaronaFormDataInput>({
    resolver: zodResolver(caronaFormScheme),
  })

  const { nextStep, handleStep, activeStep } = useWizard()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = form

  const hasCarona = watch('possiuCarona') === 'sim'

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(formDataInput: CaronaFormDataInput) {
    if (formDataInput.possiuCarona === 'sim') {
      if (formDataInput.carona) {
        const caronaData: PersonFormData = {
          id: formDataInput.carona.id ? formDataInput.carona.id : '',
          nome: formDataInput.carona.nome ? formDataInput.carona.nome : '',
          sobrenome: formDataInput.carona.sobrenome
            ? formDataInput.carona.sobrenome
            : '',
          apelido: formDataInput.carona.apelido
            ? formDataInput.carona.apelido
            : '',
          email: formDataInput.carona.email ? formDataInput.carona.email : '',
          celular: formDataInput.carona.celular
            ? formDataInput.carona.celular
            : '',
          telefone: formDataInput.carona.telefone
            ? formDataInput.carona.telefone
            : '',
          enderecoCep: formDataInput.carona.cep ? formDataInput.carona.cep : '',
          estado: formDataInput.carona.estado
            ? formDataInput.carona.estado
            : '',
          cidade: formDataInput.carona.cidade
            ? formDataInput.carona.cidade
            : '',
          bairro: formDataInput.carona.bairro
            ? formDataInput.carona.bairro
            : '',
          rua: formDataInput.carona.rua ? formDataInput.carona.rua : '',
          enderecoNumero: formDataInput.carona.endNumero
            ? parseInt(formDataInput.carona.endNumero, 10)
            : 0,
          observacaoMotorista: '',
        }
        handleStep(() => {
          updateData({ data: caronaData, step: activeStep })
        })
      }
    }
    nextStep()
  }

  const { data: possiveisExternas } = useQuery<SelectArray[]>({
    queryFn: async () => await getPossiveisTios(),
    queryKey: ['possiveisExternas'],
  })

  const idValue = watch('carona.id')
  const cepValue = watch('carona.cep')

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
        setValue('carona.estado', addressData.state, {
          shouldValidate: false,
          shouldDirty: true,
        })
        setValue('carona.cidade', addressData.city, { shouldValidate: false })
        setValue('carona.bairro', addressData.neighborhood, {
          shouldValidate: false,
        })
        setValue('carona.rua', addressData.street, { shouldValidate: false })
      }
    }
    if (cepValue && cepValue[8] !== '_') {
      fetchAddress(cepValue)
    } else {
      setValue('carona.estado', '')
      setValue('carona.cidade', '')
      setValue('carona.bairro', '')
      setValue('carona.rua', '')
    }
  }, [activeStep, cepValue, setValue])

  useEffect(() => {
    async function fetchPessoa(id: string) {
      const pessoa: TioDeExternaData = await getTioExternaData(id)
      if (pessoa === undefined) {
        toast.error('Erro ao carregar o tio de externa')
      } else {
        setValue('carona.nome', pessoa.nome, {
          shouldValidate: false,
        })
        setValue('carona.sobrenome', pessoa.sobrenome, {
          shouldValidate: false,
        })
        setValue('carona.apelido', pessoa.apelido, { shouldValidate: false })
        setValue('carona.email', pessoa.email, { shouldValidate: false })
        setValue('carona.celular', pessoa.celular, { shouldValidate: false })
        setValue('carona.telefone', pessoa.telefone, { shouldValidate: false })
        setValue('carona.cep', pessoa.enderecoCep, { shouldValidate: false })
        if (pessoa.enderecoNumero) {
          setValue('carona.endNumero', pessoa.enderecoNumero.toString(), {
            shouldValidate: false,
          })
        }
      }
    }
    if (idValue !== '0' && idValue !== undefined) {
      fetchPessoa(idValue)
    }
  }, [activeStep, idValue, setValue])

  return (
    <Form {...form}>
      <form
        id="caronaForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardNewCarro title="Criar Carona" isSubmitting={isSubmitting}>
          <div className="flex flex-col gap-6">
            <FormField
              control={control}
              name="possiuCarona"
              defaultValue="nao"
              render={({ field }) => {
                return (
                  <RadioInputGroup
                    label="Este tio de externa terá um tio de apoio? *"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <RadioInputItem value="sim" label="Sim" />
                    <RadioInputItem value="nao" label="Não" />
                  </RadioInputGroup>
                )
              }}
            />

            {hasCarona && (
              <div>
                <div>
                  <FormField
                    control={control}
                    name="carona.id"
                    defaultValue={'0'}
                    render={({ field }) => {
                      return (
                        <SelectGroupInput
                          label="Importe um tio de externa:"
                          onChange={field.onChange}
                          value={field.value}
                        >
                          <SelectItem
                            key={'novo_tio'}
                            value={'0'}
                            text={'Novo Tio de externa'}
                          />
                          {possiveisExternas &&
                            possiveisExternas.map((item) => {
                              return (
                                <SelectItem
                                  key={item.value}
                                  value={item.value}
                                  text={item.label}
                                  badge={item.badge}
                                />
                              )
                            })}
                        </SelectGroupInput>
                      )
                    }}
                  />
                  <span className="text-sm">ou crie um novo abaixo</span>
                  <Separator className="mb-6 mt-6" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.nome"
                      render={({ field }) => (
                        <TextInput label={'Nome *'}>
                          <Input autoFocus {...field} />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.sobrenome"
                      render={({ field }) => (
                        <TextInput label={'Sobrenome *'}>
                          <Input {...field} />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.apelido"
                      render={({ field }) => (
                        <TextInput label={'Como gostaria de ser chamado?'}>
                          <Input {...field} />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.email"
                      render={({ field }) => {
                        return (
                          <TextInput label={'Email *'}>
                            <Input
                              {...field}
                              placeholder="encontreiro@gmail.com"
                            />
                          </TextInput>
                        )
                      }}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.celular"
                      render={({ field }) => {
                        return (
                          <TextInput label={'Celular *'}>
                            <Input
                              {...field}
                              {...registerWithMask(
                                field.name,
                                '(99) [9]9999-9999',
                              )}
                              placeholder="(__) _____-____"
                            />
                          </TextInput>
                        )
                      }}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.telefone"
                      render={({ field }) => {
                        return (
                          <TextInput label={'Telefone'}>
                            <Input
                              {...field}
                              {...registerWithMask(
                                field.name,
                                '(99) 9999-9999',
                              )}
                              placeholder="(__) ____-____"
                            />
                          </TextInput>
                        )
                      }}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.cep"
                      render={({ field }) => (
                        <TextInput label={'CEP *'}>
                          <Input
                            {...field}
                            {...registerWithMask(field.name, '99999-999')}
                          />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.cidade"
                      render={({ field }) => (
                        <TextInput label={'Cidade *'}>
                          <Input readOnly={true} {...field} />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.bairro"
                      render={({ field }) => (
                        <TextInput label={'Bairro *'}>
                          <Input readOnly={true} {...field} />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.rua"
                      render={({ field }) => (
                        <TextInput label={'Rua *'}>
                          <Input readOnly={true} {...field} />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                  <TwoRowInput>
                    <FormField
                      control={control}
                      name="carona.endNumero"
                      render={({ field }) => (
                        <TextInput label={'Número do endereço*'}>
                          <Input {...field} />
                        </TextInput>
                      )}
                    />
                  </TwoRowInput>
                </div>
              </div>
            )}
          </div>
        </CardNewCarro>
      </form>
    </Form>
  )
}
