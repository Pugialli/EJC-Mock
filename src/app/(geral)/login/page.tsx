'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const loginScheme = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email({ message: 'O email não é válido' }),

  password: z.string({ required_error: 'A senha é obrigatória.' }),
})

export type loginData = z.infer<typeof loginScheme>

export default function Login() {
  const form = useForm<loginData>({
    resolver: zodResolver(loginScheme),
  })

  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  async function handleLogIn(data: loginData) {
    // try {
    //   await api.post('/auth/singinRequest', data)
    //   router.replace('/admin/externa')
    // } catch {
    //   toast.error('Seu usuário ou senha estão incorretos')
    // }

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (result?.ok === false) {
      toast.error('Seu usuário ou senha estão incorretos.')
    } else {
      router.replace('/admin/externa')
    }
  }

  return (
    <div className="flex h-auto items-center justify-center bg-primary py-11">
      <FormProvider {...form}>
        <form id="loginForm" onSubmit={handleSubmit(handleLogIn)}>
          <Card className="flex w-auto flex-col items-center gap-8 p-8 text-zinc-700 lg:w-96">
            <CardHeader className="flex flex-col gap-2 p-0 text-center">
              <CardTitle className="text-3xl font-bold text-zinc-700">
                Log In
              </CardTitle>
              <CardDescription className="text-nowrap text-sm text-zinc-500">
                Área exclusiva para membros do movimento
              </CardDescription>
            </CardHeader>
            <CardContent className="flex w-full flex-col gap-6 p-0">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <TextInput label={'Email'}>
                    <Input type="email" {...field} />
                  </TextInput>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <TextInput label={'Senha'}>
                    <Input {...field} hidable={true} />
                  </TextInput>
                )}
              />
              <Link href="/login" className="text-zinc-500 underline">
                Esqueceu a senha?
              </Link>
            </CardContent>
            <CardFooter className="flex w-full flex-col gap-8 p-0">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Avançar
              </Button>
              <span className="text-sm text-zinc-400">
                Não tem cadastro? Fale com um Dirigente!
              </span>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}
