import { SelectGroupInput } from '@/components/Form/SelectInput/SelectGroupInput'
import {
  SelectItem,
  type SelectArray,
} from '@/components/Form/SelectInput/SelectItem'
import { TwoRowInput } from '@/components/TwoRowInput'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { getSelectTios } from '@/utils/fetch-tios-circulo'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

interface CirculoFormProps {
  label: string
  idCirculo: string
}

export function CirculoForm({ label, idCirculo }: CirculoFormProps) {
  const form = useFormContext()

  const { data: religioes } = useQuery<SelectArray[]>({
    queryFn: async () => await getSelectTios(),
    queryKey: ['tiosCirculo'],
  })

  const { control, watch, setValue } = form

  const disableTios = watch(`${idCirculo}.active`) === false

  useEffect(() => {
    if (disableTios) {
      setValue(`${idCirculo}.tioAparente`, '')
      setValue(`${idCirculo}.tioSecreto`, '')
    }
  }, [disableTios, setValue, idCirculo])

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xl font-bold lg:text-nowrap">{label}</span>
        <FormField
          control={form.control}
          name={`${idCirculo}.active`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              {/* <FormLabel>desativar</FormLabel> */}
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <TwoRowInput>
          <FormField
            control={control}
            name={`${idCirculo}.tioAparente`}
            render={({ field }) => {
              return (
                <SelectGroupInput
                  label="Tio Aparente"
                  onChange={field.onChange}
                  value={field.value}
                  disabled={disableTios}
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
        </TwoRowInput>
        <TwoRowInput>
          <FormField
            control={control}
            name={`${idCirculo}.tioSecreto`}
            disabled={disableTios}
            render={({ field }) => {
              return (
                <SelectGroupInput
                  label="Tio Secreto"
                  onChange={field.onChange}
                  value={field.value}
                  disabled={disableTios}
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
        </TwoRowInput>
      </div>
    </>
  )
}
