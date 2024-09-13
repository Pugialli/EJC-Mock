import { TextInput } from '@/components/Form/TextInput'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getCEPData, type CEPResponse } from '@/utils/fetch-cep'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { CardForm } from '../components/CardForm'
import { CardFormSection } from '../components/CardFormSection'

export function CaronaCard() {
  const form = useFormContext()

  const { register, watch, control, setValue } = form

  const cepValue = watch('carona.cep')

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
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
      setValue('estado', '')
      setValue('cidade', '')
      setValue('bairro', '')
      setValue('rua', '')
    }
  }, [cepValue, setValue])

  const registerWithMask = useHookFormMask(register)

  return (
    <CardForm title="Carona" sectionId="copilot-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <CardFormSection>
          <FormField
            control={control}
            name="carona.nome"
            render={({ field }) => (
              <TextInput label={'Nome *'}>
                <Input {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="carona.apelido"
            render={({ field }) => {
              return (
                <TextInput label={'Apelido'}>
                  <Input {...field} />
                </TextInput>
              )
            }}
          />
          <FormField
            control={control}
            name="carona.celular"
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
          <FormField
            control={control}
            name="carona.bairro"
            render={({ field }) => (
              <TextInput label={'Bairro *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="carona.endNumero"
            render={({ field }) => (
              <TextInput label={'Número do endereço*'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
        <CardFormSection>
          <FormField
            control={control}
            name="carona.sobrenome"
            render={({ field }) => (
              <TextInput label={'Sobrenome *'}>
                <Input {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="carona.email"
            render={({ field }) => (
              <TextInput label={'E-mail *'}>
                <Input {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="carona.telefone"
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

          <FormField
            control={control}
            name="carona.cidade"
            render={({ field }) => (
              <TextInput label={'Cidade *'}>
                <Input readOnly={true} {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="carona.rua"
            render={({ field }) => (
              <TextInput label={'Rua *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
      </div>
    </CardForm>
  )
}
