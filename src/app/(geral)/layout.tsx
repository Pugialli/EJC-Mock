import { Header } from '@/components/Header'

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <div className="from-gradient-primary to-gradient-secondary h-auto bg-gradient-to-r">
    <div className="h-auto bg-primary pb-32">
      <Header />
      {children}
    </div>
  )
}
