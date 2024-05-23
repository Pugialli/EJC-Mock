import type { MembroExterna } from '@/app/api/encontro/[numeroEncontro]/externa/get-equipe-externa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { SelectItem } from '../ui/select'

export type SelectItemAvatarProps = MembroExterna

export function SelectItemAvatar({
  id,
  name,
  avatarUrl,
  avatarFallback,
}: SelectItemAvatarProps) {
  return (
    <SelectItem value={id} className="hover:bg-violet-100">
      <div className="flex w-full items-center gap-2 pr-2">
        <Avatar className="h-4 w-4">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-zinc-300">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-nowrap text-tertiary">{name}</span>
      </div>
    </SelectItem>
  )
}
