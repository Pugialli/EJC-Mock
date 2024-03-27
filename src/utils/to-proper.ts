export function toProper(string: string) {
  return string.substring(0, 1).toUpperCase().concat(string.substring(1))
}
