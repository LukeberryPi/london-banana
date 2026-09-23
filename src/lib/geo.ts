import banana from '#/data/banana.json'

export type LngLat = [number, number]
export type Point = [number, number]

const LAT0 = 51.5
const LNG0 = -0.2
const KY = 111_320
const KX = KY * Math.cos((LAT0 * Math.PI) / 180)

export const EDGE_METRES = 400
export const BANANA_POST_URL = banana.source

export function project([lng, lat]: LngLat): Point {
  return [(lng - LNG0) * KX, -(lat - LAT0) * KY]
}

export const bananaRing: Point[] = (banana.ring as LngLat[]).map(project)

function isInside([x, y]: Point, ring: Point[]) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function nearestOnRing([x, y]: Point, ring: Point[]) {
  let best = { distance: Infinity, point: ring[0] }
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[j]
    const [bx, by] = ring[i]
    const dx = bx - ax
    const dy = by - ay
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)))
    const px = ax + t * dx
    const py = ay + t * dy
    const distance = Math.hypot(x - px, y - py)
    if (distance < best.distance) best = { distance, point: [px, py] }
  }
  return best
}

export type Verdict = 'inside' | 'outside' | 'edge'

export function judge(location: LngLat) {
  const point = project(location)
  const nearest = nearestOnRing(point, bananaRing)
  const verdict: Verdict =
    nearest.distance <= EDGE_METRES ? 'edge' : isInside(point, bananaRing) ? 'inside' : 'outside'
  return { point, verdict, metresFromLine: nearest.distance, nearestLinePoint: nearest.point }
}

export function formatDistance(metres: number) {
  if (metres < 1000) return `${Math.round(metres / 10) * 10} m`
  return `${(metres / 1000).toFixed(metres < 10_000 ? 1 : 0)} km`
}
