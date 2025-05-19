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
          <div className="flex-none w-full h-16 flex  bg-primary">
            <Label className="ml-2 text-primary-foreground">Powered by</Label>
            <Image
              className="m-1"
              src="/golem_symbol_white.png"
              alt="Golem logo"
              width={64}
              height={64}
              priority
            />
            <Label className="text-3xl font-bold text-primary-foreground ml-auto mr-8">
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
