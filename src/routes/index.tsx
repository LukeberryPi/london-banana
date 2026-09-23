import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { createFileRoute, Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { BananaMap, type Focus, type Pin } from '#/components/BananaMap'
import { BANANA_POST_URL, bananaRing, EDGE_METRES, formatDistance, judge, type Point, type Verdict } from '#/lib/geo'
import { lookupPostcode, normalisePostcode, type Lookup } from '#/lib/postcode'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { pc?: string } =>
    typeof search.pc === 'string' && search.pc.trim() ? { pc: search.pc } : {},
  loaderDeps: ({ search }) => ({ pc: search.pc }),
  loader: ({ deps: { pc } }) => (pc ? lookupPostcode({ data: pc }) : null),
  component: Home,
})

const FAR_METRES = 30_000

const overview: Focus = (() => {
  const xs = bananaRing.map(([x]) => x)
  const ys = bananaRing.map(([, y]) => y)
  const pad = 4000
  return {
    bounds: [
      [Math.min(...xs) - pad, Math.min(...ys) - pad],
      [Math.max(...xs) + pad, Math.max(...ys) + pad],
    ],
    reserve: 'modal',
  }
})()

function focusOn(a: Point, b: Point): Focus {
  const minSpan = 6000
  const cx = (a[0] + b[0]) / 2
  const cy = (a[1] + b[1]) / 2
  const half = Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), minSpan) * 0.75
  return { bounds: [[cx - half, cy - half], [cx + half, cy + half]], reserve: 'card' }
}

const errors: Record<Exclude<Lookup, { ok: true }>['reason'], (pc: string) => string> = {
  invalid: () => "That isn't a UK postcode. Try the full thing, like SW11 1AA, or just the first half, like SW11.",
  'not-found': (pc) => `We couldn't find ${pc}. Check it for typos, or try just the first half.`,
  unavailable: () => "The postcode lookup isn't answering. Give it a minute and try again.",
}

function Home() {
  const { pc } = Route.useSearch()
  const lookup = Route.useLoaderData()

  const result = useMemo(() => {
    if (!lookup?.ok) return null
    return { ...lookup, ...judge([lookup.lng, lookup.lat]) }
  }, [lookup])

  const far = result ? result.metresFromLine > FAR_METRES : false
  const focus = useMemo(
    () => (result && !far ? focusOn(result.point, result.nearestLinePoint) : overview),
    [result, far],
  )
  const pin: Pin | undefined =
    result && !far
      ? {
          point: result.point,
          label: result.postcode,
          lineTo: result.verdict === 'edge' ? undefined : result.nearestLinePoint,
        }
      : undefined

  return (
    <>
      <BananaMap focus={focus} pin={pin} />
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="box-wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>
      </svg>
      {result ? (
        <ResultCard
          key={result.postcode}
          postcode={result.postcode}
          outcode={result.outcode}
          wholeDistrict={result.postcode === result.outcode}
          verdict={result.verdict}
          metres={result.metresFromLine}
          far={far}
        />
      ) : (
        <AskModal key={pc ?? ''} initial={pc} error={lookup && !lookup.ok ? errors[lookup.reason](pc ?? '') : null} />
      )}
      <Credits />
    </>
  )
}

function MarkerBox({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`relative bg-paper ${className}`}>
      <div
        className="pointer-events-none absolute -inset-1 rounded-md border-[3.5px] border-marker"
        style={{ filter: 'url(#box-wobble)' }}
      />
      {children}
    </div>
  )
}

function AskModal({ initial, error }: { initial?: string; error: string | null }) {
  const navigate = useNavigate()
  const checking = useRouterState({ select: (s) => s.status === 'pending' })
  const [value, setValue] = useState(initial ?? '')
  const [localError, setLocalError] = useState<string | null>(null)
  const message = localError ?? error

  return (
    <main className="pointer-events-none fixed inset-0 grid place-items-center items-end p-3 md:items-center md:p-5">
      <MarkerBox className="pointer-events-auto w-full max-w-[27rem] p-7 sm:p-9">
        <h1 className="text-[clamp(2.2rem,8vw,3.1rem)] leading-[0.94] font-[820] tracking-[-0.015em] [font-stretch:125%]">
          Are you in the London banana?
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-snug text-graphite">
          Put in your postcode and we'll check it against the map that started the argument.
        </p>
        <form
          className="mt-7"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            if (!normalisePostcode(value)) {
              setLocalError(errors.invalid(value))
              return
            }
            setLocalError(null)
            navigate({ to: '/', search: { pc: value.trim().toUpperCase() } })
          }}
        >
          <label htmlFor="postcode" className="text-[0.9375rem] font-semibold">
            Your postcode
          </label>
          <input
            id="postcode"
            name="postcode"
            autoFocus
            autoComplete="postal-code"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="SW11 1AA"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={message ? true : undefined}
            aria-describedby={message ? 'postcode-error' : undefined}
            className="mt-2 block w-full rounded-sm border-2 border-marker bg-paper px-4 py-3 text-2xl font-[720] uppercase [font-stretch:112%] placeholder:text-black/25 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-postcode"
          />
          {message && (
            <p id="postcode-error" role="alert" className="mt-3 text-[0.9375rem] leading-snug font-medium text-[#b42318]">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={checking}
            className="mt-4 w-full rounded-sm bg-marker px-4 py-3.5 text-lg font-bold text-paper [font-stretch:112%] hover:bg-[#2a2a2a] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-postcode disabled:opacity-70"
          >
            {checking ? 'Checking…' : 'Check my postcode'}
          </button>
        </form>
      </MarkerBox>
    </main>
  )
}

const headlines: Record<Verdict, string> = {
  inside: "You're in the banana.",
  edge: "You're on the edge of the banana.",
  outside: "You're outside the banana.",
}

const highlight: Record<Verdict, string> = { inside: '100%', edge: '50%', outside: '0%' }

function detailFor(verdict: Verdict, metres: number, far: boolean) {
  const d = formatDistance(metres)
  if (far) return `You're ${d} from the nearest bit of banana. This one probably isn't about you.`
  if (verdict === 'inside')
    return `${d} inside the line. Sadka's verdict: "As long as you stay within the Banana, you'll have a great time in London."`
  if (verdict === 'edge')
    return `${d} from the line, which is within ${EDGE_METRES} m. At this point it comes down to the width of his marker.`
  return `${d} outside the line. Sadka's verdict: "Almost everything outside the Banana is horrible these days."`
}

function shareText(verdict: Verdict, outcode: string) {
  if (verdict === 'inside') return `I'm inside the London banana (${outcode}). Apparently I'll have a great time.`
  if (verdict === 'edge') return `I'm on the edge of the London banana (${outcode}). One fat thumb away from greatness.`
  return `I'm outside the London banana (${outcode}). Apparently it's horrible out here.`
}

function ResultCard(props: {
  postcode: string
  outcode: string
  wholeDistrict: boolean
  verdict: Verdict
  metres: number
  far: boolean
}) {
  const { postcode, outcode, wholeDistrict, verdict, metres, far } = props
  const [origin, setOrigin] = useState('')
  useEffect(() => setOrigin(window.location.origin), [])
  const share = new URL('https://x.com/intent/tweet')
  share.searchParams.set('text', shareText(verdict, outcode))
  if (origin) share.searchParams.set('url', origin)

  return (
    <aside className="result-in fixed inset-x-3 bottom-3 md:inset-x-auto md:bottom-7 md:left-7 md:w-[25rem]">
      <MarkerBox className="p-6 sm:p-7">
        <p className="inline-block rounded-full bg-postcode px-3.5 py-1 text-[0.9375rem] font-bold text-paper [font-stretch:112%]">
          {postcode}
        </p>
        <h2 className="mt-3 text-[clamp(1.9rem,7vw,2.45rem)] leading-[1.02] font-[820] tracking-[-0.01em] [font-stretch:125%]">
          <span className="verdict" style={{ '--fill': highlight[verdict] } as CSSProperties}>
            {headlines[verdict]}
          </span>
        </h2>
        <p className="mt-3 leading-snug text-graphite">{detailFor(verdict, metres, far)}</p>
        {wholeDistrict && (
          <p className="mt-2 text-[0.9375rem] leading-snug text-graphite">
            That's the middle of {outcode}. Use your full postcode for a closer call.
          </p>
        )}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <a
            href={share.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-sm bg-marker px-4 py-3 text-center font-bold text-paper [font-stretch:112%] hover:bg-[#2a2a2a] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-postcode"
          >
            Share on X
          </a>
          <Link
            to="/"
            search={{}}
            activeOptions={{ exact: true, includeSearch: true }}
            className="inline-flex flex-1 items-center justify-center rounded-sm border-2 border-marker px-4 py-2.5 text-center font-bold [font-stretch:112%] hover:bg-highlighter focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-postcode"
          >
            Check another postcode
          </Link>
        </div>
      </MarkerBox>
    </aside>
  )
}

function Credits() {
  return (
    <footer className="fixed top-2 right-2 left-2 rounded-sm bg-paper/90 px-2.5 py-1.5 text-[0.6875rem] leading-snug text-graphite md:top-auto md:bottom-3 md:left-auto md:max-w-[25rem] md:text-right">
      <p>
        The banana is{' '}
        <a href={BANANA_POST_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-marker underline">
          Saul Sadka's, posted on X on 24 August 2025
        </a>
        . Traced by hand, so trust it to a few streets.
      </p>
      <p>
        Map: ONS, OGL v3, contains OS data © Crown copyright. River © OpenStreetMap contributors. Postcodes via
        postcodes.io, contains Royal Mail data © Royal Mail.
      </p>
    </footer>
  )
}
