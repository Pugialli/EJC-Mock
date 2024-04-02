'use client'

import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectArray,
  SelectItem,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { MultiStep } from '@/components/MultiStep'

import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const tamanhoCamisaList = [
  { value: 'p', label: 'P' },
  { value: 'm', label: 'M' },
  { value: 'g', label: 'G' },
  { value: 'gg', label: 'GG' },
  { value: 'xgg', label: 'XGG' },
  { value: 'outro', label: 'Outro' },
] as SelectArray[]

const otherFormScheme = z.object({
  tamanhoCamisa: z.enum(['p', 'm', 'g', 'gg', 'xgg', 'outro']).optional(),
  outroMovimento: z.enum(['sim', 'nao'], {
    required_error: 'Esse campo é obrigatório',
  }),
  nomeMovimento: z.string().optional(),

  restricoesAlimentares: z.string().optional(),
  observacoes: z.string().optional(),
})

export type OtherFormData = z.infer<typeof otherFormScheme>

interface OtherDetailsProps {
  forward: () => void
  previous: () => void
}

export function OtherDetails({ forward, previous }: OtherDetailsProps) {
  const form = useForm<OtherFormData>({
    resolver: zodResolver(otherFormScheme),
  })

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = form

  async function handleNextFormStep(data: OtherFormData) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    forward()
  }

  const isFromOtherGroup = !(watch('outroMovimento') === 'sim')

  return (
    <Form {...form}>
      <form
        id="otherForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <span className="text-nowrap text-2xl font-bold">Outros</span>
            <MultiStep size={5} currentStep={5} />
          </div>
          <div className="flex flex-col gap-14 px-0 py-14 text-lg">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold ">
                  Informações extras
                </span>
                <span className="text-xs text-zinc-500">
                  *Perguntas obrigatórias
                </span>
              </div>

              <FormField
                control={control}
                name="tamanhoCamisa"
                render={({ field }) => {
                  return (
                    <SelectGroupInput
                      label="Qual é seu tamanho de camisa?"
                      placeholder="Selecione uma opção"
                      onChange={field.onChange}
                      value={field.value}
                    >
                      {tamanhoCamisaList.map((item) => {
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
                name="outroMovimento"
                render={({ field }) => {
                  return (
                    <RadioInputGroup
                      label="Você faz parte ativamente de outro encontro de jovens? *"
                      onChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <RadioInputItem value="sim" label="Sim" />
                      <RadioInputItem value="nao" label="Não" />
                    </RadioInputGroup>
                  )
                }}
              />

              <FormField
                control={control}
                name="nomeMovimento"
                render={({ field }) => (
                  <TextInput label={'De qual movimento você fez parte?'}>
                    <Input {...field} disabled={isFromOtherGroup} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="restricoesAlimentares"
                render={({ field }) => (
                  <TextInput label={'Restrições alimentares'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="observacoes"
                render={({ field }) => (
                  <TextInput label={'Observações'}>
                    <Input {...field} />
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
