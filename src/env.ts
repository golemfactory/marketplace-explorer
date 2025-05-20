import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_GOLEM_BASE_RPC_URL: z.string().url().default('http://localhost:8545/'),
  },
  runtimeEnvStrict: {
    NEXT_PUBLIC_GOLEM_BASE_RPC_URL: process.env.NEXT_PUBLIC_GOLEM_BASE_RPC_URL,
  },
})
