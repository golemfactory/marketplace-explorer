'use client'

import { ChevronDown, ChevronUp, Loader2, RefreshCcw } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandItem } from './ui/command'

enum RefetchIntervalEnum {
  INTERVAL_OFF = 0,
  INTERVAL_5S = 5000,
  INTERVAL_15S = 15000,
  INTERVAL_30S = 30000,
  INTERVAL_1M = 60000,
  INTERVAL_5M = 300000,
  INTERVAL_15M = 900000,
  INTERVAL_30M = 1800000,
}

const REFRESH_INTERVAL_DISPLAY_MAP = {
  [RefetchIntervalEnum.INTERVAL_OFF]: 'off',
  [RefetchIntervalEnum.INTERVAL_5S]: '5s',
  [RefetchIntervalEnum.INTERVAL_15S]: '15s',
  [RefetchIntervalEnum.INTERVAL_30S]: '30s',
  [RefetchIntervalEnum.INTERVAL_1M]: '1m',
  [RefetchIntervalEnum.INTERVAL_5M]: '5m',
  [RefetchIntervalEnum.INTERVAL_15M]: '15m',
  [RefetchIntervalEnum.INTERVAL_30M]: '30m',
}

type RefreshBtnProps = {
  isRefetching: boolean
  onIntervalChange: (interval: number) => void
  refetchData: () => void
  className?: string
}

export function RefreshBtn({
  isRefetching,
  onIntervalChange,
  refetchData,
  className,
}: RefreshBtnProps) {
  const [refetchInterval, setRefetchInterval] = useState<RefetchIntervalEnum>(
    RefetchIntervalEnum.INTERVAL_OFF,
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <div className={className}>
      <Button
        variant="outline"
        className="rounded-r-none"
        onClick={() => {
          refetchData()
        }}
      >
        {isRefetching ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
        Refresh
      </Button>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-l-none p-2">
            <span className="flex items-center gap-1">
              {isPopoverOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <span>
                {refetchInterval !== RefetchIntervalEnum.INTERVAL_OFF &&
                  REFRESH_INTERVAL_DISPLAY_MAP[refetchInterval]}
              </span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 m-0">
          <Command>
            {Object.entries(REFRESH_INTERVAL_DISPLAY_MAP).map(([key, value]) => (
              <CommandItem
                key={key}
                onSelect={() => {
                  onIntervalChange(Number(key))
                  setRefetchInterval(Number(key))
                  setIsPopoverOpen(false)
                }}
              >
                {value}
              </CommandItem>
            ))}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
