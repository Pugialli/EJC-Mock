'use client'

import type { CreateCarroProps } from '@/app/api/carro/create-carro'
import { api } from '@/lib/axios'
import { ReactNode, createContext, useState } from 'react'

export interface CarFormData {
  modeloCarro: string
  placaCarro: string
  lugaresCarro: number
  observacaoExterna: string
  numeroEncontro: number
}

export interface PersonFormData {
  id: string
  nome: string
  sobrenome: string
  celular: string
  telefone?: string
  email: string
  enderecoCep: string
  bairro: string
  cidade: string
  estado: string
  rua: string
  enderecoNumero: number
  apelido?: string
  observacaoMotorista: string
}

interface FormData {
  step: number
  data: CarFormData | PersonFormData | undefined
}

interface CarContextType {
  completeForm: CreateCarroProps
  carCreated: 'not sent' | 'created' | 'error' | 'sending'
  updateData: ({ data, step }: FormData) => Promise<void>
  clearForm: () => void
  createNewCarro: () => void
}

export const NewCarContext = createContext({} as CarContextType)

interface NewCarContextProviderProps {
  children: ReactNode
}

const initialState = {
  carro: {
    placaCarro: '',
    lugaresCarro: 3,
    modeloCarro: '',
    observacaoExterna: '',
    numeroEncontro: 1,
  },
  motorista: {
    id: '0',
    nome: '',
    sobrenome: '',
    celular: '',
    email: '',
    enderecoCep: '',
    enderecoNumero: 0,
    bairro: '',
    cidade: '',
    estado: '',
    rua: '',
    apelido: '',
    telefone: '',
    observacaoMotorista: '',
  },

  carona: {
    id: '0',
    nome: '',
    sobrenome: '',
    celular: '',
    email: '',
    enderecoCep: '',
    enderecoNumero: 0,
    bairro: '',
    cidade: '',
    estado: '',
    rua: '',
    apelido: '',
    telefone: '',
    observacaoMotorista: '',
  },
} as CreateCarroProps

export function NewCarContextProvider({
  children,
}: NewCarContextProviderProps) {
  const [completeForm, setCompleteForm] =
    useState<CreateCarroProps>(initialState)

  const [carCreated, setCarCreated] = useState<
    'not sent' | 'created' | 'error' | 'sending'
  >('not sent')

  async function updateData({ data, step }: FormData) {
    if (step === 0) {
      const newCar = {
        carro: data,
        motorista: completeForm.motorista,
        carona: completeForm.carona,
      } as CreateCarroProps
      setCompleteForm(newCar)
    } else if (step === 1) {
      const newCar = {
        carro: completeForm.carro,
        motorista: data,
        carona: completeForm.carona,
      } as CreateCarroProps
      setCompleteForm(newCar)
    } else if (step === 2) {
      const newCar = {
        carro: completeForm.carro,
        motorista: completeForm.motorista,
        carona: data,
      } as CreateCarroProps
      setCompleteForm(newCar)
    }
  }

  async function createNewCarro() {
    if (completeForm.carro.placaCarro === initialState.carro.placaCarro) {
      return
    }
    if (carCreated === 'not sent') {
      setCarCreated('sending')
      await api
        .post('carro', completeForm)
        .then(() => setCarCreated('created'))
        .catch(() => setCarCreated('error'))
    }
  }

  const clearForm = () => {
    setCompleteForm({ ...initialState })
    setCarCreated('not sent')
  }

  return (
    <NewCarContext.Provider
      value={{
        completeForm,
        carCreated,
        updateData,
        clearForm,
        createNewCarro,
      }}
    >
      {children}
    </NewCarContext.Provider>
  )
}
