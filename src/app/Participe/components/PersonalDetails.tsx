import { CardContent } from '@/components/ui/card'
import { MultiStep, TextInput } from '@ejc-ui/react'

export function PersonalDetails() {
  return (
    <>
      <div className="flex w-full justify-between">
        <span className="text-2xl font-bold">Dados Pessoais</span>
        <MultiStep size={5} currentStep={1} />
      </div>
      <CardContent className="flex flex-col gap-3 text-lg">
        <span>Sobre Você</span>
        <TextInput type="name" placeholder="Nome *" />
        <TextInput type="surname" placeholder="Sobrenome *" />
        <TextInput type="nascimento" placeholder="Nascimento *" />
        <TextInput type="apelido" placeholder="Como gostaria de ser chamado?" />
        <TextInput type="religiao" placeholder="Religião" />
        <span>Você está preenchendo este cadastro para você mesmo?</span>

        <span>Contato</span>
        <TextInput type="name" placeholder="Celular *" />
        <TextInput type="name" placeholder="Telefone" />
        <TextInput type="name" placeholder="E-mail *" />
        <TextInput
          type="name"
          placeholder="Instagram *"
          prefix="instagram.com/"
        />
      </CardContent>
    </>
  )
}
