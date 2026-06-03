import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scaffolding Calculator — TG20:13 / BS EN 5975',
  description: 'Tube and fitting scaffold compliance checker and method statement generator',
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
