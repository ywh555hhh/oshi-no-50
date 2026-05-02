const isProd = import.meta.env.PROD
const STATIC_BASE = import.meta.env.BASE_URL || '/'
const DEV_BASE = '/api'

async function request(path) {
  const base = isProd ? STATIC_BASE : DEV_BASE
  const res = await fetch(base + path)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function fetchAll() {
  if (isProd) {
    const res = await fetch(`${STATIC_BASE}data.json`)
    if (!res.ok) throw new Error(`Static data error: ${res.status}`)
    return res.json()
  }
  return request('/all')
}

export function searchKana(query, allData) {
  if (isProd) {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const results = []

    for (const item of allData.kana.allKana || []) {
      if (item.h.includes(q) || item.k.includes(q) || item.r.toLowerCase().includes(q) || (item.type || '').includes(q)) {
        results.push({ ...item, source: 'kana' })
      }
    }

    for (const rule of allData.rules || []) {
      let matched = false
      if (rule.title.toLowerCase().includes(q) || rule.category.includes(q) || rule.rule.toLowerCase().includes(q)) matched = true
      for (const ex of rule.examples || []) {
        if (ex.word.includes(q) || ex.reading.toLowerCase().includes(q) || ex.meaning.includes(q)) {
          matched = true
          break
        }
      }
      if (matched) results.push({ id: rule.id, title: rule.title, category: rule.category, source: 'rule' })
    }

    for (const item of allData.onomatopoeia || []) {
      if (item.word.includes(q) || item.reading.toLowerCase().includes(q) || item.meaning.includes(q) || item.category.includes(q) || item.example.includes(q)) {
        results.push({ ...item, source: 'onomatopoeia' })
      }
    }

    for (const item of allData.discrimination || []) {
      const hay = [item.title, item.category, item.tip, item.a.word, item.a.kana, item.a.romaji, item.a.meaning, item.b.word, item.b.kana, item.b.romaji, item.b.meaning].join(' ').toLowerCase()
      if (hay.includes(q)) {
        results.push({ id: item.id, title: item.title, category: item.category, source: 'discrimination' })
      }
    }

    return Promise.resolve({ results })
  }

  return request(`/search?q=${encodeURIComponent(query)}`)
}

export function fetchKana() {
  return request('/kana')
}

export function fetchRules() {
  return request('/rules')
}

export function fetchOnomatopoeia() {
  return request('/onomatopoeia')
}
