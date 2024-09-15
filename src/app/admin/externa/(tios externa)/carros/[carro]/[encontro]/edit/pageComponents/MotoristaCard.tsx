import type { PossiveisTiosExterna } from '@/app/api/encontro/[numeroEncontro]/possiveisExternas/get-possiveis-externas'
import type { TioDeExternaData } from '@/app/api/pessoa/tio-externa/[id]/get-tio-externa'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectItem,
  type SelectArray,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { getCEPData, type CEPResponse } from '@/utils/fetch-cep'
import { getTioExternaData } from '@/utils/fetch-tio-externa'
import type { Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { TwoRowInput } from '../../../../novo/(form)/components/TwoRowInput'
import { CardForm } from '../components/CardForm'

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

export function MotoristaCard() {
  const form = useFormContext()

  const { data: possiveisExternas } = useQuery<SelectArray[]>({
    queryFn: async () => await getPossiveisTios(),
    queryKey: ['possiveisExternas'],
  })

  const {
    register,
    watch,
    control,
    setValue,
    trigger,
  } = form

  const cepValue = watch('motorista.cep')
  const idValue = watch('motorista.id')
  const roleValue: Role = watch('motorista.role')

  const canEdit = roleValue !== 'TIOEXTERNA'

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
        setValue('motorista.cidade', addressData.city, {
          shouldValidate: false,
        })
        setValue('motorista.bairro', addressData.neighborhood, {
          shouldValidate: false,
        })
        setValue('motorista.rua', addressData.street, { shouldValidate: false })
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
  }, [cepValue, setValue])

  useEffect(() => {
    async function fetchPessoa(id: string) {
      const pessoa: TioDeExternaData = await getTioExternaData(id)
      if (pessoa === undefined) {
        toast.error('Erro ao carregar o tio de externa')
      } else {
        setValue('motorista.id', pessoa.id, {
          shouldValidate: true,
          shouldDirty: true,
        })
        setValue('motorista.role', pessoa.role, {
          shouldValidate: true,
          shouldDirty: true,
        })
        setValue('motorista.nome', pessoa.nome, {
          shouldValidate: true,
          shouldDirty: true,
        })
        setValue('motorista.sobrenome', pessoa.sobrenome, {
          shouldValidate: true,
          shouldDirty: true,
        })
        setValue('motorista.apelido', pessoa.apelido, { shouldValidate: true })
        setValue('motorista.email', pessoa.email, { shouldValidate: true })
        setValue('motorista.celular', pessoa.celular, { shouldValidate: true })
        setValue('motorista.telefone', pessoa.telefone, {
          shouldValidate: true,
        })
        setValue('motorista.cep', pessoa.endereco.cep, { shouldValidate: true })
        setValue('motorista.bairro', pessoa.endereco.bairro, { shouldValidate: true })
        setValue('motorista.rua', pessoa.endereco.rua, { shouldValidate: true })
        if (pessoa.enderecoNumero) {
          setValue('motorista.endNumero', pessoa.enderecoNumero.toString(), {
            shouldValidate: true,
          })
        }
      }
      trigger(['motorista.id', 'motorista.role', 'motorista.nome', 'motorista.sobrenome', 'motorista.apelido', 'motorista.role', 'motorista.email', 'motorista.celular', 'motorista.telefone', 'motorista.cep', 'motorista.bairro', 'motorista.rua', 'motorista.endNumero']);
    }
    if (idValue !== '0' && idValue !== undefined) {
      fetchPessoa(idValue)
    }
  }, [idValue, setValue])

  const registerWithMask = useHookFormMask(register)

  return (
    <CardForm title="Motorista" sectionId="driver-section">
      <div className="grid grid-cols-1 pt-4 lg:grid-cols-2 lg:gap-8">
        <div className="col-span-2">
          <FormField
            control={control}
            name="motorista.id"
            render={({ field }) => {
              return (
                <SelectGroupInput
                  label="Selecione o tio de externa:"
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
        </div>
        <TwoRowInput>
          <FormField
            control={control}
            name="motorista.nome"
            disabled={canEdit}
            render={({ field }) => (
              <TextInput label={'Nome *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </TwoRowInput>
        <TwoRowInput>
          <FormField
            control={control}
            name="motorista.sobrenome"
            disabled={canEdit}
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
            name="motorista.apelido"
            disabled={canEdit}
            render={({ field }) => {
              return (
                <TextInput label={'Apelido'}>
                  <Input {...field} />
                </TextInput>
              )
            }}
          />
        </TwoRowInput>
        <TwoRowInput>
          <FormField
            control={control}
            name="motorista.email"
            disabled={canEdit}
            render={({ field }) => (
              <TextInput label={'E-mail *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </TwoRowInput>
        <TwoRowInput>
          <FormField
            control={control}
            name="motorista.celular"
            disabled={canEdit}
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
            name="motorista.telefone"
            disabled={canEdit}
            render={({ field }) => {
              return (
                <TextInput label={'Telefone'}>
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
            name="motorista.cep"
            disabled={canEdit}
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
            name="motorista.bairro"
            disabled={true}
            render={({ field }) => (
              <TextInput label={'Bairro *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </TwoRowInput>

        <TwoRowInput>
          <FormField
            control={control}
            name="motorista.rua"
            disabled={true}
            render={({ field }) => (
              <TextInput label={'Rua *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </TwoRowInput>
        <TwoRowInput>
          <FormField
            control={control}
            name="motorista.endNumero"
            render={({ field }) => (
              <TextInput label={'Número do endereço*'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </TwoRowInput>
      </div>
    </CardForm>
  )
}
