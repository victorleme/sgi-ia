'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/lib/sections'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen border-r border-[var(--border)] bg-[var(--bg)] fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border)]">
        <Link href="/" className="block">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-1">
            SGI
          </div>
          <div className="text-sm font-semibold text-[var(--text)] leading-tight">
            Sociedade Gnóstica<br />Internacional
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)] px-3 mb-2">
            Módulos
          </p>
          <ul className="space-y-0.5">
            {SECTIONS.map((section) => {
              const isActive = pathname.startsWith(`/${section.slug}`)
              return (
                <li key={section.slug}>
                  <Link
                    href={`/${section.slug}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--bg-hover)] text-gold border-l-2 border-gold pl-[10px]'
                        : 'text-[#999] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <span className="text-base leading-none">{section.icon}</span>
                    <span className="leading-tight">{section.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)]">
        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
          Acesso vitalício ao conteúdo da SGI.
        </p>
      </div>
    </aside>
  )
}
