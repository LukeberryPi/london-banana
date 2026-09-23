import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'

const description = "Put in your postcode and find out if you're inside Saul Sadka's London Banana."

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Are you in the London banana?' },
      { name: 'description', content: description },
      { property: 'og:title', content: 'Are you in the London banana?' },
      { property: 'og:description', content: description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'theme-color', content: '#ffe52e' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
