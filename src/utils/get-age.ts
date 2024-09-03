export function getAge(nascimento: Date) {
  const hoje = new Date()

  const dataNascimento = new Date(nascimento)

  let idade = hoje.getFullYear() - dataNascimento.getFullYear()
  const mesAtual = hoje.getMonth()
  const mesNascimento = dataNascimento.getMonth()

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())
  ) {
    idade--
  }

  return idade
}
