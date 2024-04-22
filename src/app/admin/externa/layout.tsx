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
    <div className="bg-zinc-50 lg:grid lg:grid-cols-12">
      <div className="bg-blue-600 lg:col-span-3">
        <Sidebar />
      </div>
      <main className="bg-zinc-100 pb-8 pl-4 pr-8 pt-12 lg:col-span-9 lg:col-start-4">
        {children}
      </main>
    </div>
  )
}
