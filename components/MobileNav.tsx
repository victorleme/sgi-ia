'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/lib/sections'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--bg)] border-b border-[var(--border)] flex items-center justify-between px-4 h-14">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold">SGI</span>
          <span className="text-sm font-medium text-[var(--text)]">Sociedade Gnóstica</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 rounded"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-[var(--bg)] pt-14 overflow-y-auto">
          <nav className="p-4">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)] px-2 mb-3">
              Módulos
            </p>
            <ul className="space-y-1">
              {SECTIONS.map((section) => {
                const isActive = pathname.startsWith(`/${section.slug}`)
                return (
                  <li key={section.slug}>
                    <Link
                      href={`/${section.slug}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium transition-all ${
                        isActive
                          ? 'bg-[var(--bg-hover)] text-gold border-l-2 border-gold pl-[14px]'
                          : 'text-[#999] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      <span className="text-xl">{section.icon}</span>
                      <span>{section.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
