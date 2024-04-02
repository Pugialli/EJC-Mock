'use client'

import { TextInput } from '@/components/Form/TextInput'
import { MultiStep } from '@/components/MultiStep'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const nominationFormScheme = z.object({
  indicadoPorNome: z.string().optional(),
  indicadoApelido: z.string().optional(),
  indicadoTelefone: z.string().optional(),
  indicadoEmail: z.string().optional(),
})

export type NominationFormData = z.infer<typeof nominationFormScheme>

interface NominationDetailsProps {
  forward: () => void
  previous: () => void
}

export function NominationDetails({
  forward,
  previous,
}: NominationDetailsProps) {
  const form = useForm<NominationFormData>({
    resolver: zodResolver(nominationFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(data: NominationFormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    forward()
  }

  return (
    <Form {...form}>
      <form
        id="nominationForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <span className="text-nowrap text-2xl font-bold">Indicação</span>
            <MultiStep size={5} currentStep={4} />
          </div>
          <div className="flex flex-col gap-14 px-0 py-14 text-lg">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">
                  Quem te convidou para o EJC?
                </span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

              <FormField
                control={control}
                name="indicadoPorNome"
                render={({ field }) => (
                  <TextInput label={'Nome de quem te convidou'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="indicadoApelido"
                render={({ field }) => (
                  <TextInput label={'Apelido de quem te convidou'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="indicadoTelefone"
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
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full p-0">
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={previous}>
              Voltar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Avançar
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form>
  )
}
