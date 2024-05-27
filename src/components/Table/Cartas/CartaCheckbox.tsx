import type { CartaSummary } from '@/app/api/carta/get-cartas-sumary'
import type { updateCartaVirtualRouteProps } from '@/app/api/carta/update-carta-virtual/route'
import { Checkbox } from '@/components/ui/checkbox'
import { api } from '@/lib/axios'
import type { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface CartaCheckbox extends CheckboxProps {
  id: string
  slug: string
  status: boolean
}

export async function changeCartaStatus({
  id,
  cartaStatus,
}: updateCartaVirtualRouteProps) {
  // await new Promise((resolve) => setTimeout(resolve, Math.random() * 10000))

  // console.log(`Alterar: ${cartaId} -> ${cartaStatus}`)
  return await api.patch('/carta/update-carta-virtual/', {
    id,
    cartaStatus,
  })
}

export function CartaCheckbox({ id, status, slug, ...props }: CartaCheckbox) {
  const [check, setCheck] = useState(status)

  const queryClient = useQueryClient()

  function updateCartasVirtualOnCache(cartaStatus: boolean) {
    const encontristaCartaSumaryListCache =
      queryClient.getQueriesData<CartaSummary>({
        queryKey: ['cartasSumary'],
      })

    queryClient.fetchQuery({
      queryKey: ['carta', { slug }],
    })

    const difCartasVirtuais = cartaStatus ? 1 : -1

    encontristaCartaSumaryListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<CartaSummary>(cacheKey, {
        ...cacheData,
        encontristas: cacheData.encontristas.map((encontrista) => {
          if (encontrista.slug === slug) {
            return {
              ...encontrista,
              cartasVirtuaisImpressas:
                encontrista.cartasVirtuaisImpressas + difCartasVirtuais,
            }
          }
          return encontrista
        }),
      })
    })
  }

  const { mutateAsync: cartaEncontristaFn } = useMutation({
    mutationFn: changeCartaStatus,
    onSuccess: (_, { cartaStatus }) => {
      updateCartasVirtualOnCache(cartaStatus)
    },
  })

  function handleUpdateCartasVirtuais(checked: boolean) {
    cartaEncontristaFn({
      id,
      cartaStatus: checked,
    })
  }

  async function updateCartaStatus(checked: CheckedState) {
    if (checked !== 'indeterminate') {
      setCheck(checked)
      handleUpdateCartasVirtuais(checked)
    }
  }

  return (
    <Checkbox
      id={id}
      onCheckedChange={updateCartaStatus}
      checked={check}
      {...props}
    />
  )
}
