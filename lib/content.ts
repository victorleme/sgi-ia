import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface LessonMeta {
  slug: string
  section: string
  title: string
  order: number
  description?: string
}

export interface Lesson extends LessonMeta {
  contentHtml: string
}

export function getAllSections(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR).filter((f) =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  )
}

export function getLessonsForSection(section: string): LessonMeta[] {
  const sectionDir = path.join(CONTENT_DIR, section)
  if (!fs.existsSync(sectionDir)) return []

  const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'))

  return files
    .map((file) => {
      const filePath = path.join(sectionDir, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      const slug = file.replace(/\.md$/, '')
      return {
        slug,
        section,
        title: data.title || slug,
        order: data.order || 0,
        description: data.description || '',
      } as LessonMeta
    })
    .sort((a, b) => a.order - b.order)
}

export async function getLesson(section: string, slug: string): Promise<Lesson | null> {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const processed = await remark().use(html).process(content)
  const contentHtml = processed.toString()

  return {
    slug,
    section,
    title: data.title || slug,
    order: data.order || 0,
    description: data.description || '',
    contentHtml,
  }
}

export function getAllLessonPaths(): { section: string; lesson: string }[] {
  const sections = getAllSections()
  const paths: { section: string; lesson: string }[] = []

  for (const section of sections) {
    const lessons = getLessonsForSection(section)
    for (const lesson of lessons) {
      paths.push({ section, lesson: lesson.slug })
    }
  }

  return paths
}
