import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Externa | EJC NSDP',
  description: '',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <h1>Sidebar</h1>
      {children}
    </div>
  )
}
