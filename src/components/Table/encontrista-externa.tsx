import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'

interface EncontristaExternaProps {
  idResponsavel: string | null
  idEncontrista: string
}

function getResponsavel(idResponsavel: string) {
  console.log(idResponsavel)
  return {
    avatar_url:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg',
    nome: 'João Paulo',
  }
}


function getEquipeExterna(idResponsavel: string) {
  console.log(idResponsavel)
  return [{
    avatar_url:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg',
    nome: 'João Paulo',
  },
  {
    avatar_url:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg',
    nome: 'João Paulo',
  },
  {
    avatar_url:
      'https://res.cloudinary.com/ejc-nsdp/image/upload/people/53_bvinkk.jpg',
    nome: 'João Paulo',
  }]
}

const encontristaResponsavelSchema = z.object({
  idResponsavel: z.string(),
})

type encontristaResponsavelFormInput = z.infer<
  typeof encontristaResponsavelSchema
>

export function EncontristaExterna({
  idResponsavel,
  idEncontrista,
}: EncontristaExternaProps) {
  const responsavel = idResponsavel ? getResponsavel(idResponsavel) : null
  const form = useForm<encontristaResponsavelFormInput>({
    resolver: zodResolver(encontristaResponsavelSchema),
  })

  function changeResponsavel(selectData: encontristaResponsavelFormInput) {
    console.log(selectData.idResponsavel, idEncontrista)
  }

  return (
    <Form {...form}>
      <form
        // onSubmit={handleSubmit(handleFilter)}
        onChange={form.handleSubmit(changeResponsavel)}
        className="flex  items-center gap-2"
      >
        <FormField
          control={form.control}
          name="idResponsavel"
          // defaultValue={status}
          render={({ field }) => {
            return (
              <div className="w-full">
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="houtline-none text-xs">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusData.map((statusItem) => {
                        return (
                          <SelectItemAvatar
                            key={statusItem.value}
                            color={statusItem.color}
                            icon={statusItem.icon}
                            label={statusItem.label}
                            value={statusItem.value}
                          />
                        )
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
            )
          }}
        />
      </form>
      {/* <div className="flex items-center gap-2">
      {responsavel ? (
        <>
          <Avatar className="h-9 w-9">
            <AvatarImage src={responsavel.avatar_url} />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground font-medium">
            {responsavel.nome}
          </span>
        </>
      ) : (
        <>
          <Avatar className="h-9 w-9">
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground font-medium">Teste</span>
        </>
      )}
    </div>
 */}
    </Form>
  )
}
