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
