import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EJC NSDP',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="antialiased">
      <body className={nunito.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen bg-primary">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
