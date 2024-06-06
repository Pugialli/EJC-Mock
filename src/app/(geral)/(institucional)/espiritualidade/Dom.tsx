export interface DomProps {
  title: string
  content: string
}

export function Dom({ title, content }: DomProps) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-bold lg:text-2xl">{title}</h4>
      <p className="text-base lg:text-xl">{content}</p>
    </div>
  )
}
