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

export function AddressEncontroCard() {
  const form = useFormContext()
  const { register, control, watch, setValue } = form

  const cepValue = watch('cepEncontro')

  useEffect(() => {
    async function fetchAddress(cep: string) {
      const response = await getCEPData(cep)
      if (response === undefined) {
        toast.error('Seu CEP não foi encontrado')
      } else {
        const addressData: CEPResponse = await response.json()
        setValue('cidadeEncontro', addressData.city, { shouldValidate: false })
        setValue('bairroEncontro', addressData.neighborhood, {
          shouldValidate: false,
        })
        setValue('ruaEncontro', addressData.street, { shouldValidate: false })
      }
    }
    if (cepValue && cepValue[8] !== '_') {
      fetchAddress(cepValue)
    } else {
      setValue('cidadeEncontro', '')
      setValue('bairroEncontro', '')
      setValue('ruaEncontro', '')
    }
  }, [cepValue, setValue])

  const registerWithMask = useHookFormMask(register)

  return (
    <CardForm
      title="Endereço durante o Encontro"
      sectionId="address-encontro-section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <CardFormSection>
          <FormField
            control={control}
            name="cepEncontro"
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
            name="cidadeEncontro"
            render={({ field }) => (
              <TextInput label={'Cidade *'}>
                <Input readOnly={true} {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="bairroEncontro"
            render={({ field }) => (
              <TextInput label={'Bairro *'}>
                <Input readOnly={true} {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
        <CardFormSection>
          <FormField
            control={control}
            name="ruaEncontro"
            render={({ field }) => (
              <TextInput label={'Rua *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="numeroEncontro"
            render={({ field }) => (
              <TextInput label={'Número *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="complementoEncontro"
            render={({ field }) => (
              <TextInput label={'Complemento'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
      </div>
    </CardForm>
  )
}
