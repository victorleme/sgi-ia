import Link from 'next/link'
import { SECTIONS } from '@/lib/sections'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <div className="text-xs font-bold tracking-[0.25em] uppercase text-gold mb-4">
          Sociedade Gnóstica Internacional
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] leading-tight mb-4">
          Portal de Conteúdo
        </h1>
        <p className="text-[var(--text-muted)] text-base md:text-lg max-w-xl leading-relaxed">
          Frameworks, playbooks, práticas e metodologias do caminho esotérico.
          Tudo o que você precisa, organizado como produto.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)] mb-12" />

      {/* Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <Link
            key={section.slug}
            href={`/${section.slug}`}
            className="group block p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[#333] hover:bg-[var(--bg-hover)] transition-all"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl leading-none mt-0.5">{section.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className={`text-base font-semibold mb-1.5 group-hover:text-gold transition-colors ${section.color}`}>
                  {section.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-muted)] text-center">
          SGI — Acesso vitalício ao conteúdo
        </p>
      </div>
    </div>
  )
}
