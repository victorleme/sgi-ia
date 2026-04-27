import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSectionBySlug, SECTIONS } from '@/lib/sections'
import { getLesson, getLessonsForSection, getAllLessonPaths } from '@/lib/content'

interface Props {
  params: Promise<{ section: string; lesson: string }>
}

export async function generateStaticParams() {
  return getAllLessonPaths().map(({ section, lesson }) => ({ section, lesson }))
}

export default async function LessonPage({ params }: Props) {
  const { section: sectionSlug, lesson: lessonSlug } = await params
  const section = getSectionBySlug(sectionSlug)
  if (!section) notFound()

  const lesson = await getLesson(sectionSlug, lessonSlug)
  if (!lesson) notFound()

  const allLessons = getLessonsForSection(sectionSlug)
  const currentIndex = allLessons.findIndex((l) => l.slug === lessonSlug)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8 flex-wrap">
        <Link href="/" className="hover:text-gold transition-colors">Portal</Link>
        <span>/</span>
        <Link href={`/${sectionSlug}`} className={`hover:text-gold transition-colors ${section.color}`}>
          {section.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--text)] truncate max-w-[200px]">{lesson.title}</span>
      </div>

      {/* Lesson header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{section.icon}</span>
          <span className={`text-xs font-semibold uppercase tracking-wider ${section.color}`}>
            {section.title}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)] leading-tight mb-3">
          {lesson.title}
        </h1>
        {lesson.description && (
          <p className="text-[var(--text-muted)] text-base leading-relaxed">
            {lesson.description}
          </p>
        )}
      </div>

      <div className="h-px bg-[var(--border)] mb-10" />

      {/* Content */}
      <div
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
      />

      {/* Navigation */}
      <div className="mt-14 pt-8 border-t border-[var(--border)] flex justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/${sectionSlug}/${prevLesson.slug}`}
            className="flex-1 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] hover:border-[#333] hover:bg-[var(--bg-hover)] transition-all group"
          >
            <div className="text-xs text-[var(--text-muted)] mb-1">← Anterior</div>
            <div className="text-sm font-medium text-[var(--text)] group-hover:text-gold transition-colors leading-tight">
              {prevLesson.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextLesson ? (
          <Link
            href={`/${sectionSlug}/${nextLesson.slug}`}
            className="flex-1 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] hover:border-[#333] hover:bg-[var(--bg-hover)] transition-all group text-right"
          >
            <div className="text-xs text-[var(--text-muted)] mb-1">Próxima →</div>
            <div className="text-sm font-medium text-[var(--text)] group-hover:text-gold transition-colors leading-tight">
              {nextLesson.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
