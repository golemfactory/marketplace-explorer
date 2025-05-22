import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { copyToClipboard } from '@/lib/utils'
import { Copy } from 'lucide-react'
import { Label } from '@/components/ui/label'
import type { Offer } from '@/lib/schema'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import {
  BanknoteIcon,
  MonitorIcon,
  Tv2Icon,
  CpuIcon,
  MemoryStick,
  DatabaseIcon,
} from 'lucide-react'

interface OfferDetailsDialogProps {
  offer?: Offer
  isOpen: boolean
  onClose: () => void
}

export function OfferDetailsDialog({ offer, isOpen, onClose }: OfferDetailsDialogProps) {
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
      open={isOpen}
    >
      <DialogContent className="flex flex-col overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {offer?.properties.golem.node.id.name}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <section className="flex flex-row items-center gap-2">
              <Label>Available on: </Label>
              {offer?.testNetwork && <Badge>testnet</Badge>}
              {offer?.mainNetwork && <Badge>mainnet</Badge>}
            </section>
          </DialogDescription>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <span className="mr-2">Node ID:</span>
              <span className="flex-1 truncate truncate-ellipsis">{offer?.providerId}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  copyToClipboard(offer?.providerId || '')
                  toast('Node ID copied to clipboard')
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-row justify-between items-center">
              <span className="mr-2">Offer ID:</span>
              <span className="flex-1 truncate truncate-ellipsis">{offer?.offerId}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  copyToClipboard(offer?.offerId || '')
                  toast('Offer ID copied to clipboard')
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Separator />
        <section>
          <h3 className="font-bold border border-primary rounded-xl p-2">Hardware</h3>
          <div className="p-2 flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <CpuIcon className="basis-none" />
              <Label className="basis-1/6">CPU cores:</Label>
              <p className="flex-1">{offer?.properties.golem.inf.cpu.threads}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MemoryStick className="basis-none" />
              <Label className="basis-1/6">Memory:</Label>
              <p className="flex-1">{offer?.properties.golem.inf.mem.gib.toFixed(2)} GiB</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <DatabaseIcon className="basis-none" />
              <Label className="basis-1/6">Storage:</Label>
              <p className="flex-1">{offer?.properties.golem.inf.storage.gib.toFixed(2)} GiB</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Tv2Icon className="basis-none" />
              <Label className="basis-1/6">Runtime:</Label>
              <Badge>{offer?.properties.golem.runtime.name}</Badge>
            </div>
          </div>
        </section>

        <Separator />
        <section>
          <h3 className="font-bold border border-primary rounded-xl p-2">Pricing</h3>
          <div className="p-2 flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <CpuIcon className="basis-none" />
              <Label className="basis-1/6">CPU/hour:</Label>
              <p className="flex-1">
                {offer?.properties.golem.com.pricing.model.linear.cpuPerHour.toFixed(2)} GLM
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MonitorIcon className="basis-none" />
              <Label className="basis-1/6">Env/hour:</Label>
              <p className="flex-1">
                {offer?.properties.golem.com.pricing.model.linear.envPerHour.toFixed(2)} GLM
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <BanknoteIcon className="basis-none" />
              <Label className="basis-1/6">Start price:</Label>
              <p className="flex-1">
                {offer?.properties.golem.com.pricing.model.linear.initialPrice.toFixed(2)} GLM
              </p>
            </div>
          </div>
        </section>

        <DialogFooter className="flex flex-row justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
