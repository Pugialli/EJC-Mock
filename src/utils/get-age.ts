export function getAge(dataNascimento: Date) {
  const hoje = new Date()

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
