import { Sidebar } from '@/components/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Externa | EJC NSDP',
  description: '',
}

export default function ExternaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-zinc-50 lg:grid lg:grid-cols-4">
      <Sidebar />
      <main className="py-3 pr-3 lg:col-span-3 lg:col-start-2">{children}</main>
    </div>
  )
}
