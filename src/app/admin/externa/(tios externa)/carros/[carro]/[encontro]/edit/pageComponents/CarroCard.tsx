import { TextInput } from '@/components/Form/TextInput'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'
import { CardForm } from '../components/CardForm'
import { CardFormSection } from '../components/CardFormSection'

export function CarroCard() {
  const form = useFormContext()

  const { control } = form

  return (
    <CardForm title="Carro" sectionId="car-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <CardFormSection>
          <FormField
            control={control}
            name="numeroCarro"
            render={({ field }) => (
              <TextInput label={'Número do carro nesse encontro *'}>
                <Input autoFocus {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="modeloCarro"
            render={({ field }) => (
              <TextInput label={'Modelo *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="observacaoMotorista"
            render={({ field }) => {
              return (
                <TextInput label={'Observações do Motorista'}>
                  <Textarea {...field} />
                </TextInput>
              )
            }}
          />
        </CardFormSection>
        <CardFormSection>
          <FormField
            control={control}
            name="placaCarro"
            render={({ field }) => {
              return (
                <TextInput label={'Placa *'}>
                  <Input {...field} />
                </TextInput>
              )
            }}
          />

          <FormField
            control={control}
            name="lugaresCarro"
            render={({ field }) => {
              return (
                <TextInput label={'Vagas no carro *'}>
                  <Input {...field} />
                </TextInput>
              )
            }}
          />

          <FormField
            control={control}
            name="observacao"
            render={({ field }) => {
              return (
                <TextInput label={'Observações da Externa'}>
                  <Textarea {...field} />
                </TextInput>
              )
            }}
          />
        </CardFormSection>
      </div>
    </CardForm>
  )
}
