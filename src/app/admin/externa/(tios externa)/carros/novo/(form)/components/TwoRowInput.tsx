import type { ReactNode } from 'react'

interface TwoRowInputProps {
  children: ReactNode
}

export function TwoRowInput({ children }: TwoRowInputProps) {
  return <div className="col-span-1">{children}</div>
}
