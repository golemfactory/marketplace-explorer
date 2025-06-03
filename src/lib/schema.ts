import { z } from 'zod'

// CPU Schema
const cpuSchema = z.object({
  architecture: z.union([z.literal('x86_64'), z.literal('aarch64')]),
  capabilities: z.array(z.string()).optional(),
  cores: z.number(),
  threads: z.number(),
  model: z.string().optional(),
  vendor: z.string().optional(),
})

// Memory Schema
const memorySchema = z.object({
  gib: z.number(),
})

// Storage Schema
const storageSchema = z.object({
  gib: z.number(),
})

// Node Debug Schema
const nodeDebugSchema = z.object({
  subnet: z.string(),
})

// Node ID Schema
const nodeIdSchema = z.object({
  name: z.string(),
})

// Node Schema
const nodeSchema = z.object({
  debug: nodeDebugSchema,
  id: nodeIdSchema,
})

// Runtime Schema
const runtimeSchema = z.object({
  capabilities: z.array(z.string()).optional(),
  name: z.string(),
  version: z.string(),
})

// Server Capabilities Schema
const serverCapabilitiesSchema = z.object({
  'multi-activity': z.boolean(),
})

// Activity Transfer Protocol Schema
const activityTransferProtocolSchema = z.union([
  z.literal('http'),
  z.literal('https'),
  z.literal('gftp'),
])

// Activity Caps Schema
const activityCapsSchema = z.object({
  transfer: z.object({
    protocol: z.array(activityTransferProtocolSchema),
  }),
})

// Payment Platform Schema
const paymentPlatformSchema = z.object({
  address: z.string(),
})

// Payment Platforms Schema
const paymentPlatformsSchema = z.record(z.string(), paymentPlatformSchema)

// Payment Debit Notes Schema
const paymentDebitNotesSchema = z.object({
  'accept-timeout?': z.number(),
})

// Pricing Model Linear Schema
const pricingModelLinearSchema = z
  .object({
    coeffs: z.tuple([z.number(), z.number(), z.number()]),
  })
  .transform((data) => {
    const duration = data.coeffs[0]
    const cpu = data.coeffs[1]
    const initialPrice = data.coeffs[2]
    return {
      coeffs: data.coeffs,
      cpuPerHour: cpu * 3600,
      envPerHour: duration * 3600,
      initialPrice,
    }
  })

// Pricing Model Schema
const pricingSchema = z.object({
  model: z.object({
    '@tag': z.literal('linear'),
    linear: pricingModelLinearSchema,
  }),
})

// Payment Usage Schema
const paymentUsageSchema = z.object({
  vector: z.array(z.string()),
})

// Payment Schema
const paymentSchema = z.object({
  'debit-notes': paymentDebitNotesSchema,
  platform: paymentPlatformsSchema,
})

// Scheme Schema
const scheme = z.object({
  '@tag': z.literal('payu'),
  payu: z.object({
    'debit-note': z.object({
      'interval-sec?': z.number().optional().default(120),
    }),
    'payment-timeout-sec?': z.number().optional().default(120),
  }),
})

// Activity Schema
const activitySchema = z.object({
  caps: activityCapsSchema,
})

// Golem Properties Schema
const golemPropertiesSchema = z.object({
  activity: activitySchema,
  com: z.object({
    payment: paymentSchema,
    pricing: pricingSchema,
    scheme: scheme,
    usage: paymentUsageSchema,
  }),
  inf: z.object({
    cpu: cpuSchema,
    mem: memorySchema,
    storage: storageSchema,
  }),
  node: nodeSchema,
  runtime: runtimeSchema,
  srv: z.object({
    caps: serverCapabilitiesSchema,
  }),
})

// Offer Schema
export const offerSchema = z
  .object({
    constraints: z.string(),
    offerId: z.string(),
    properties: z.object({
      golem: golemPropertiesSchema,
    }),
    providerId: z.string(),
    timestamp: z.string().datetime(),
  })
  .transform((data) => {
    const testNetwork =
      Object.keys(data.properties.golem.com.payment.platform).findIndex((key) =>
        key.endsWith('-tglm'),
      ) > -1
    const mainNetwork =
      Object.keys(data.properties.golem.com.payment.platform).findIndex((key) =>
        key.endsWith('-glm'),
      ) > -1
    return {
      ...data,
      testNetwork,
      mainNetwork,
    }
  })

// TypeScript Type for Offer
export type Offer = z.infer<typeof offerSchema>

// Filter Schema
export const filterSchema = z.object({
  cpuCores: z.coerce.number().min(0).optional(),
  memoryGiB: z.coerce.number().min(0).optional(),
  storageGiB: z.coerce.number().min(0).optional(),
  pricePerHour: z.coerce.number().min(0).optional(),
  providerName: z.string().optional(),
  network: z.union([z.literal('mainnet'), z.literal('testnet'), z.literal('')]).optional(),
})

// TypeScript Type for Filter
export type Filters = z.infer<typeof filterSchema>
