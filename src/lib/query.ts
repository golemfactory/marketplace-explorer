import { QueryClient, useQuery } from '@tanstack/react-query'
import {
  getEntitiesForStringAnnotationValue,
  getStorageValue,
  queryEntities,
} from '@/lib/golem-base-rpc'
import { offerSchema } from './schema'

export const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  retry: 1,
  staleTime: 5 * 60 * 1000,
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: defaultQueryOptions,
  },
})

export const useOffersQuery = () => {
  return useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const entities = await queryEntities('golem_marketplace_type="Offer"')
      const offers = (
        await Promise.all(
          entities.map(async (offer) => {
            try {
              const parsedOffer = offerSchema.safeParse(JSON.parse(offer))
              if (!parsedOffer.success) {
                console.warn(`Invalid offer ${offer}, ${JSON.stringify(offer)}`, parsedOffer.error)
                return null
              }
              console.debug(`Found offer ${offer}`)
              return parsedOffer.data
            } catch (error) {
              console.warn(`Error parsing offer ${offer}:`, error)
              return null
            }
          }),
        )
      ).filter((offer) => offer !== null)

      console.info(`Found ${offers?.length} offers`, offers)
      return offers
    },
  })
}
