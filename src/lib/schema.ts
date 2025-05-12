import { z } from 'zod'

// CPU Capabilities Schema
const cpuCapabilitySchema = z.union([
  z.literal('sse3'),
  z.literal('pclmulqdq'),
  z.literal('dtes64'),
  z.literal('monitor'),
  z.literal('dscpl'),
  z.literal('vmx'),
  z.literal('eist'),
  z.literal('tm2'),
  z.literal('ssse3'),
  z.literal('fma'),
  z.literal('cmpxchg16b'),
  z.literal('pdcm'),
  z.literal('pcid'),
  z.literal('sse41'),
  z.literal('sse42'),
  z.literal('x2apic'),
  z.literal('movbe'),
  z.literal('popcnt'),
  z.literal('tsc_deadline'),
  z.literal('aesni'),
  z.literal('xsave'),
  z.literal('osxsave'),
  z.literal('avx'),
  z.literal('f16c'),
  z.literal('rdrand'),
  z.literal('fpu'),
  z.literal('vme'),
  z.literal('de'),
  z.literal('pse'),
  z.literal('tsc'),
  z.literal('msr'),
  z.literal('pae'),
  z.literal('mce'),
  z.literal('cx8'),
  z.literal('apic'),
  z.literal('sep'),
  z.literal('mtrr'),
  z.literal('pge'),
  z.literal('mca'),
  z.literal('cmov'),
  z.literal('pat'),
  z.literal('pse36'),
  z.literal('clfsh'),
  z.literal('ds'),
  z.literal('acpi'),
  z.literal('mmx'),
  z.literal('fxsr'),
  z.literal('sse'),
  z.literal('sse2'),
  z.literal('ss'),
  z.literal('htt'),
  z.literal('tm'),
  z.literal('pbe'),
  z.literal('fsgsbase'),
  z.literal('adjust_msr'),
  z.literal('smep'),
  z.literal('rep_movsb_stosb'),
  z.literal('invpcid'),
  z.literal('deprecate_fpu_cs_ds'),
  z.literal('mpx'),
  z.literal('rdseed'),
  z.literal('adx'),
  z.literal('smap'),
  z.literal('clflushopt'),
  z.literal('processor_trace'),
  z.literal('sgx'),
  z.literal('sgx_lc'),
])

// CPU Schema
const cpuSchema = z.object({
  architecture: z.literal('x86_64'),
  capabilities: z.array(cpuCapabilitySchema),
  cores: z.number(),
  model: z.string(),
  threads: z.number(),
  vendor: z.string(),
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
  capabilities: z.array(z.string()),
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
const paymentPlatformsSchema = z.record(paymentPlatformSchema)

// Payment Debit Notes Schema
const paymentDebitNotesSchema = z.object({
  'accept-timeout?': z.number(),
})

// Pricing Model Linear Schema
const pricingModelLinearSchema = z.object({
  coeffs: z.tuple([z.number(), z.number(), z.number()]),
})

// Pricing Model Schema
const pricingModelSchema = z.object({
  '@tag': z.literal('linear'),
  linear: pricingModelLinearSchema,
})

// Payment Usage Schema
const paymentUsageSchema = z.object({
  vector: z.array(z.string()),
})

// Payment Schema
const paymentSchema = z.object({
  'debit-notes': paymentDebitNotesSchema,
  platform: paymentPlatformsSchema,
  pricing: z.object({
    model: pricingModelSchema,
  }),
  scheme: z.string(),
  usage: paymentUsageSchema,
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
export const offerSchema = z.object({
  constraints: z.string(),
  offerId: z.string(),
  properties: z.object({
    golem: golemPropertiesSchema,
  }),
  providerId: z.string(),
  timestamp: z.string().datetime(),
})

// TypeScript Type
export type Offer = z.infer<typeof offerSchema>
