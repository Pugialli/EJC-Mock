import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon, Search } from 'lucide-react'
import { forwardRef, useState } from 'react'

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  hidable?: boolean
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ prefix, className, type, hidable = false, ...props }, ref) => {
    const [isHidden, setIsHidden] = useState(hidable)

    function toggleHidden() {
      setIsHidden((state) => !state)
    }
    return (
      <div
        aria-invalid={props['aria-invalid']}
        aria-disabled={props.readOnly || props.disabled}
        className={cn(
          'flex w-full items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400',
          'aria-invalid:border-red-400 ',
          'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
          // 'focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-zinc-100',
          'dark:border-zinc-700 dark:bg-zinc-800',
          'dark:focus-within:border-zinc-500 dark:focus-within:ring-amber-500/20',
        )}
      >
        <Search className="h-6 w-6 text-zinc-500" />
        {prefix && <span className="text-zinc-400">{prefix}</span>}
        <input
          type={isHidden ? 'password' : type}
          className={cn(
            'flex-1 border-0 bg-transparent p-0 text-zinc-700 placeholder-zinc-400 outline-none',
            'dark:text-zinc-100 dark:placeholder-zinc-400',
            'read-only:cursor-not-allowed',
            'disabled:cursor-not-allowed',
            className,
          )}
          ref={ref}
          {...props}
        />
        {hidable && (
          <button type="button" onClick={toggleHidden}>
            {isHidden ? (
              <EyeOffIcon className="text-zinc-500" />
            ) : (
              <EyeIcon className="text-zinc-500" />
            )}
          </button>
        )}
      </div>
    )
  },
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }
