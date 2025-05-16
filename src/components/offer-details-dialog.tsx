import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import type { Offer } from '@/lib/schema'

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
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>{offer?.properties.golem.node.id.name}</DialogTitle>
          <DialogDescription>
            Node ID: {offer?.offerId} <Button variant="link">Copy</Button>
          </DialogDescription>
          <Label>Available on: {getNetworks(offer)}</Label>
        </DialogHeader>

        <section>
          <h3>Hardware</h3>
          <p>
            CPU: {offer?.properties.golem.inf.cpu.cores} cores /{' '}
            {offer?.properties.golem.inf.cpu.threads} threads
          </p>
          <p>Memory: {offer?.properties.golem.inf.mem.gib} GiB</p>
          <p>Storage: {offer?.properties.golem.inf.storage.gib} GiB</p>
        </section>

        <section>
          <h3>Pricing</h3>
          <p>CPU/hour: {offer?.properties.golem.com.pricing.model.linear.cpuPerHour} GLM</p>
          <p>Env/hour: {offer?.properties.golem.com.pricing.model.linear.envPerHour} GLM</p>
          <p>Start price: {offer?.properties.golem.com.pricing.model.linear.initialPrice} GLM</p>
        </section>

        <section>
          <h3>Payment</h3>
          <p>Accepted Networks: {getAcceptedNetworks(offer)}</p>
          {/* <p>
            Wallet Address: {offer?.properties.golem.com.payment.platform['mainnet'].address}{' '}
            <Button variant="link">Copy</Button>
          </p> */}
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

function getNetworks(offer?: Offer): string {
  if (!offer) {
    return ''
  }
  // Logic to determine which networks the offer is available on
  return 'mainnet, testnet' // Example placeholder
}

function getAcceptedNetworks(offer?: Offer): string {
  if (!offer) {
    return ''
  }
  // Logic to determine which networks are accepted for payment
  return 'mainnet, testnet' // Example placeholder
}
