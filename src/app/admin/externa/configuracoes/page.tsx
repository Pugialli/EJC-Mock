import EditEncontroForm from './EditEncontroForm'

export default function ConfiguracoesEncontro() {
  return (
    <div className="h-full w-full">
      <div className="pb-4">
        <div className="flex items-center justify-between gap-8 pb-8">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-tertiary">
              Configurações do Encontrão
            </h1>
            <span className="text-base font-normal text-zinc-500">
              Organize quem serão os tios e qual a ordem dos círculos
            </span>
          </div>
        </div>
      </div>
      <EditEncontroForm />
    </div>
  )
}
