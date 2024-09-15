import { CardNewCarro } from '@/app/(geral)/participe/(form)/components/CardNewCarro'
import type { PossiveisTiosExterna } from '@/app/api/encontro/[numeroEncontro]/possiveisExternas/get-possiveis-externas'
import type { TioDeExternaData } from '@/app/api/pessoa/tio-externa/[id]/get-tio-externa'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectItem,
  type SelectArray,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { NewCarContext, type PersonFormData } from '@/context/NewCarroContext'
import { api } from '@/lib/axios'
import { checkPessoa } from '@/utils/check-already-db'
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

const motoristaFormScheme = z.object({
  id: z.string(),
  nome: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  sobrenome: z
    .string({ required_error: 'O sobrenome é obrigatório.' })
    .min(3, { message: 'O sobrenome precisa ter pelo menos 3 letras' }),
  apelido: z.string().optional(),
  celular: z
    .string()
    .min(14, { message: 'O número de celular está incompleto' }),
  telefone: z.string().optional(),
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email({ message: 'O email não é válido' }),
  cep: z
    .string({ required_error: 'O cep é obrigatório.' })
    .min(9, { message: 'O cep está incompleto.' }),
  cidade: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  endNumero: z
    .string()
    .regex(/^\d+$/, { message: 'O número deve conter apenas dígitos.' })
    .min(1, { message: 'O número é obrigatório.' }),
  bairro: z.string().min(1, { message: 'O bairro é obrigatório.' }),
  rua: z.string().min(1, { message: 'A rua é obrigatória.' }),
  estado: z.string().min(1, { message: 'O estado é obrigatório.' }),
  observacaoMotorista: z.string().optional(),
})

export type MotoristaFormDataInput = z.infer<typeof motoristaFormScheme>

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

export function MotoristaDetails() {
  const { completeForm, updateData } = useContext(NewCarContext)

  const form = useForm<MotoristaFormDataInput>({
    resolver: zodResolver(motoristaFormScheme),
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

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(formDataInput: MotoristaFormDataInput) {
    const isAlreadyOnDB = await checkPessoa(formDataInput.email)

    if (formDataInput.id === '0' && isAlreadyOnDB) {
      toast.warning('Este email já está cadastrado', {
        description:
          'Adicione este tio de externa usando a lista de tios possíveis acima.',
        duration: 20000,
      })
    } else {
      const motoristaData: PersonFormData = {
        id: formDataInput.id,
        nome: formDataInput.nome,
        sobrenome: formDataInput.sobrenome,
        apelido: formDataInput.apelido,
        email: formDataInput.email,
        celular: formDataInput.celular,
        telefone: formDataInput.telefone,
        enderecoCep: formDataInput.cep,
        estado: formDataInput.estado,
        cidade: formDataInput.cidade,
        bairro: formDataInput.bairro,
        rua: formDataInput.rua,
        enderecoNumero: parseInt(formDataInput.endNumero, 10),
        observacaoMotorista: formDataInput.observacaoMotorista
          ? formDataInput.observacaoMotorista
          : '',
      }

      handleStep(() => {
        updateData({ data: motoristaData, step: activeStep })
      })
      nextStep()
    }
  }

  const { data: possiveisExternas } = useQuery<SelectArray[]>({
    queryFn: async () => await getPossiveisTios(),
    queryKey: ['possiveisExternas'],
  })

  const idValue = watch('id')
  const cepValue = watch('cep')

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
        setValue('estado', addressData.state, {
          shouldValidate: true,
          shouldDirty: true,
        })
        setValue('cidade', addressData.city, { shouldValidate: true })
        setValue('bairro', addressData.neighborhood, { shouldValidate: true })
        setValue('rua', addressData.street, { shouldValidate: true })
      }
    }
    if (cepValue && cepValue[8] !== '_') {
      fetchAddress(cepValue)
    } else {
      setValue('estado', completeForm.motorista.estado)
      setValue('cidade', completeForm.motorista.cidade)
      setValue('bairro', completeForm.motorista.bairro)
      setValue('rua', completeForm.motorista.rua)
    }
  }, [activeStep, cepValue, setValue, completeForm])

  useEffect(() => {
    async function fetchPessoa(id: string) {
      const pessoa: TioDeExternaData = await getTioExternaData(id)
      if (pessoa === undefined) {
        toast.error('Erro ao carregar o tio de externa')
      } else {
        setValue('nome', pessoa.nome, {
          shouldValidate: false,
        })
        setValue('sobrenome', pessoa.sobrenome, { shouldValidate: false })
        setValue('apelido', pessoa.apelido, { shouldValidate: false })
        setValue('email', pessoa.email, { shouldValidate: false })
        setValue('celular', pessoa.celular, { shouldValidate: false })
        setValue('telefone', pessoa.telefone, { shouldValidate: false })
        setValue('cep', pessoa.endereco.cep, { shouldValidate: false })
        if (pessoa.enderecoNumero) {
          setValue('endNumero', pessoa.enderecoNumero.toString(), {
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
        id="motoristaForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardNewCarro title="Criar Motorista" isSubmitting={isSubmitting}>
          <div className="flex flex-col gap-6">
            <FormField
              control={control}
              name="id"
              defaultValue={completeForm.motorista.id}
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
            <Separator />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <TwoRowInput>
              <FormField
                control={control}
                name="nome"
                defaultValue={completeForm.motorista.nome}
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
                name="sobrenome"
                defaultValue={completeForm.motorista.sobrenome}
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
                name="apelido"
                defaultValue={completeForm.motorista.apelido}
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
                name="email"
                defaultValue={completeForm.motorista.email}
                render={({ field }) => {
                  return (
                    <TextInput label={'Email *'}>
                      <Input {...field} placeholder="encontreiro@gmail.com" />
                    </TextInput>
                  )
                }}
              />
            </TwoRowInput>
            <TwoRowInput>
              <FormField
                control={control}
                name="celular"
                defaultValue={completeForm.motorista.celular}
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
            </TwoRowInput>
            <TwoRowInput>
              <FormField
                control={control}
                name="telefone"
                defaultValue={
                  completeForm.motorista.telefone
                    ? completeForm.motorista.telefone
                    : ''
                }
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
            </TwoRowInput>
            <TwoRowInput>
              <FormField
                control={control}
                name="cep"
                defaultValue={completeForm.motorista.enderecoCep}
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
                name="cidade"
                defaultValue={completeForm.motorista.cidade}
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
                name="bairro"
                defaultValue={completeForm.motorista.bairro}
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
                name="rua"
                defaultValue={completeForm.motorista.rua}
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
                name="endNumero"
                defaultValue={completeForm.motorista.enderecoNumero.toString()}
                render={({ field }) => (
                  <TextInput label={'Número do endereço*'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
            </TwoRowInput>
            <TwoRowInput>
              <FormField
                control={control}
                name="observacaoMotorista"
                defaultValue={completeForm.motorista.observacaoMotorista}
                render={({ field }) => {
                  return (
                    <TextInput label={'Comentários do motorista'}>
                      <Textarea {...field} />
                    </TextInput>
                  )
                }}
              />
            </TwoRowInput>
          </div>
        </CardNewCarro>
      </form>
    </Form>
  )
}
