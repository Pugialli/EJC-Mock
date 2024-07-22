export function getInitials(name: string) {
  const initials =
    name.split(' ').length > 1
      ? name.split(' ')[0][0] + name.split(' ')[1][0]
      : name.split(' ')[0][0]
  return initials
}
