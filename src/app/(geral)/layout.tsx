import { Header } from '@/components/Header'

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen bg-primary">
      <Header />
      {children}
    </div>
  )
}
