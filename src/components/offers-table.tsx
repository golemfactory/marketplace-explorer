'use client'

import {
  type ColumnDef,
  type Header,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { Filters, Offer } from '@/lib/schema'
import { useOffersQuery } from '@/lib/query'
import { Button } from '@/components/ui/button'
import {
  FilterIcon,
  CpuIcon,
  MemoryStick,
  DatabaseIcon,
  Banknote,
  NetworkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUpDownIcon,
} from 'lucide-react'
import { useState } from 'react'
import { OfferDetailsDialog } from './offer-details-dialog'
import { OfferFilterDialog } from './offer-filter-dialog'
import { RefreshBtn } from './refresh-btn'

const cellContent = (value: string, icon: React.ReactNode) => {
  return (
    <div className="flex flex-row items-center">
      <div className="m-2">{icon}</div>
      <div>{value}</div>
    </div>
  )
}

const columnCellContent = (header: Header<Offer, unknown>) => {
  return (
    <div className="flex items-center gap-2">
      {flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanSort() ? (
        <Button
          variant="default"
          size="icon"
          onClick={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
        >
          {header.column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon />
          ) : header.column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon />
          ) : (
            <ArrowUpDownIcon />
          )}
        </Button>
      ) : null}
    </div>
  )
}

const columns: ColumnDef<Offer>[] = [
  {
    id: 'providerName',
    accessorFn: (offer) => offer.properties.golem.node.id.name,
    header: 'Provider',
    enableColumnFilter: true,
    enableSorting: false,
    filterFn: (row, _id, value) => {
      return row.original.properties.golem.node.id.name.includes(value)
    },
  },
  {
    id: 'cpuCores',
    accessorFn: (offer) => offer.properties.golem.inf.cpu.cores,
    cell: (info) => cellContent(info.getValue() as string, <CpuIcon />),
    header: 'Cores',
    enableColumnFilter: true,
    filterFn: (row, _id, value) => {
      return row.original.properties.golem.inf.cpu.cores >= value
    },
    enableSorting: true,
  },
  {
    id: 'memoryGiB',
    accessorFn: (offer) => offer.properties.golem.inf.mem.gib.toFixed(2),
    cell: (info) => cellContent(info.getValue() as string, <MemoryStick />),
    header: 'Memory (GiB)',
    enableColumnFilter: true,
    filterFn: (row, _id, value) => {
      return row.original.properties.golem.inf.mem.gib >= value
    },
    enableSorting: true,
  },
  {
    id: 'storageGiB',
    accessorFn: (offer) => offer.properties.golem.inf.storage.gib.toFixed(2),
    cell: (info) => cellContent(info.getValue() as string, <DatabaseIcon />),
    header: 'Storage (GiB)',
    enableColumnFilter: true,
    filterFn: (row, _id, value) => {
      return row.original.properties.golem.inf.storage.gib >= value
    },
    enableSorting: true,
  },
  {
    id: 'network',
    accessorFn: (offer) =>
      `${offer.mainNetwork && offer.testNetwork ? 'Mainnet/Testnet' : offer.mainNetwork ? 'Mainnet' : 'Testnet'}`,
    cell: (info) => cellContent(info.getValue() as string, <NetworkIcon />),
    header: 'Network',
    enableColumnFilter: true,
    enableSorting: false,
    filterFn: (row, _id, value) => {
      return (
        (value === 'mainnet' && row.original.mainNetwork) ||
        (value === 'testnet' && row.original.testNetwork)
      )
    },
  },
  {
    id: 'pricePerHour',
    accessorFn: (offer) => {
      const pricePerHour =
        offer.properties.golem.com.pricing.model.linear.cpuPerHour +
        offer.properties.golem.com.pricing.model.linear.envPerHour
      return `${pricePerHour.toFixed(2)} GLM/h`
    },
    cell: (info) => cellContent(info.getValue() as string, <Banknote />),
    header: 'Price',
    enableColumnFilter: true,
    filterFn: (row, _id, value) => {
      return (
        row.original.properties.golem.com.pricing.model.linear.cpuPerHour +
          row.original.properties.golem.com.pricing.model.linear.envPerHour <=
        value
      )
    },
    enableSorting: true,
  },
]

const pageSize = 10

export function OffersTable() {
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [refetchInterval, setRefetchInterval] = useState<number | undefined>(undefined)
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined)
  const { data: offers, isRefetching, refetch } = useOffersQuery(refetchInterval)

  const table = useReactTable({
    data: offers ?? [],
    columns,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const onOfferClick = (offer: Offer) => {
    console.log('Offer clicked', offer)
    setSelectedOffer(offer)
    setShowDetailsModal(true)
  }

  const onFilterChange = (filters: Filters) => {
    console.log('New filters:', filters)
    table.setColumnFilters([
      {
        id: 'cpuCores',
        value: filters.cpuCores,
      },
      {
        id: 'memoryGiB',
        value: filters.memoryGiB,
      },
      {
        id: 'storageGiB',
        value: filters.storageGiB,
      },
      {
        id: 'network',
        value: filters.network,
      },
      {
        id: 'pricePerHour',
        value: filters.pricePerHour,
      },
      {
        id: 'providerName',
        value: filters.providerName,
      },
    ])
  }

  return (
    <div>
      <div className="flex flex-row flex-1 justify-between">
        <div className="text-2xl font-bold flex-1">
          {table.getFilteredRowModel().rows.length} active offers
        </div>
        <div className="flex flex-row-reverse flex-1 gap-2">
          <RefreshBtn
            isRefetching={isRefetching}
            refetchData={refetch}
            onIntervalChange={setRefetchInterval}
          />
          <Button variant="default" className="rounded-md" onClick={() => setShowFilterModal(true)}>
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      <Table className="border-separate border-spacing-y-4 text-lg font-bold w-full">
        <TableHeader className="bg-primary h-12">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} style={{ backgroundColor: 'var(--primary)' }}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-primary-foreground px-4">
                    {header.isPlaceholder ? null : columnCellContent(header)}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="bg-secondary hover:bg-primary/20"
                onClick={() => onOfferClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="select-none">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getPageCount() > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="select-none text-md"
                onClick={() => table.previousPage()}
                isActive={table.getCanPreviousPage()}
                style={{
                  pointerEvents: table.getCanPreviousPage() ? 'auto' : 'none',
                  opacity: table.getCanPreviousPage() ? 1 : 0.5,
                }}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, index) => {
              const pageIndex = table.getState().pagination.pageIndex
              const pageCount = table.getPageCount()
              const start = Math.max(0, Math.min(pageIndex - 2, pageCount - 5))
              const pageNumber = start + index

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(pageNumber)}
                    isActive={pageNumber === pageIndex}
                    className="select-none"
                  >
                    {pageNumber + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            {table.getPageCount() > 5 &&
              table.getPageCount() > table.getState().pagination.pageIndex + 2 && (
                <PaginationEllipsis />
              )}
            <PaginationItem>
              <PaginationNext
                className="select-none text-md"
                onClick={() => table.nextPage()}
                isActive={table.getCanNextPage()}
                style={{
                  pointerEvents: table.getCanNextPage() ? 'auto' : 'none',
                  opacity: table.getCanNextPage() ? 1 : 0.5,
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <OfferDetailsDialog
        offer={selectedOffer}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
      <OfferFilterDialog
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}
