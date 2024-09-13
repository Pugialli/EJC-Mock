import { CardNewCarro } from '@/app/(geral)/participe/(form)/components/CardNewCarro'
import { CardFormSection } from '@/app/admin/externa/[slug]/edit/components/CardFormSection'
import type { CheckPlacaResponse } from '@/app/api/carro/check-placa/[placa]/check-placa-exists'
import { TextInput } from '@/components/Form/TextInput'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { NewCarContext, type CarFormData } from '@/context/NewCarroContext'
import { checkCarro } from '@/utils/check-already-db'
import { getNextCarroEncontro } from '@/utils/fetch-this-encontro'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const carFormScheme = z.object({
  modeloCarro: z
    .string({ required_error: 'O modelo do carro é obrigatório.' })
    .min(3, { message: 'O modelo precisa ter pelo menos 3 letras.' }),
  placaCarro: z
    .string({ required_error: 'A placa do carro é obrigatória.' })
    .min(7, { message: 'A placa está incompleta.' }),
  lugaresCarro: z.preprocess(
    (val) => {
      return typeof val === 'string' ? parseInt(val, 10) : val
    },
    z.number().min(1, { message: 'O número é obrigatório.' }),
  ),
  observacaoExterna: z.string().optional(),
  numeroEncontro: z.preprocess(
    (val) => {
      return typeof val === 'string' ? parseInt(val, 10) : val
    },
    z.number().min(1, { message: 'O número é obrigatório.' }),
  ),
})

export type CarFormDataInput = z.infer<typeof carFormScheme>

export function CarDetails() {
  const { completeForm, updateData } = useContext(NewCarContext)

  const { nextStep, handleStep, activeStep } = useWizard()

  const form = useForm<CarFormDataInput>({
    resolver: zodResolver(carFormScheme),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    setValue,
    watch,
  } = form

  const registerWithMask = useHookFormMask(register)

  const placa = watch('placaCarro')

  useEffect(() => {
    async function checkPlate() {
      const isAlreadyOnDB: CheckPlacaResponse = await checkCarro(placa)
      if (isAlreadyOnDB) {
        toast.warning('Esta placa já está cadastrada em nosso banco.', {
          description: `Se estiver cadastrando este carro para <b>${isAlreadyOnDB}</b> importe o carro na aba Carros, caso contrário pode continuar.`,
          duration: 30000,
        })
      }
    }
    if (placa && placa.length > 7) checkPlate()
  }, [placa])

  async function handleNextFormStep(formDataInput: CarFormDataInput) {
    const carData: CarFormData = {
      numeroEncontro: formDataInput.numeroEncontro,
      observacaoExterna: formDataInput.observacaoExterna
        ? formDataInput.observacaoExterna
        : '',
      placaCarro: formDataInput.placaCarro,
      lugaresCarro: formDataInput.lugaresCarro,
      modeloCarro: formDataInput.modeloCarro,
    }

    handleStep(() => {
      updateData({ data: carData, step: activeStep })
    })
    nextStep()
  }

  useEffect(() => {
    async function updateNumeroEncontro() {
      const lastCarroAdded = await getNextCarroEncontro()
      setValue('numeroEncontro', lastCarroAdded)
    }
    updateNumeroEncontro()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form {...form}>
      <form
        id="carroForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <CardNewCarro title="Criar carro" isSubmitting={isSubmitting}>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <CardFormSection>
              <FormField
                control={control}
                name="numeroEncontro"
                defaultValue={completeForm.carro.numeroEncontro}
                render={({ field }) => (
                  <TextInput label={'Número do carro nesse encontro *'}>
                    <Input autoFocus {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="modeloCarro"
                defaultValue={completeForm.carro.modeloCarro}
                render={({ field }) => (
                  <TextInput label={'Modelo *'}>
                    <Input {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="observacaoExterna"
                defaultValue={completeForm.carro.observacaoExterna}
                render={({ field }) => {
                  return (
                    <TextInput label={'Comentários da equipe de externa'}>
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
                defaultValue={
                  completeForm.carro.placaCarro === ''
                    ? undefined
                    : completeForm.carro.placaCarro
                }
                render={({ field }) => {
                  return (
                    <TextInput label={'Placa *'}>
                      <Input
                        {...field}
                        {...registerWithMask(field.name, '*{3}-*{4}')}
                        placeholder="___-____"
                      />
                    </TextInput>
                  )
                }}
              />

              <FormField
                control={control}
                name="lugaresCarro"
                defaultValue={completeForm.carro.lugaresCarro}
                render={({ field }) => {
                  return (
                    <TextInput label={'Vagas no carro *'}>
                      <Input {...field} />
                    </TextInput>
                  )
                }}
              />
            </CardFormSection>
          </div>
        </CardNewCarro>
      </form>
    </Form>
  )
}
