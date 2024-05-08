import { CardSection } from '@/app/(geral)/participe/(form)/components/CardSection'
import type { Religiao } from '@/app/api/domains/religiao/get-religiao'
import type { EncontristaData } from '@/app/api/encontrista/[id]/get-encontrista'
import { RadioInputGroup } from '@/components/Form/RadioInput/RadioInputGroup'
import { RadioInputItem } from '@/components/Form/RadioInput/RadioInputItem'
import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectArray,
  SelectItem,
} from '@/components/Form/SelectInput/SelectItem'
import { TextInput } from '@/components/Form/TextInput'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const editFormScheme = z.object({
  nome: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  sobrenome: z
    .string({ required_error: 'O sobrenome é obrigatório.' })
    .min(3, { message: 'O sobrenome precisa ter pelo menos 3 letras' }),
  dataNascimento: z.string().min(10, { message: 'A data está incompleta' }),
  apelido: z.string().optional(),
  religiao: z
    .enum([
      'catolica',
      'evangelica',
      'espirita',
      'matriz_africana',
      'judaica',
      'nao_tenho',
      'outra',
    ])
    .optional(),
  paraVoce: z.enum(['sim', 'nao']),
  celular: z
    .string()
    .min(14, { message: 'O número de celular está incompleto' }),
  telefone: z.string().optional(),
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email({ message: 'O email não é válido' }),
  instagram: z.string().optional(),
})

export type editFormDataInput = z.infer<typeof editFormScheme>

async function getReligioes() {
  const response: Religiao[] = await api
    .get('domains/religiao')
    .then((response) => response.data)
    .catch((err) => console.error(err))

  const selectData: SelectArray[] = []
  response.forEach((item) => {
    const selectItem: SelectArray = { label: item.religiao, value: item.id }

    selectData.push(selectItem)
  })

  return selectData
}

async function checkPessoa(email: string) {
  return await api
    .get(`encontrista/check-email/${email}`)
    .then(() => true)
    .catch(() => false)
}

export default async function EditEncontrista({
  params,
}: {
  params: { id: string }
}) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/encontrista/${params.id}`,
  )

  console.log(response)

  const encontrista: EncontristaData = await response.json()

  // const { data: religioes } = useQuery<SelectArray[]>({
  //   queryFn: async () => await getReligioes(),
  //   queryKey: ['religioes'],
  // })

  const form = useForm<editFormDataInput>({
    resolver: zodResolver(editFormScheme),
    defaultValues: {
      nome: encontrista.pessoa.nome,
      sobrenome: encontrista.pessoa.sobrenome,
      apelido: encontrista.pessoa.apelido,
      celular: encontrista.pessoa.celular,
      email: encontrista.pessoa.email,
      dataNascimento: encontrista.pessoa.nascimento,
      instagram: encontrista.pessoa.instagram,
      paraVoce: encontrista.pessoa.isAutofill ? 'sim' : 'nao',
      religiao: encontrista.pessoa.idReligiao,
      telefone: encontrista.pessoa.telefone,
    },
  })

  const { register, handleSubmit, control } = form

  const registerWithMask = useHookFormMask(register)

  async function handleNextFormStep(formDataInput: editFormDataInput) {
    // const dataNascimentoCorrigido = stringToDate(formDataInput.dataNascimento)
    // await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000))
    // const personalData = formDataInput as PersonalFormData
    const isAlreadyOnDB = await checkPessoa(formDataInput.email)
    if (isAlreadyOnDB) {
      toast.warning('Este email já está cadastrado', {
        description:
          'Caso queira alterar alguma informação procure quem te indicou ou um de nossos dirigentes.',
        duration: 20000,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        id="editForm"
        onSubmit={handleSubmit(handleNextFormStep)}
        className="w-full"
      >
        <Card className="flex w-11/12 flex-col items-center gap-5 px-0 py-8 text-zinc-700 lg:w-card lg:px-8 ">
          <CardContent className="w-full px-3 py-0">
            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl font-bold lg:text-nowrap">
                Dados Pessoais
              </span>
            </div>
            <div className="flex flex-col gap-10 px-0 py-10 text-lg lg:gap-14 lg:py-14">
              <CardSection title="Sobre Você">
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
              </CardSection>
              <CardSection title="Contato">
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
              </CardSection>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
