import type { Metadata } from 'next'
import { Header } from '../(sectionComponents)/Header'

export const metadata: Metadata = {
  title: 'Montagem | EJC NSDP',
  description: '',
}

export default function RestrictedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="z-50 h-screen w-auto bg-primary">
      <Header />
      <main className="z-40 flex h-auto items-center justify-center bg-primary">
        {children}
      </main>
    </div>
  )
}
