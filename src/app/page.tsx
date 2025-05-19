import { OffersTable } from '@/components/offers-table'
import { DatabaseIcon, GlobeIcon, FileIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="w-11/12 flex-1 flex-col flex mx-auto font-[family-name:var(--font-geist-sans)] font-bold">
      <main className="flex-1">
        <div className="mt-16">
          <OffersTable />
        </div>
      </main>
      <footer className="flex flex-row items-center justify-center my-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2"
          href="https://golem-base.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DatabaseIcon />
          Golem Base
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2"
          href="https://www.golem.network"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlobeIcon />
          Golem Network
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2"
          href="https://docs.golem.network"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileIcon />
          Golem Docs
        </a>
      </footer>
    </div>
  )
}
