import { QueryClient, useQuery } from '@tanstack/react-query'
import { getEntitiesForStringAnnotationValue } from '@/lib/golem-base-rpc'

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
    queryFn: () => getEntitiesForStringAnnotationValue('golem_marketplace_type', 'Offer'),
  })
}
