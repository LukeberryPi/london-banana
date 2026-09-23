import { createServerFn } from '@tanstack/react-start'

const FULL = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/
const OUTWARD = /^[A-Z]{1,2}\d[A-Z\d]?$/

export function normalisePostcode(input: string) {
  const compact = input.toUpperCase().replace(/[^A-Z0-9]/g, '')
  if (FULL.test(compact)) return compact
  if (OUTWARD.test(compact)) return compact
  return null
}

export type Lookup =
  | { ok: true; postcode: string; outcode: string; lng: number; lat: number }
  | { ok: false; reason: 'invalid' | 'not-found' | 'unavailable' }

const cache = new Map<string, Lookup>()
const CACHE_LIMIT = 2000

async function fetchPostcode(compact: string): Promise<Lookup> {
  const isFull = FULL.test(compact)
  const url = `https://api.postcodes.io/${isFull ? 'postcodes' : 'outcodes'}/${compact}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (res.status === 404) return { ok: false, reason: 'not-found' }
  if (!res.ok) return { ok: false, reason: 'unavailable' }
  const { result } = (await res.json()) as {
    result: { postcode?: string; outcode: string; longitude: number | null; latitude: number | null }
  }
  if (result.longitude == null || result.latitude == null) return { ok: false, reason: 'not-found' }
  return {
    ok: true,
    postcode: result.postcode ?? result.outcode,
    outcode: result.outcode,
    lng: result.longitude,
    lat: result.latitude,
  }
}

export const lookupPostcode = createServerFn({ method: 'GET' })
  .validator((input: string) => input)
  .handler(async ({ data }): Promise<Lookup> => {
    const compact = normalisePostcode(data)
    if (!compact) return { ok: false, reason: 'invalid' }
    const cached = cache.get(compact)
    if (cached) return cached
    let result: Lookup
    try {
      result = await fetchPostcode(compact)
    } catch {
      return { ok: false, reason: 'unavailable' }
    }
    if (result.ok || result.reason === 'not-found') {
      if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value!)
      cache.set(compact, result)
    }
    return result
  })
