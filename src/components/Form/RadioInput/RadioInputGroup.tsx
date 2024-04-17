import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { RadioGroup } from '../../ui/radio-group'

export interface RadioInputGroupProps {
  label: string
  description?: string
  defaultValue?: string
  children: React.ReactNode
  onChange: () => void
}

export function RadioInputGroup({
  label,
  description,
  defaultValue = '',
  children,
  onChange,
}: RadioInputGroupProps) {
  return (
    <FormItem>
      <label className="w-full space-y-3">
        <div>
          <FormLabel className="text-zinc-700">{label}</FormLabel>
          {description && (
            <FormDescription className="mt-1 text-xs text-zinc-500">
              {description}
            </FormDescription>
          )}
        </div>
        <FormControl>
          <RadioGroup
            onValueChange={onChange}
            defaultValue={defaultValue}
            className="flex flex-col space-y-1"
          >
            {children}
          </RadioGroup>
        </FormControl>
      </label>
      <FormMessage />
    </FormItem>
  )
}
