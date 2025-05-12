import { columns, type Offer, OffersTable } from '@/components/offers-table'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useOffersQuery } from '@/lib/query'

async function getData(): Promise<Offer[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ]
}
export default async function Home() {
  const data = await getData()

  return (
    <div className="w-11/12 flex-1 flex-col flex mx-auto font-[family-name:var(--font-geist-sans)] font-bold">
      <main className="flex-1">
        <div className="mt-16">
          <div className="flex flex-1 justify-end">
            <Button variant="outline" className="rounded-md bg-primary text-primary-foreground">
              Filter
            </Button>
          </div>
          <OffersTable columns={columns} data={data} />
        </div>
      </main>
      <footer className="flex flex-row items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
