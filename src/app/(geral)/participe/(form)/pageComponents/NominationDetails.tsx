'use client'

import { TextInput } from '@/components/Form/TextInput'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  CreateEncontristaContext,
  NominationFormData,
} from '@/context/CreateEncontristaContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'
import { CardParticipe } from '../components/CardParticipe'
import { CardSection } from '../components/CardSection'

const nominationFormScheme = z.object({
  indicadoPorNome: z.string().optional(),
  indicadoApelido: z.string().optional(),
  indicadoTelefone: z.string().optional(),
  indicadoEmail: z.string().optional(),
})

export type NominationFormDataInput = z.infer<typeof nominationFormScheme>

export function NominationDetails() {
  const { completeForm, updateData } = useContext(CreateEncontristaContext)
  const { nextStep, handleStep, activeStep } = useWizard()

  const form = useForm<NominationFormDataInput>({
    resolver: zodResolver(nominationFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  function handleNextFormStep(formDataInput: NominationFormDataInput) {
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))
    const nominationData = formDataInput as NominationFormData

    handleStep(() => {
      updateData({ data: nominationData, step: activeStep })
    })
    nextStep()
  }

  return (
    <Form {...form}>
      <form
        id="nominationForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardParticipe title="Indicação" isSubmitting={isSubmitting}>
          <CardSection title="Quem te convidou para o EJC?">
            <FormField
              control={control}
              name="indicadoPorNome"
              defaultValue={completeForm.nomination.indicadoPorNome}
              render={({ field }) => (
                <TextInput label={'Nome de quem te convidou'}>
                  <Input autoFocus {...field} />
                </TextInput>
              )}
            />

            <FormField
              control={control}
              name="indicadoApelido"
              defaultValue={completeForm.nomination.indicadoApelido}
              render={({ field }) => (
                <TextInput label={'Apelido de quem te convidou'}>
                  <Input {...field} />
                </TextInput>
              )}
            />

            <FormField
              control={control}
              name="indicadoTelefone"
              defaultValue={completeForm.nomination.indicadoTelefone}
              render={({ field }) => (
                <TextInput label={'Telefone de quem te convidou'}>
                  <Input
                    {...field}
                    {...registerWithMask(field.name, '(99) [9]9999-9999')}
                    placeholder="(__) _____-____"
                  />
                </TextInput>
              )}
            />
            <FormField
              control={control}
              name="indicadoEmail"
              defaultValue={completeForm.nomination.indicadoEmail}
              render={({ field }) => (
                <TextInput label={'Email de quem te convidou'}>
                  <Input
                    type="email"
                    placeholder="indicacao@gmail.com"
                    {...field}
                  />
                </TextInput>
              )}
            />
          </CardSection>
        </CardParticipe>
      </form>
    </Form>
  )
}
