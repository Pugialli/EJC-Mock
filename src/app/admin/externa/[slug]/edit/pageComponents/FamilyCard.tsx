import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectItem,
  type SelectArray,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getMoraCom } from '@/utils/fetch-domains'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { CardForm } from '../components/CardForm'
import { CardFormSection } from '../components/CardFormSection'

export function FamilyCard() {
  const form = useFormContext()

  const { data: moraCom } = useQuery<SelectArray[]>({
    queryFn: async () => await getMoraCom(),
    queryKey: ['moraCom'],
  })

  const {
    register,
    // handleSubmit,
    control,
    // formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  return (
    <CardForm title="Família" sectionId="family-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <CardFormSection>
          <FormField
            control={control}
            name="moraCom"
            render={({ field }) => {
              return (
                <SelectGroupInput
                  label="Com quem você mora? *"
                  placeholder="Selecione uma opção"
                  onChange={field.onChange}
                  value={field.value}
                >
                  {moraCom &&
                    moraCom.map((item) => {
                      return (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          text={item.label}
                        />
                      )
                    })}
                </SelectGroupInput>
              )
            }}
          />

          <FormField
            control={control}
            name="nomeFamiliar"
            render={({ field }) => (
              <TextInput label={'Nome de um familiar *'}>
                <Input {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="telFamiliar"
            render={({ field }) => {
              return (
                <TextInput label={'Telefone do familiar *'}>
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
            name="parentescoFamiliar"
            render={({ field }) => (
              <TextInput label={'Grau de parentesco *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
        <CardFormSection>
          <FormField
            control={control}
            name="statusPais"
            render={({ field }) => {
              return (
                <SelectGroupInput
                  label="Seus pais são separados? *"
                  placeholder="Selecione uma opção"
                  onChange={field.onChange}
                  value={field.value}
                >
                  <SelectItem value="sim" text="Sim" />
                  <SelectItem value="nao" text="Não" />
                  <SelectItem value="na" text="Não se Aplica" />
                </SelectGroupInput>
              )
            }}
          />

          <FormField
            control={control}
            name="nomeFamiliar2"
            render={({ field }) => (
              <TextInput label={'Nome de outro familiar'}>
                <Input {...field} />
              </TextInput>
            )}
          />

          <FormField
            control={control}
            name="telFamiliar2"
            render={({ field }) => {
              return (
                <TextInput label={'Telefone do familiar'}>
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
            name="parentescoFamiliar2"
            render={({ field }) => (
              <TextInput label={'Grau de parentesco com o outro familiar'}>
                <Input {...field} />
              </TextInput>
            )}
          />
        </CardFormSection>
      </div>
    </CardForm>
  )
}
