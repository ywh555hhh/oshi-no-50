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

export function fetchKana() {
  return request('/kana')
}

export function fetchRules() {
  return request('/rules')
}

export function fetchOnomatopoeia() {
  return request('/onomatopoeia')
}

export function searchKana(query) {
  return request(`/search?q=${encodeURIComponent(query)}`)
}
