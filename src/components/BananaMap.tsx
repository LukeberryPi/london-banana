import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import basemap from '#/data/basemap.json'
import { bananaRing, EDGE_METRES, project, type LngLat, type Point } from '#/lib/geo'
import { places } from '#/lib/places'

type View = { cx: number; cy: number; mpp: number }
type Size = { width: number; height: number }
export type Focus = { bounds: [Point, Point]; reserve: 'modal' | 'card' }
export type Pin = { point: Point; label: string; lineTo?: Point }

function insetsFor({ width, height }: Size, reserve: Focus['reserve']) {
  const edge = { top: 40, right: 24, bottom: 24, left: 24 }
  if (width >= 768) return reserve === 'card' ? { ...edge, left: 470 } : edge
  const sheet = reserve === 'card' ? 360 : 470
  return { ...edge, top: 124, bottom: Math.min(sheet, height * 0.58) }
}

const toPath = (ring: Point[], close = true) =>
  'M' + ring.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L') + (close ? 'Z' : '')

const areaPaths = basemap.areas.map((area) => ({
  london: area.london,
  d: area.rings.map((ring) => toPath((ring as LngLat[]).map(project))).join(''),
}))
const thamesPath = basemap.thames.map((line) => toPath((line as LngLat[]).map(project), false)).join('')
const bananaPath = toPath(bananaRing)
const projectedPlaces = places.map((p) => ({ ...p, point: project(p.at) }))

function fit({ bounds: [[x0, y0], [x1, y1]], reserve }: Focus, size: Size): View {
  const { width, height } = size
  const insets = insetsFor(size, reserve)
  const w = Math.max(width - insets.left - insets.right, 80)
  const h = Math.max(height - insets.top - insets.bottom, 80)
  const mpp = Math.max((x1 - x0) / w, (y1 - y0) / h)
  return {
    mpp,
    cx: (x0 + x1) / 2 - ((insets.left - insets.right) / 2) * mpp,
    cy: (y0 + y1) / 2 - ((insets.top - insets.bottom) / 2) * mpp,
  }
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

const MIN_MPP = 2
const MAX_MPP = 400
const clampMpp = (mpp: number) => Math.min(MAX_MPP, Math.max(MIN_MPP, mpp))

function useMapView(target: View | null) {
  const [view, setView] = useState<View | null>(target)
  const current = useRef(view)
  current.current = view
  const frame = useRef(0)

  const jumpTo = useCallback((next: View) => {
    cancelAnimationFrame(frame.current)
    setView(next)
  }, [])

  const animateTo = useCallback((to: View, duration = 1300) => {
    cancelAnimationFrame(frame.current)
    const from = current.current
    if (!from || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setView(to)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const t = ease(Math.min(1, (now - start) / duration))
      setView({
        cx: from.cx + (to.cx - from.cx) * t,
        cy: from.cy + (to.cy - from.cy) * t,
        mpp: Math.exp(Math.log(from.mpp) + (Math.log(to.mpp) - Math.log(from.mpp)) * t),
      })
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (target) animateTo(target)
  }, [target?.cx, target?.cy, target?.mpp])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return { view, current, jumpTo, animateTo }
}

function zoomAround(view: View, size: Size, [sx, sy]: Point, factor: number): View {
  const mpp = clampMpp(view.mpp * factor)
  const dx = sx - size.width / 2
  const dy = sy - size.height / 2
  return { mpp, cx: view.cx + dx * (view.mpp - mpp), cy: view.cy + dy * (view.mpp - mpp) }
}

export function BananaMap({ focus, pin }: { focus: Focus; pin?: Pin }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<Size | null>(null)
  const sizeRef = useRef(size)
  sizeRef.current = size

  useLayoutEffect(() => {
    const el = ref.current!
    const observer = new ResizeObserver(([entry]) =>
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height }),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const target = useMemo(() => (size ? fit(focus, size) : null), [focus, size])
  const { view, current, jumpTo, animateTo } = useMapView(target)
  const pointers = useRef(new Map<number, Point>())
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const el = ref.current!
    const onWheel = (e: WheelEvent) => {
      const v = current.current
      const s = sizeRef.current
      if (!v || !s) return
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const speed = e.ctrlKey ? 0.01 : 0.0022
      jumpTo(zoomAround(v, s, [e.clientX - rect.left, e.clientY - rect.top], Math.exp(e.deltaY * speed)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const local = (e: { clientX: number; clientY: number }): Point => {
    const rect = ref.current!.getBoundingClientRect()
    return [e.clientX - rect.left, e.clientY - rect.top]
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const map = pointers.current
    const prev = map.get(e.pointerId)
    const v = current.current
    if (!prev || !v || !size) return
    const next = local(e)
    if (map.size === 1) {
      jumpTo({ ...v, cx: v.cx - (next[0] - prev[0]) * v.mpp, cy: v.cy - (next[1] - prev[1]) * v.mpp })
    } else if (map.size === 2) {
      const other = [...map.entries()].find(([id]) => id !== e.pointerId)![1]
      const before = Math.hypot(prev[0] - other[0], prev[1] - other[1])
      const after = Math.hypot(next[0] - other[0], next[1] - other[1])
      const mid: Point = [(next[0] + other[0]) / 2, (next[1] + other[1]) / 2]
      const panned = { ...v, cx: v.cx - ((next[0] - prev[0]) / 2) * v.mpp, cy: v.cy - ((next[1] - prev[1]) / 2) * v.mpp }
      jumpTo(zoomAround(panned, size, mid, before / Math.max(after, 1)))
    }
    map.set(e.pointerId, next)
  }

  const release = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size === 0) setDragging(false)
  }

  const zoomBy = (factor: number) => {
    const v = current.current
    if (v && size) animateTo(zoomAround(v, size, [size.width / 2, size.height / 2], factor), 300)
  }

  return (
    <div className="absolute inset-0">
      <div
        ref={ref}
        aria-hidden="true"
        className={`absolute inset-0 touch-none overflow-hidden bg-shire select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          pointers.current.set(e.pointerId, local(e))
          setDragging(true)
        }}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onDoubleClick={(e) => {
          const v = current.current
          if (v && size) animateTo(zoomAround(v, size, local(e), 0.5), 300)
        }}
      >
        {size && view && <MapSvg size={size} view={view} pin={pin} />}
      </div>
      <div className="absolute top-37 right-3 flex flex-col gap-1.5 md:top-auto md:right-5 md:bottom-28">
        <MapButton label="Zoom in" onClick={() => zoomBy(0.5)}>
          <path d="M12 5v14M5 12h14" />
        </MapButton>
        <MapButton label="Zoom out" onClick={() => zoomBy(2)}>
          <path d="M5 12h14" />
        </MapButton>
        <MapButton label={pin ? 'Back to my postcode' : 'Show the whole banana'} onClick={() => target && animateTo(target, 700)}>
          <circle cx="12" cy="12" r="6" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </MapButton>
      </div>
    </div>
  )
}

function MapButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-sm border-2 border-marker bg-paper hover:bg-highlighter focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-postcode"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
        {children}
      </svg>
    </button>
  )
}

function MapSvg({ size: { width, height }, view: { cx, cy, mpp }, pin }: { size: Size; view: View; pin?: Pin }) {
  const toScreen = ([x, y]: Point): Point => [(x - cx) / mpp + width / 2, (y - cy) / mpp + height / 2]
  const world = `translate(${width / 2} ${height / 2}) scale(${1 / mpp}) translate(${-cx} ${-cy})`
  const zoomedIn = mpp < 28
  const pinScreen = pin && toScreen(pin.point)
  const underPin = ([x, y]: Point) =>
    !!pinScreen && x > pinScreen[0] - 60 && x < pinScreen[0] + 150 && Math.abs(y - pinScreen[1]) < 24
  const placed: [number, number, number, number][] = []
  const labels = projectedPlaces
    .filter((p) => p.tier === 1 || zoomedIn)
    .map((p) => ({ ...p, screen: toScreen(p.point) }))
    .filter(({ screen: [x, y] }) => x > -40 && x < width + 40 && y > -20 && y < height + 20)
    .filter(({ screen }) => !underPin(screen))
    .filter(({ name, screen: [x, y] }) => {
      const half = name.length * 3.4 + 4
      const box: [number, number, number, number] = [x - half, y - 9, x + half, y + 9]
      if (placed.some((b) => box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1])) return false
      placed.push(box)
      return true
    })
  const lineToScreen = pin?.lineTo && toScreen(pin.lineTo)

  return (
    <svg width={width} height={height} className="block">
      <defs>
        <filter id="marker-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="8" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </defs>

      <g transform={world}>
        {areaPaths.map((a, i) => (
          <path
            key={i}
            d={a.d}
            fill={a.london ? 'var(--color-paper)' : 'var(--color-shire)'}
            stroke="var(--color-borough)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d={thamesPath}
          fill="none"
          stroke="var(--color-thames)"
          strokeWidth={Math.max(170, 3.5 * mpp)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={bananaPath} className="banana-fill" fill="var(--color-highlighter)" />
        <path
          d={bananaPath}
          fill="none"
          stroke="var(--color-marker)"
          strokeOpacity={zoomedIn ? 0.08 : 0}
          strokeWidth={EDGE_METRES * 2}
          strokeLinejoin="round"
          className="transition-[stroke-opacity] duration-700"
        />
      </g>

      <g filter="url(#marker-wobble)">
        <g transform={world}>
          <path
            d={bananaPath}
            pathLength={1}
            className="banana-stroke"
            fill="none"
            stroke="var(--color-marker)"
            strokeWidth={Math.max(6.5 * mpp, 150)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      <g className="map-labels">
        {labels.map(({ name, screen: [x, y] }) => (
          <text key={name} x={x} y={y} textAnchor="middle" dominantBaseline="middle">
            {name}
          </text>
        ))}
      </g>

      {pinScreen && (
        <g key={pin.label}>
          {lineToScreen && (
            <line
              x1={pinScreen[0]}
              y1={pinScreen[1]}
              x2={lineToScreen[0]}
              y2={lineToScreen[1]}
              stroke="var(--color-postcode)"
              strokeWidth={2.5}
              strokeDasharray="2 6"
              strokeLinecap="round"
            />
          )}
          <circle cx={pinScreen[0]} cy={pinScreen[1]} r={10} className="pin-ring" />
          <circle
            cx={pinScreen[0]}
            cy={pinScreen[1]}
            r={9}
            fill="var(--color-postcode)"
            stroke="var(--color-paper)"
            strokeWidth={3}
          />
          <PinLabel x={pinScreen[0] + 16} y={pinScreen[1]} text={pin.label} />
        </g>
      )}
    </svg>
  )
}

function PinLabel({ x, y, text }: { x: number; y: number; text: string }) {
  const width = text.length * 10.5 + 20
  return (
    <g transform={`translate(${x} ${y - 15})`}>
      <rect width={width} height={30} rx={15} fill="var(--color-postcode)" />
      <text x={width / 2} y={16} textAnchor="middle" dominantBaseline="middle" className="pin-text">
        {text}
      </text>
    </g>
  )
}
