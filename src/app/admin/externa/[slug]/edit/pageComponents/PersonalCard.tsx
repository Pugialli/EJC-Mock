import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectItem,
  type SelectArray,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getReligioes } from '@/utils/fetch-domains'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { CardForm } from '../components/CardForm'
import { CardFormSection } from '../components/CardFormSection'

export function PersonalCard() {
  const form = useFormContext()
  const { data: religioes } = useQuery<SelectArray[]>({
    queryFn: async () => await getReligioes(),
    queryKey: ['religioes'],
  })

  const {
    register,
    // handleSubmit,
    control,
    // formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  return (
    <CardForm title="Dados Pessoais" sectionId="personal-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <CardFormSection>
          <FormField
            control={control}
            name="nome"
            render={({ field }) => (
              <TextInput label={'Nome *'}>
                <Input autoFocus {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="sobrenome"
            render={({ field }) => (
              <TextInput label={'Sobrenome *'}>
                <Input {...field} />
              </TextInput>
            )}
          />
          <FormField
            control={control}
            name="dataNascimento"
            render={({ field }) => {
              return (
                <TextInput label={'Nascimento *'}>
                  <Input
                    {...field}
                    {...registerWithMask(field.name, '99/99/9999')}
                    placeholder="DD/MM/AAAA"
                  />
                </TextInput>
              )
            }}
          />

          <FormField
            control={control}
            name="apelido"
            render={({ field }) => {
              return (
                <TextInput label={'Como gostaria de ser chamado?'}>
                  <Input {...field} />
                </TextInput>
              )
            }}
          />

          <FormField
            control={control}
            name="religiao"
            render={({ field }) => {
              return (
                <SelectGroupInput
                  label="Religião"
                  onChange={field.onChange}
                  value={field.value}
                >
                  {religioes &&
                    religioes.map((item) => {
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
        </CardFormSection>
        <CardFormSection>
          <FormField
            control={control}
            name="celular"
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
            name="telefone"
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

          <FormField
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <TextInput label={'Email *'}>
                  <Input {...field} placeholder="encontrista@gmail.com" />
                </TextInput>
              )
            }}
          />

          <FormField
            control={control}
            name="instagram"
            render={({ field }) => {
              return (
                <TextInput label={'Instagram'}>
                  <Input {...field} prefix="instagram.com/" />
                </TextInput>
              )
            }}
          />
          <FormField
            control={control}
            name="paraVoce"
            render={({ field }) => {
              return (
                <RadioInputGroup
                  label="Você está preenchendo esse cadastro para si mesmo? *"
                  description='Se você estiver preenchendo o cadastro para um amigo ou conhecido, favor clicar em "Não."'
                  onChange={field.onChange}
                  defaultValue={field.value}
                >
                  <RadioInputItem value="sim" label="Sim" />
                  <RadioInputItem value="nao" label="Não" />
                </RadioInputGroup>
              )
            }}
          />
        </CardFormSection>
      </div>
    </CardForm>
  )
}
