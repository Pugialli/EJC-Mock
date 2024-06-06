import { Footer } from '@/components/Footer'

export default function InstitucionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="bg-violet-50">
        <div className="h-56 bg-primary lg:h-institucional" />
        <div className="px-4 py-8 lg:py-32">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
