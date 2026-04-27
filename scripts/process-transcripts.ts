#!/usr/bin/env tsx
/**
 * Converts raw SGI transcript .txt files into clean markdown lessons.
 * Classifies each lesson into a section based on its title keywords.
 * Run: npx tsx scripts/process-transcripts.ts
 */

import fs from 'fs'
import path from 'path'

const SOURCE_DIR = '/Users/victorfreitas/Desktop/SGI-IA/resultados-finais-transcripts-txt'
const CONTENT_DIR = path.join(process.cwd(), 'content')

// Section classification rules — order matters (first match wins)
const SECTION_RULES: { slug: string; keywords: RegExp }[] = [
  {
    slug: 'segunda-camara',
    keywords: /2C|2c|segunda.c[aâ]mara|2ª/i,
  },
  {
    slug: 'tira-duvidas',
    keywords: /tira.d[uú]vida|perguntas.*resposta|Q&A|Q\.A/i,
  },
  {
    slug: 'mundo-astral',
    keywords: /astral|sonho|proj[eê][cç][aã]o|l[uú]cido|clariv[iî]d[eê]n|plano astral/i,
  },
  {
    slug: 'magia-pratica',
    keywords: /magia|ritual|invoca|runas|cerim[oô]n|elemental|exorcis|ban[ih]o|def[eê]sa psiq/i,
  },
  {
    slug: 'corpo-energetico',
    keywords: /chacra|chakra|kundalin|energi|corpo energ|anatomia energ|trabalho energ/i,
  },
  {
    slug: 'tradicoes-iniciaticas',
    keywords: /gnos|kabal|tarot|hermet|alqui|arcano|runa|esot[eé]r|templar|iniciaci[aã]o|mist[eé]rio/i,
  },
  {
    slug: 'meditacao-presenca',
    keywords: /medita|sil[eê]nc|aten[cç][aã]o|contempla|momento presente|estados superiores/i,
  },
  {
    slug: 'psicologia-esoterica',
    keywords: /ego|sombra|integr|personalidade|psicol|emo[cç][iî]on|ansied|complex|rebel|falso/i,
  },
]

function classifyLesson(filename: string): string {
  for (const rule of SECTION_RULES) {
    if (rule.keywords.test(filename)) {
      return rule.slug
    }
  }
  // Default: put uncategorized into psicologia-esoterica
  return 'psicologia-esoterica'
}

function cleanTitle(filename: string): string {
  return filename
    .replace(/^\d+ - /, '') // remove leading number
    .replace(/\.(txt|md)$/, '') // remove extension
    .replace(/^(Aula \d+[C]?[_:]\s*|AULA \d+[C]?[_:]\s*|Aula \d+[C]? - |AULA \d+[C]? - |Estudo \d+[C]?[_:]\s*|Encontro #\d+ - |Tira.D[uú]vida \d+ - |Tira-d[uú]vidas \d+ - |Perguntas e Respostas \d+ - )/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function convertTranscriptToMarkdown(raw: string, title: string): string {
  const lines = raw
    .split('\n')
    .map((line) => line.replace(/^\[\d{2}:\d{2}:\d{2} - \d{2}:\d{2}:\d{2}\]\s*/, '').trim())
    .filter((line) => line.length > 0)

  // Group short lines into paragraphs
  const paragraphs: string[] = []
  let current: string[] = []

  for (const line of lines) {
    if (line.endsWith('...') || line.length < 60) {
      current.push(line)
    } else {
      current.push(line)
      paragraphs.push(current.join(' '))
      current = []
    }
  }
  if (current.length > 0) {
    paragraphs.push(current.join(' '))
  }

  const body = paragraphs
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .join('\n\n')

  return body
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

// Create section directories
const SECTION_SLUGS = [
  'psicologia-esoterica',
  'meditacao-presenca',
  'corpo-energetico',
  'magia-pratica',
  'mundo-astral',
  'tradicoes-iniciaticas',
  'segunda-camara',
  'tira-duvidas',
]

for (const slug of SECTION_SLUGS) {
  fs.mkdirSync(path.join(CONTENT_DIR, slug), { recursive: true })
}

// Process all transcript files
const files = fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.txt'))
const sectionCounters: Record<string, number> = {}

let processed = 0
let skipped = 0

for (const file of files.sort()) {
  const raw = fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8')

  if (raw.trim().length < 100) {
    skipped++
    continue
  }

  const section = classifyLesson(file)
  const title = cleanTitle(file)
  const order = (sectionCounters[section] || 0) + 1
  sectionCounters[section] = order

  const bodyContent = convertTranscriptToMarkdown(raw, title)
  const fileNumber = file.match(/^(\d+)/)?.[1] || String(order)
  const lessonSlug = `${fileNumber.padStart(4, '0')}-${slugify(title)}`

  const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
order: ${parseInt(fileNumber, 10)}
section: "${section}"
---

${bodyContent}
`

  const outputPath = path.join(CONTENT_DIR, section, `${lessonSlug}.md`)
  fs.writeFileSync(outputPath, markdown, 'utf8')
  processed++
}

console.log(`✅ Processed: ${processed} lessons`)
console.log(`⏭️  Skipped: ${skipped} files`)
console.log('\nDistribution:')
for (const [section, count] of Object.entries(sectionCounters)) {
  console.log(`  ${section}: ${count}`)
}
