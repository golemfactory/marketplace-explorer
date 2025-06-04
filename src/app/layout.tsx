import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import Image from 'next/image'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Label } from '@/components/ui/label'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Golem Marketplace Explorer',
  description: 'Explore Golem Marketplace',
  icons: {
    icon: '/golem_symbol_white.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased flex flex-col min-h-screen overflow-auto`}
      >
        <QueryClientProvider>
          <div className="flex-none w-full h-16 flex bg-primary items-center">
            <Label className="w-11/12 text-3xl font-bold text-primary-foreground mx-auto">
              Golem Network Marketplace
            </Label>
          </div>
          <div className="flex flex-col flex-1">{children}</div>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
