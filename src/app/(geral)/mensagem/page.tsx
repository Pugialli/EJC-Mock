'use client'

import type { EncontristaConfirmadosData } from '@/app/api/encontrista/confirmados/get-encontristas-confirmados'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'

import {
  SelectItem,
  type SelectArray,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

async function getConfirmados() {
  const response: EncontristaConfirmadosData[] = await api
    .get('encontrista/confirmados')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = {
      label: `${item.nome} ${item.sobrenome}`,
      value: item.id,
    }

    selectData.push(selectItem)
  })

  return selectData
}

const messageScheme = z.object({
  encontrista: z.string({ required_error: 'O encontrista é obrigatório.' }),
  para: z.string(),
  de: z.string(),
  conteudo: z.string(),
})

export type messageData = z.infer<typeof messageScheme>

export default function Mensagem() {
  const form = useForm<messageData>({
    resolver: zodResolver(messageScheme),
  })

  // const router = useRouter()

  const { data: encontristas } = useQuery<SelectArray[]>({
    queryFn: async () => await getConfirmados(),
    queryKey: ['encontristasConfirmados'],
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  async function handlPostMessage(data: messageData) {
    console.log(data)
    // if (result?.ok === false) {
    //   toast.error('Seu usuário ou senha estão incorretos.')
    // } else {
    //   router.replace('/admin/externa')
    // }
  }

  return (
    <div className="flex w-auto items-center justify-center px-4 pt-11">
      <FormProvider {...form}>
        <form id="loginForm" onSubmit={handleSubmit(handlPostMessage)}>
          <Card className="flex flex-col items-center gap-8 p-8 text-zinc-700 lg:w-auto">
            <CardHeader className="flex flex-col gap-2 p-0 text-center">
              <CardTitle className="text-3xl font-bold text-zinc-700">
                Mensagem
              </CardTitle>
              <CardDescription className="text-sm text-zinc-500">
                Deixe aqui sua mensagem de carinho para um de nossos
                encontristas
              </CardDescription>
            </CardHeader>
            <CardContent className="flex w-full flex-col gap-6 p-0">
              <FormField
                control={control}
                name="encontrista"
                render={({ field }) => {
                  return (
                    <SelectGroupInput
                      label="Para quem você deseja enviar essa mensagem?"
                      placeholder="Selecione um encontrista"
                      onChange={field.onChange}
                      value={field.value}
                    >
                      {encontristas &&
                        encontristas.map((item) => {
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
              <div className="flex flex-col gap-4 border-2 border-dashed border-primary bg-amber-100/40 p-4">
                <div className="flex items-end gap-1">
                  <FormField
                    control={control}
                    name="para"
                    render={({ field }) => (
                      <TextInput>
                        <Input placeholder="Querido..." {...field} />
                      </TextInput>
                    )}
                  />
                  <span className="text-4xl">,</span>
                </div>
                <FormField
                  control={control}
                  name="conteudo"
                  render={({ field }) => (
                    <Textarea
                      placeholder="Insira aqui sua mensagem..."
                      {...field}
                    />
                  )}
                />
                <div className="flex w-full justify-end">
                  <div className="w-52">
                    <FormField
                      control={control}
                      name="de"
                      render={({ field }) => (
                        <TextInput>
                          <Input
                            className="text-end"
                            placeholder="Seu nome"
                            {...field}
                          />
                        </TextInput>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex w-full flex-col gap-8 p-0">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Enviar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}
