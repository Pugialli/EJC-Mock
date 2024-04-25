'use client'

import { CreateEncontristaData } from '@/app/api/encontrista/route'
import { api } from '@/lib/axios'
import { ReactNode, createContext, useState } from 'react'

export interface PersonalFormData {
  nome: string
  sobrenome: string
  dataNascimento: string
  paraVoce: 'sim' | 'nao'
  celular: string
  email: string
  apelido?: string | undefined
  religiao:
    | 'catolica'
    | 'evangelica'
    | 'espirita'
    | 'matriz_africana'
    | 'judaica'
    | 'nao_tenho'
    | 'outra'
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
  bairroDuranteOEncontro?: string
}

export interface FamilyFormData {
  moraCom: 'sozinho' | 'conjuge' | 'familiar'
  statusPais: 'sim' | 'nao' | 'na'
  nomeFamiliar: string
  telFamiliar: string
  parentescoFamiliar: string
  nomeFamiliar2?: string
  telFamiliar2?: string
  parentescoFamiliar2?: string
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

interface EncontristaContextType {
  completeForm: CreateEncontristaData
  userCreated: 'not sent' | 'created' | 'error'
  updateData: ({ data, step }: FormData) => void
  clearForm: () => void
  createNewEncontrista: () => void
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
    statusPais: 'nao',
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

  const [userCreated, setUserCreated] = useState<
    'not sent' | 'created' | 'error'
  >('not sent')

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
    }
  }

  async function createNewEncontrista() {
    await api
      .post('/encontrista', completeForm)
      .then(() => setUserCreated('created'))
      .catch(() => setUserCreated('error'))
  }

  const clearForm = () => {
    setCompleteForm({ ...initialState })
  }

  return (
    <CreateEncontristaContext.Provider
      value={{
        completeForm,
        userCreated,
        updateData,
        clearForm,
        createNewEncontrista,
      }}
    >
      {children}
    </CreateEncontristaContext.Provider>
  )
}
