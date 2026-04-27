import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'SGI — Sociedade Gnóstica Internacional',
  description: 'Portal de conteúdo da Sociedade Gnóstica Internacional. Metodologias, playbooks e frameworks do caminho esotérico.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)]">
        <MobileNav />
        <div className="flex">
          <Sidebar />
          {/* Main content — offset for sidebar on desktop, offset for topbar on mobile */}
          <main className="flex-1 md:ml-64 pt-14 md:pt-0 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
