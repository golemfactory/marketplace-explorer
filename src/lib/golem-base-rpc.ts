import axios from 'axios'
import { env } from '@/env'
import { offerSchema, type Offer } from '@/lib/schema'

const jsonRpcRequest = async (method: string, params?: unknown[]): Promise<unknown> => {
  try {
    console.debug('jsonRpcRequest', method, params)
    const response = await axios.post(env.NEXT_PUBLIC_GOLEM_BASE_RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    })
    console.debug('jsonRpcResponse', response.data)
    return response.data
  } catch (error) {
    console.error('jsonRpcRequest error', error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    }
    throw error
  }
}

export const getEntitiesForStringAnnotationValue = async (key: string, value: string) => {
  const result = await jsonRpcRequest('golembase_getEntitiesForStringAnnotationValue', [key, value])

  if (!Array.isArray(result)) {
    console.warn('Expected array of entities but got:', result)
    return []
  }

  const validOffers: Offer[] = []

  for (const entity of result) {
    try {
      const parsed = offerSchema.safeParse(entity)
      if (parsed.success) {
        validOffers.push(parsed.data)
      } else {
        console.debug('Skipping invalid offer:', parsed.error.format())
      }
    } catch (error) {
      console.debug('Error parsing offer:', error)
    }
  }

  console.info(`Found ${validOffers.length} valid offers out of ${result.length} entities`)

  return validOffers
}
