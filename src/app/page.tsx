import { OffersTable } from '@/components/offers-table'
import { Separator } from '@/components/ui/separator'
import { GlobeIcon, FileIcon } from 'lucide-react'
import { DiscordOutlined, XOutlined } from '@ant-design/icons'
import MarketplaceInfo from '@/components/marketplace-info'

export default function Home() {
  return (
    <div className="w-11/12 flex-1 flex-col flex mx-auto font-[family-name:var(--font-geist-sans)] font-bold">
      <main className="flex-1 mb-2">
        <MarketplaceInfo />
        <div className="mt-8">
          <OffersTable />
        </div>
      </main>
      <Separator />
      <footer className="flex flex-row my-6">
        <div className="flex flex-none">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2 text-2xl"
            href="https://x.com/golemproject"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XOutlined />
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2 text-2xl"
            href="https://discord.com/invite/golem"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordOutlined />
          </a>
        </div>
        <div className="flex flex-grow justify-end">
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
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 mx-2"
            href="https://golem-base.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Golem Base | 2025
          </a>
        </div>
      </footer>
    </div>
  )
}
