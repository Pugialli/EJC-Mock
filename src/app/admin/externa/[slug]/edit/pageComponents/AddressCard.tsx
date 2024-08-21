import { TextInput } from '@/components/Form/TextInput'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { CardForm } from '../components/CardForm'
import { CardFormSection } from '../components/CardFormSection'

export function AddressCard() {
  const form = useFormContext()
  const {
    register,
    // handleSubmit,
    control,
    // formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  return (
    <CardForm title="Endereço" sectionId="address-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <CardFormSection>
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
                <Input readOnly={true} {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="cidade"
            render={({ field }) => (
              <TextInput label={'Cidade *'}>
                <Input readOnly={true} {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="bairro"
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
        </CardFormSection>
      </div>
    </CardForm>
  )
}
