'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Pagination,
  PaginationContent,
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

import type { Offer } from '@/lib/schema'
import { useOffersQuery } from '@/lib/query'
import { Button } from '@/components/ui/button'
import { FilterIcon } from 'lucide-react'

const columns: ColumnDef<Offer>[] = [
  {
    accessorFn: (offer) => offer.properties.golem.node.id.name,
    header: 'Provider',
  },
  {
    accessorFn: (offer) =>
      `${offer.properties.golem.inf.cpu.cores} / ${offer.properties.golem.inf.cpu.threads}`,
    header: 'Cores / Threads',
  },
  {
    accessorFn: (offer) => offer.properties.golem.inf.mem.gib.toFixed(2),
    header: 'Memory (GiB)',
  },
  {
    accessorFn: (offer) => offer.properties.golem.inf.storage.gib.toFixed(2),
    header: 'Storage (GiB)',
  },
  {
    accessorFn: (offer) => {
      const duration = offer.properties.golem.com.pricing.model.linear.coeffs[0]
      const cpu = offer.properties.golem.com.pricing.model.linear.coeffs[1]
      const initialPrice = offer.properties.golem.com.pricing.model.linear.coeffs[2]
      const price = (duration + cpu) * 3600 + initialPrice
      return `${price.toFixed(2)} GLM/h`
    },
    header: 'Price',
  },
]

export function OffersTable() {
  const pageSize = 5
  const { data: offers } = useOffersQuery()

  const table = useReactTable({
    data: offers ?? [],
    columns,
    pageCount: Math.ceil(((offers?.length ?? 0) - 1) / pageSize),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  console.debug('offers to render in the table', offers)
  console.debug('table state', table.getState())

  return (
    <div>
      <div className="flex flex-1 justify-between">
        <div className="text-2xl font-bold flex-1">{offers?.length ?? 0} active offers</div>
        <div>
          <Button variant="outline" className="rounded-md bg-primary text-primary-foreground">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      <Table className="border-separate border-spacing-y-4 text-lg font-bold w-full">
        <TableHeader className="bg-primary h-12">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-primary-foreground px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                className="bg-secondary"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4">
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
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
                >
                  {pageNumber + 1}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <PaginationNext
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
    </div>
  )
}
