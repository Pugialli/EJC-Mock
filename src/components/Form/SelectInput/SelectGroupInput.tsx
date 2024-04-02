import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

export interface SelectGroupInputProps {
  label: string
  value: string | undefined
  description?: string
  placeholder?: string
  children: React.ReactNode
  onChange: () => void
}

export function SelectGroupInput({
  label,
  value,
  description,
  placeholder = '',
  children,
  onChange,
}: SelectGroupInputProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger className="outline-none">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>{children}</SelectContent>
      </Select>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
