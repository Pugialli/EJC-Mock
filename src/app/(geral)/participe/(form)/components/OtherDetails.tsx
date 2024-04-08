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
import { CreateEncontristaContext } from '@/context/CreateEncontristaContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
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

export type OtherFormDataInput = z.infer<typeof otherFormScheme>

export function OtherDetails() {
  const { forwardStep, previousStep, step, completeForm } = useContext(
    CreateEncontristaContext,
  )

  const form = useForm<OtherFormDataInput>({
    resolver: zodResolver(otherFormScheme),
  })

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = form

  async function handleNextFormStep(formDataInput: OtherFormDataInput) {
    const data = formDataInput
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))

    forwardStep({ data })
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
            <MultiStep size={5} currentStep={step} />
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
                defaultValue={completeForm.other.tamanhoCamisa}
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
                defaultValue={completeForm.other.outroMovimento}
                render={({ field }) => {
                  return (
                    <RadioInputGroup
                      label="Você fez parte ativamente de outro encontro de jovens? *"
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
                defaultValue={completeForm.other.nomeMovimento}
                render={({ field }) => (
                  <TextInput label={'De qual movimento você fez parte?'}>
                    <Input {...field} disabled={isFromOtherGroup} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="restricoesAlimentares"
                defaultValue={completeForm.other.restricoesAlimentares}
                render={({ field }) => (
                  <TextInput label={'Restrições alimentares'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />

              <FormField
                control={control}
                name="observacoes"
                defaultValue={completeForm.other.observacoes}
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
            <Button variant="outline" onClick={previousStep}>
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
