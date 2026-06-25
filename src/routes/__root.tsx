import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// 🔴 This special query tells the bundler to load the CSS stylesheet as a URL string asset
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  // 🔴 This injects the compiled Tailwind configurations into the HTML head tag properly
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      {/* Structural HTML Meta Context Tags */}
      <HeadContent />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          
         <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
  <img 
    src="https://2.wlimg.com/company_logo/14578309.jpg" 
    alt="Company Logo" 
    /* 🔴 Upped contrast/brightness and added saturate to keep the logo dark blue */
    className="h-12 w-auto object-contain max-w-[200px] contrast-[2] brightness-[1.15] saturate-[1.5] mix-blend-multiply"
    loading="eager"
  />
</Link>

          {/* Navigation Items */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link 
              to="/" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              Services
            </Link>
            <Link 
              to="/portfolio" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              Portfolio
            </Link>
            <Link 
              to="/updates" 
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground [&.active]:font-semibold"
            >
              Updates
            </Link>
          </nav>

        </div>
      </header>

      {/* Primary Context Rendering Portal */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Renders underlying application hydrations/scripts */}
      <Scripts />

      {/* Conditional Dev Tools Overlay (Only active during local development) */}
      {process.env.NODE_ENV === 'development' && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  )
}