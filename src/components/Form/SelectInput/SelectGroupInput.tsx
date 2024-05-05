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
  label?: string
  value: string | undefined
  description?: string
  placeholder?: string
  children: React.ReactNode
  disabled?: boolean
  onChange: () => void
}

export function SelectGroupInput({
  label,
  value,
  description,
  placeholder = '',
  children,
  disabled = false,
  onChange,
}: SelectGroupInputProps) {
  return (
    <FormItem>
      <label>
        {label && <FormLabel>{label}</FormLabel>}
        <Select disabled={disabled} onValueChange={onChange} value={value}>
          <FormControl>
            <SelectTrigger className="houtline-none">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>{children}</SelectContent>
        </Select>
        {description && <FormDescription>{description}</FormDescription>}
      </label>
      <FormMessage />
    </FormItem>
  )
}
