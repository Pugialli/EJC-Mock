export function dividirEmParagrafos(texto: string): string[] {
  // Divida o texto com base em quebras de linha
  const paragrafos = texto.split(/\n+/)

  // Remova parágrafos vazios
  const paragrafosFiltrados = paragrafos.filter(
    (paragrafo) => paragrafo.trim() !== '',
  )

  return paragrafosFiltrados
}
