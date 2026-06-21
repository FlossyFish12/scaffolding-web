import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scaffolding Calculator — TG20:13 / BS EN 5975',
  description: 'Free NASC TG20:13 compliance checker for tube-and-fitting scaffold. Enter your parameters to instantly check compliance, structural adequacy, and generate a calculation sheet and method statement.',
  keywords: ['scaffolding', 'TG20', 'NASC', 'BS EN 5975', 'scaffold calculator', 'tube and fitting'],
  openGraph: {
    title: 'Scaffolding Calculator — TG20:13',
    description: 'Instant TG20 compliance check + method statement generator for tube-and-fitting scaffold.',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
