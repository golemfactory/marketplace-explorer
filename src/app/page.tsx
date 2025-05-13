import { OffersTable } from '@/components/offers-table'
import Image from 'next/image'

export default async function Home() {
  return (
    <div className="w-11/12 flex-1 flex-col flex mx-auto font-[family-name:var(--font-geist-sans)] font-bold">
      <main className="flex-1">
        <div className="mt-16">
          <OffersTable />
        </div>
      </main>
      <footer className="flex flex-row items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2"
          href="https://golem-base.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Golem Base
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2"
          href="https://www.golem.network"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Golem Network
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2"
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
