import { TextInput } from '@/components/Form/TextInput'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { CardForm } from '../components/CardForm'
import { CardFormSection } from '../components/CardFormSection'

export function ExternaCard() {
  const form = useFormContext()

  const { control } = form

  return (
    <CardForm title="Informações Extras" sectionId="externa-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <CardFormSection>
          <FormField
            control={control}
            name="obsExternaLocalizacao"
            render={({ field }) => (
              <TextInput label={'Observaçoes de Localização'}>
                <Input {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="obsExternaSaude"
            render={({ field }) => (
              <TextInput label={'Observaçoes de Saúde'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
        <CardFormSection>
          <FormField
            control={control}
            name="obsExternaConhecidos"
            render={({ field }) => (
              <TextInput label={'Observaçoes sobre Conhecidos'}>
                <Input {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="obsExternaOutros"
            render={({ field }) => (
              <TextInput label={'Outras Observaçoes'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
      </div>
    </CardForm>
  )
}
