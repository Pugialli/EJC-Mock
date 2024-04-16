import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroupItem } from '@/components/ui/radio-group'

export interface RadioInputItemProps {
  value: string
  label: string
}
export function RadioInputItem({ value, label }: RadioInputItemProps) {
  return (
    <FormItem className="flex items-center space-x-2 space-y-0">
      <label>
        <FormControl>
          <RadioGroupItem value={value} />
        </FormControl>
        <FormLabel className="font-normal">{label}</FormLabel>
      </label>
    </FormItem>
  )
}
