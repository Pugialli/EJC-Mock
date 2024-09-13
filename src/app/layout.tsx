import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import ReactQueryProvider from '@/lib/providers/ReactQueryProvider'
import NextAuthSessionProvider from '@/lib/providers/SessionProvider'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EJC NSDP',
  description:
    'Site do Encontro de Jovens da Paróquia Nossa Senhora da Divina Providência no Jardim Botânico (RJ',
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/favicon.ico'],
    shortcut: ['/favicon.ico'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // eslint-disable-next-line prettier/prettier
    <html lang="pt-br" className="antialiased" suppressHydrationWarning>
      <body className={nunito.className}>
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster richColors closeButton />
            </ReactQueryProvider>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
