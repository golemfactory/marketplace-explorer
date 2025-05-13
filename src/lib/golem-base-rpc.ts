import axios from 'axios'
import { env } from '@/env'
import { offerSchema, type Offer } from '@/lib/schema'

type JsonRpcResponse = {
  jsonrpc: string
  id: number
  result: unknown
}

const jsonRpcRequest = async (method: string, params?: unknown[]): Promise<unknown> => {
  try {
    console.debug('jsonRpcRequest', method, params)
    const response = await axios.post<JsonRpcResponse>(env.NEXT_PUBLIC_GOLEM_BASE_RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    })
    console.debug('jsonRpcResponse', response.data)

    return response.data.result
  } catch (error) {
    console.error('jsonRpcRequest error', error)
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    }
    throw error
  }
}

export const getStorageValue = async (key: string) => {
  const result = await jsonRpcRequest('golembase_getStorageValue', [key])
  if (typeof result === 'string') {
    const decodedResult = Buffer.from(result, 'base64').toString('utf-8')
    return JSON.parse(decodedResult)
  }
  throw new Error('Expected a string result for base64 decoding')
}

export const getEntitiesForStringAnnotationValue = async (key: string, value: string) => {
  const result = await jsonRpcRequest('golembase_getEntitiesForStringAnnotationValue', [key, value])

  if (!Array.isArray(result)) {
    console.warn('Expected array of entities but got:', result)
    return []
  }

  console.info(`Found ${result.length} entities for key ${key} and value ${value}`)

  return result
}

export const queryEntities = async (query: string) => {
  const result = await jsonRpcRequest('golembase_queryEntities', [query])

  if (!Array.isArray(result)) {
    console.warn('Expected array of entities but got:', result)
    return []
  }

  console.info(`Found ${result.length} entities for query ${query}`)

  return result.map((entity) => {
    return Buffer.from(entity.value, 'base64').toString('utf-8')
  })
}
