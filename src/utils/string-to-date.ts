export function stringToDate(string: string) {
  const correctedString =
    string.split('/')[1] +
    '/' +
    string.split('/')[0] +
    '/' +
    string.split('/')[2]

  const date = new Date(correctedString)

  return date
}

export function dateToString(dateString: Date) {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}
