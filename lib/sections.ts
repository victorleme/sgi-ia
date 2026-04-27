export interface Section {
  slug: string
  title: string
  description: string
  icon: string
  color: string
}

export const SECTIONS: Section[] = [
  {
    slug: 'psicologia-esoterica',
    title: 'Psicologia Esotérica',
    description: 'Ego, falsa personalidade, sombra, integração e transformação interior.',
    icon: '🧠',
    color: 'text-violet-400',
  },
  {
    slug: 'meditacao-presenca',
    title: 'Meditação & Presença',
    description: 'Silêncio interior, atenção, autoconhecimento e estados superiores de consciência.',
    icon: '🕯️',
    color: 'text-blue-400',
  },
  {
    slug: 'corpo-energetico',
    title: 'Corpo Energético & Chacras',
    description: 'Anatomia energética, os sete chacras, kundalini e trabalho energético avançado.',
    icon: '⚡',
    color: 'text-amber-400',
  },
  {
    slug: 'magia-pratica',
    title: 'Magia Prática',
    description: 'Magia no dia a dia, cerimonial, proteção psíquica e rituais elementais.',
    icon: '🔥',
    color: 'text-red-400',
  },
  {
    slug: 'mundo-astral',
    title: 'Mundo Astral & Sonhos',
    description: 'Projeção astral consciente, sonhos lúcidos, clarividência e plano astral.',
    icon: '🌙',
    color: 'text-indigo-400',
  },
  {
    slug: 'tradicoes-iniciaticas',
    title: 'Tradições Iniciáticas',
    description: 'Gnosis, Kabalah, Tarot, Hermetismo, Runas Gnósticas e Alquimia Interior.',
    icon: '⚗️',
    color: 'text-emerald-400',
  },
  {
    slug: 'segunda-camara',
    title: '2ª Câmara',
    description: 'Estudos e aulas do ciclo avançado da segunda câmara.',
    icon: '🗝️',
    color: 'text-gold',
  },
  {
    slug: 'tira-duvidas',
    title: 'Tira-Dúvidas & Encontros',
    description: 'Perguntas, respostas e encontros especiais.',
    icon: '💬',
    color: 'text-slate-400',
  },
]

export function getSectionBySlug(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug)
}
