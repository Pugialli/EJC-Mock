import { ReactNode, createContext, useState } from 'react'

export interface PersonalFormData {
  nome: string
  sobrenome: string
  dataNascimento: string
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
  step: number
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
  completeForm: CreateEncontristaData
  updateData: ({ data, step }: FormData) => void
  clearForm: () => void
}

export const CreateEncontristaContext = createContext(
  {} as EncontristaContextType,
)

interface CreateEncontristaContextProviderProps {
  children: ReactNode
}

const initialState = {
  personal: {
    nome: '',
    sobrenome: '',
    dataNascimento: '',
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
} as CreateEncontristaData

export function CreateEncontristaContextProvider({
  children,
}: CreateEncontristaContextProviderProps) {
  const [completeForm, setCompleteForm] =
    useState<CreateEncontristaData>(initialState)

  function updateData({ data, step }: FormData) {
    if (step === 1) {
      const newEncontrista = {
        personal: data,
        address: completeForm.address,
        family: completeForm.family,
        nomination: completeForm.nomination,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
    } else if (step === 2) {
      const newEncontrista = {
        personal: completeForm.personal,
        address: data,
        family: completeForm.family,
        nomination: completeForm.nomination,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
    } else if (step === 3) {
      const newEncontrista = {
        personal: completeForm.personal,
        address: completeForm.address,
        family: data,
        nomination: completeForm.nomination,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
    } else if (step === 4) {
      const newEncontrista = {
        personal: completeForm.personal,
        address: completeForm.address,
        family: completeForm.family,
        nomination: data,
        other: completeForm.other,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
    } else if (step === 5) {
      const newEncontrista = {
        personal: completeForm.personal,
        address: completeForm.address,
        family: completeForm.family,
        nomination: completeForm.nomination,
        other: data,
      } as CreateEncontristaData
      setCompleteForm(newEncontrista)
      createNewEncontrista(completeForm)
    }
  }

  function createNewEncontrista(data: CreateEncontristaData) {
    console.log(data)
  }

  const clearForm = () => {
    setCompleteForm({ ...initialState })
  }

  return (
    <CreateEncontristaContext.Provider
      value={{
        completeForm,
        updateData,
        clearForm,
      }}
    >
      {children}
    </CreateEncontristaContext.Provider>
  )
}
