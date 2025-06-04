'use client'

import { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'

export default function MarketplaceInfo() {
  // read from local storage
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const isVisible = localStorage.getItem('marketplaceInfo')
    if (isVisible) {
      setIsVisible(isVisible === 'true')
    }
  }, [])

  const closeInfo = () => {
    setIsVisible(false)
    localStorage.setItem('marketplaceInfo', 'false')
  }

  return (
    isVisible && (
      <Alert className="w-fit rounded-lg border-2 cursor-pointer my-1">
        <AlertTitle className="flex items-center gap-2">
          <InfoCircleOutlined className="flex-none" />
          <span className="flex-grow">Marketplace Explorer - browse Golem Marketplace Offers</span>
          <Button variant="ghost" size="icon" className="flex-none" onClick={closeInfo}>
            <CloseOutlined />
          </Button>
        </AlertTitle>
        <AlertDescription>
          <span>
            <b>Browse all valid offers currently available on the Golem Network.</b> Each offer
            specifies a set of computing resources and a corresponding price. Offers are provided by
            individual providers and can be used to request resources and run compute tasks. For
            detailed guidance on how to utilize resources on the Golem Network, please refer to the{' '}
            <a
              href="https://docs.golem.network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline underline"
            >
              Golem Docs
            </a>
            .
          </span>
          <span>
            <b>Note:</b> This page displays offers currently available on the Golem Testnet only.
            For offers on the Golem Mainnet, please visit{' '}
            <a
              href="https://stats.golem.network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline underline"
            >
              Golem Stats
            </a>
            .
          </span>
        </AlertDescription>
      </Alert>
    )
  )
}
