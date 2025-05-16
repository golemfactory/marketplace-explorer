import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import type { Filters } from '@/lib/schema'
import { filterSchema } from '@/lib/schema'

interface OfferFilterDialogProps {
  isOpen: boolean
  onClose: () => void
  onFilterChange: (filters: Filters) => void
}

export function OfferFilterDialog({ isOpen, onClose, onFilterChange }: OfferFilterDialogProps) {
  const form = useForm<Filters>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      cpuCores: '' as unknown as number,
      memoryGiB: '' as unknown as number,
      storageGiB: '' as unknown as number,
      pricePerHour: '' as unknown as number,
      network: '',
      providerName: '',
    },
  })

  const onSubmit = (values: Filters) => {
    const filters = {
      cpuCores: values.cpuCores || undefined,
      memoryGiB: values.memoryGiB || undefined,
      storageGiB: values.storageGiB || undefined,
      providerName: values.providerName || undefined,
      network: values.network || undefined,
      pricePerHour: values.pricePerHour || undefined,
    }

    onFilterChange(filters)
  }

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
          <DialogTitle>Filter Offers</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="cpuCores"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPU Cores</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Minimum number of CPU cores" {...field} />
                  </FormControl>
                  <FormDescription>
                    Filter by minimum number of CPU cores. Leave empty to skip this filter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memoryGiB"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memory (GiB)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Minimum amount of memory in GiB" {...field} />
                  </FormControl>
                  <FormDescription>
                    Filter by minimum amount of memory in GiB. Leave empty to skip this filter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="storageGiB"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage (GiB)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Minimum amount of storage in GiB"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Filter by minimum amount of storage in GiB. Leave empty to skip this filter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricePerHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per hour</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Maximum price per hour in GLM" {...field} />
                  </FormControl>
                  <FormDescription>
                    Filter by maximum price per hour in GLM. Leave empty to skip this filter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                    >
                      <ToggleGroupItem value="mainnet">Mainnet</ToggleGroupItem>
                      <ToggleGroupItem value="testnet">Testnet</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>
                    Filter by network. Leave empty to skip this filter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormDescription>
                    Filter by provider name. Leave empty to skip this filter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-row justify-end">
              <Button type="submit" onClick={onClose}>
                Apply
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
