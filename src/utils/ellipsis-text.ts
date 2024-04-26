export function textEllipsis(text: string, max: number) {
  if (!text) return text

  if (text.length <= max) {
    return text
  }
  const dots = '...'

  let i = dots.length
  text = text
    .split(' ')
    .filter(function (word) {
      i += word.length
      if (i > max) {
        return false
      }
      i += 1 // add a space sharacter after a word
      return true
    })
    .join(' ')
    .replace(/(,|\n|\r\n|\.|\?|!)$/, '')

  return text + dots
}
