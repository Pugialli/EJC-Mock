export function createSlugForEncontrista(email: string, encontro: number) {
  const [username] = email.split('@')

  const slug = `${username.replace(/[^a-zA-Z0-9]+/g, '-')}-${encontro}`

  return slug
}

export function createSlugForTioExterna(email: string, encontro: number) {
  const [username] = email.split('@')

  const slug = `${username.replace(/[^a-zA-Z0-9]+/g, '-')}-ext${encontro}`

  return slug
}
