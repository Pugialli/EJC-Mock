import { ReactNode, createContext, useState } from 'react'

export interface PersonalFormData {
  nome: string
  sobrenome: string
  dataNascimento: Date
  paraVoce: 'sim' | 'nao'
  celular: string
  email: string
  apelido?: string | undefined
  religiao?:
    | 'catolica'
    | 'evangelica'
    | 'espirita'
    | 'matriz_africana'
    | 'judaica'
    | 'nao_tenho'
    | 'outra'
    | undefined
  telefone?: string | undefined
  instagram?: string | undefined
}

export interface AddressFormData {
  cep: string
  estado: string
  cidade: string
  bairro: string
  rua: string
  numero: string
  complemento: string
  dormiraEmCasa: 'sim' | 'nao'
  bairroDuranteOEncontro?: 'botafogo' | 'copacabana'
}

export interface FamilyFormData {
  moraCom: 'sozinho' | 'conjuge' | 'familiar'
  paisSeparados: 'sim' | 'nao' | 'na'
  nomeFamiliar: string
  telFamiliar: string
  nomeFamiliar2: string
  telFamiliar2: string
}

export interface NominationFormData {
  indicadoPorNome?: string | undefined
  indicadoApelido?: string | undefined
  indicadoTelefone?: string | undefined
  indicadoEmail?: string | undefined
}

export interface OtherFormData {
  outroMovimento: 'sim' | 'nao'
  tamanhoCamisa?: 'p' | 'm' | 'g' | 'gg' | 'xgg' | 'outro' | undefined
  nomeMovimento?: string | undefined
  restricoesAlimentares?: string | undefined
  observacoes?: string | undefined
}

interface FormData {
  data:
    | PersonalFormData
    | AddressFormData
    | FamilyFormData
    | NominationFormData
    | OtherFormData
    | undefined
}

interface CreateEncontristaData {
  personal: PersonalFormData
  address: AddressFormData
  family: FamilyFormData
  nomination: NominationFormData
  other: OtherFormData
}

interface EncontristaContextType {
  step: number
  completeForm: CreateEncontristaData
  dateEJC: Date | undefined
  forwardStep: (data: FormData) => void
  previousStep: () => void
  resetStep: () => void
}

export const CreateEncontristaContext = createContext(
  {} as EncontristaContextType,
)

interface CreateEncontristaContextProviderProps {
  children: ReactNode
}

export function CreateEncontristaContextProvider({
  children,
}: CreateEncontristaContextProviderProps) {
  const [step, setStep] = useState(0)
  const [completeForm, setCompleteForm] = useState<CreateEncontristaData>({
    personal: {
      nome: '',
      sobrenome: '',
      dataNascimento: new Date(1),
      paraVoce: 'sim',
      celular: '',
      email: '',
      apelido: undefined,
      religiao: 'catolica',
      telefone: undefined,
      instagram: undefined,
    },
    address: {
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      complemento: '',
      dormiraEmCasa: 'sim',
      bairroDuranteOEncontro: undefined,
    },
    family: {
      moraCom: 'familiar',
      paisSeparados: 'nao',
      nomeFamiliar: '',
      telFamiliar: '',
      nomeFamiliar2: '',
      telFamiliar2: '',
    },
    nomination: {
      indicadoPorNome: undefined,
      indicadoApelido: undefined,
      indicadoTelefone: undefined,
      indicadoEmail: undefined,
    },
    other: {
      outroMovimento: 'nao',
      tamanhoCamisa: undefined,
      nomeMovimento: undefined,
      restricoesAlimentares: undefined,
      observacoes: undefined,
    },
  })
  const dateEJC = new Date(2024, 4, 24)
  // const dateEJC = undefined

  function forwardStep({ data }: FormData) {
    if (step === 0) {
      setStep((state) => state + 1)
    } else if (step === 1) {
      console.log(`Step: ${step}`, data)
      const newEncontrista = {
        personal: data,
        address: completeForm.address,
        family: completeForm.family,
        nomination: completeForm.nomination,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
      setStep((state) => state + 1)
    } else if (step === 2) {
      console.log(`Step: ${step}`, data)
      const newEncontrista = {
        personal: completeForm.personal,
        address: data,
        family: completeForm.family,
        nomination: completeForm.nomination,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
      setStep((state) => state + 1)
    } else if (step === 3) {
      console.log(`Step: ${step}`, data)
      const newEncontrista = {
        personal: completeForm.personal,
        address: completeForm.address,
        family: data,
        nomination: completeForm.nomination,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
      setStep((state) => state + 1)
    } else if (step === 4) {
      console.log(`Step: ${step}`, data)
      const newEncontrista = {
        personal: completeForm.personal,
        address: completeForm.address,
        family: completeForm.family,
        nomination: data,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
      setStep((state) => state + 1)
    } else if (step === 5) {
      console.log(`Step: ${step}`, data)
      const newEncontrista = {
        personal: completeForm.personal,
        address: completeForm.address,
        family: completeForm.family,
        nomination: completeForm.nomination,
        other: data,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
      createNewEncontrista(completeForm)
      setStep((state) => state + 1)
    }
  }

  function previousStep() {
    setStep((state) => state - 1)
  }

  function resetStep() {
    setStep(0)
  }

  function createNewEncontrista(data: CreateEncontristaData) {
    console.log(data)
  }

  return (
    <CreateEncontristaContext.Provider
      value={{
        step,
        completeForm,
        forwardStep,
        previousStep,
        resetStep,
        dateEJC,
      }}
    >
      {children}
    </CreateEncontristaContext.Provider>
  )
}
