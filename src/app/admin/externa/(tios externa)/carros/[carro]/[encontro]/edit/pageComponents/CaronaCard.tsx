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
import { TwoRowInput } from '../../../../../../../../../components/TwoRowInput'
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

export function CaronaCard() {
  const form = useFormContext()

  const { data: possiveisExternas } = useQuery<SelectArray[]>({
    queryFn: async () => await getPossiveisTios(),
    queryKey: ['possiveisExternas'],
  })

  const { register, watch, control, setValue, trigger } = form

  const cepValue = watch('carona.cep')
  const idValue = watch('carona.id')
  const roleValue: Role = watch('carona.role')

  const noCarona = idValue !== '1'
  const cannotEdit = roleValue !== 'TIOEXTERNA' && idValue !== '0'
  const editCampoNumero = !noCarona

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
        setValue('carona.cidade', addressData.city, { shouldValidate: true })
        setValue('carona.bairro', addressData.neighborhood, {
          shouldValidate: true,
        })
        setValue('carona.rua', addressData.street, { shouldValidate: true })
      }
    }
    if (cepValue && cepValue[8] !== '_') {
      fetchAddress(cepValue)
    }
  }, [cepValue, setValue])

  useEffect(() => {
    async function fetchPessoa(id: string) {
      const pessoa: TioDeExternaData = await getTioExternaData(id)
      if (pessoa === undefined) {
        toast.error('Erro ao carregar o tio de externa')
      } else {
        setValue('carona.id', pessoa.id, {
          shouldValidate: true,
        })
        setValue('carona.role', pessoa.role, {
          shouldValidate: true,
        })
        setValue('carona.nome', pessoa.nome, {
          shouldValidate: true,
        })
        setValue('carona.sobrenome', pessoa.sobrenome, {
          shouldValidate: true,
        })
        setValue('carona.apelido', pessoa.apelido, { shouldValidate: true })
        setValue('carona.email', pessoa.email, { shouldValidate: true })
        setValue('carona.celular', pessoa.celular, { shouldValidate: true })
        setValue('carona.telefone', pessoa.telefone, {
          shouldValidate: true,
        })
        setValue('carona.cep', pessoa.endereco.cep, { shouldValidate: true })
        setValue('carona.bairro', pessoa.endereco.bairro, {
          shouldValidate: true,
        })
        setValue('carona.rua', pessoa.endereco.rua, { shouldValidate: true })
        if (pessoa.enderecoNumero) {
          setValue('carona.endNumero', pessoa.enderecoNumero.toString(), {
            shouldValidate: true,
          })
        }

        trigger([
          'carona.id',
          'carona.role',
          'carona.nome',
          'carona.sobrenome',
          'carona.apelido',
          'carona.role',
          'carona.email',
          'carona.celular',
          'carona.telefone',
          'carona.cep',
          'carona.bairro',
          'carona.rua',
          'carona.endNumero',
        ])
      }
    }

    function clearPessoa(id: string) {
      setValue('carona.id', id)
      setValue('carona.role', undefined)
      setValue('carona.nome', '')
      setValue('carona.sobrenome', '')
      setValue('carona.apelido', '')
      setValue('carona.email', '')
      setValue('carona.celular', '')
      setValue('carona.telefone', '')
      setValue('carona.cep', '')
      setValue('carona.bairro', '')
      setValue('carona.rua', '')
      setValue('carona.endNumero', 0)
    }

    if (idValue === '0' || idValue === '1' || idValue === undefined) {
      clearPessoa(idValue)
    } else {
      fetchPessoa(idValue)
    }
  }, [idValue, setValue, trigger])

  const registerWithMask = useHookFormMask(register)

  return (
    <CardForm title="Carona" sectionId="copilot-section">
      <div className="grid grid-cols-1 pt-4 lg:grid-cols-2 lg:gap-8">
        <div className="col-span-2">
          <FormField
            control={control}
            name="carona.id"
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

                  <SelectItem
                    key={'sem_tio'}
                    value={'1'}
                    text={'Não terá carona'}
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
        {noCarona && (
          <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <TwoRowInput>
              <FormField
                control={control}
                name="carona.nome"
                disabled={cannotEdit}
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
                name="carona.sobrenome"
                disabled={cannotEdit}
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
                disabled={cannotEdit}
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
                name="carona.email"
                disabled={cannotEdit}
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
                name="carona.celular"
                disabled={cannotEdit}
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
                name="carona.telefone"
                disabled={cannotEdit}
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
                name="carona.cep"
                disabled={cannotEdit}
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
                name="carona.bairro"
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
                name="carona.rua"
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
                name="carona.endNumero"
                disabled={editCampoNumero}
                render={({ field }) => (
                  <TextInput label={'Número do endereço*'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
            </TwoRowInput>
          </div>
        )}
      </div>
    </CardForm>
  )
}
