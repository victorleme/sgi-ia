import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSectionBySlug, SECTIONS } from '@/lib/sections'
import { getLessonsForSection } from '@/lib/content'

interface Props {
  params: Promise<{ section: string }>
}

export async function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.slug }))
}

export default async function SectionPage({ params }: Props) {
  const { section: sectionSlug } = await params
  const section = getSectionBySlug(sectionSlug)
  if (!section) notFound()

  const lessons = getLessonsForSection(sectionSlug)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Portal</Link>
        <span>/</span>
        <span className={section.color}>{section.title}</span>
      </div>

      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{section.icon}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)]">
            {section.title}
          </h1>
        </div>
        <p className="text-[var(--text-muted)] text-base leading-relaxed max-w-xl">
          {section.description}
        </p>
      </div>

      <div className="h-px bg-[var(--border)] mb-8" />

      {/* Lesson list */}
      {lessons.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--text-muted)] text-sm">
            Conteúdo sendo processado. Em breve disponível.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {lessons.map((lesson, index) => (
            <li key={lesson.slug}>
              <Link
                href={`/${sectionSlug}/${lesson.slug}`}
                className="group flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] hover:border-[#333] hover:bg-[var(--bg-hover)] transition-all"
              >
                <span className="text-xs font-mono text-[var(--text-muted)] w-6 text-right shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text)] group-hover:text-gold transition-colors leading-tight">
                    {lesson.title}
                  </p>
                  {lesson.description && (
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                      {lesson.description}
                    </p>
                  )}
                </div>
                <span className="text-[var(--text-muted)] group-hover:text-gold transition-colors text-sm shrink-0">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
