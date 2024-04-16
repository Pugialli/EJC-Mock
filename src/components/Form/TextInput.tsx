import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'

export interface TextInputProps {
  label: string
  children: React.ReactNode
}

export function TextInput({ label, children }: TextInputProps) {
  return (
    <FormItem>
      <label>
        <FormLabel className="font-medium">{label}</FormLabel>
        <FormControl>{children}</FormControl>
      </label>
      <FormMessage />
    </FormItem>
  )
}
