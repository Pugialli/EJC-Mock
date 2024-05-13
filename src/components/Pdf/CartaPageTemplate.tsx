interface CartaPageTemplate {
  de: string
  para: string
  conteudo: string
}

export function CartaPageTemplate({ de, para, conteudo }: CartaPageTemplate) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <h1>{para}</h1>
        <span>,</span>
      </div>
      <div className="whitespace-pre-line">{conteudo}</div>
      <span>{de}</span>
    </div>
  )
}
