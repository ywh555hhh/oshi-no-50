import express from 'express'
import cors from 'cors'
import { seion, dakuon, handakuon, youon, dakuonYouon, special, allKana } from './data/kana.js'
import { pronunciationRules, ruleCategories } from './data/rules.js'
import { onomatopoeia, onomatopoeiaCategories } from './data/onomatopoeia.js'
import { discrimination, discCategories } from './data/discrimination.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// ===== Kana =====
app.get('/api/kana', (_req, res) => {
  res.json({
    seion,
    dakuon,
    handakuon,
    youon,
    dakuonYouon,
    special,
    allKana,
  })
})

// ===== Pronunciation Rules =====
app.get('/api/rules', (_req, res) => {
  res.json({ rules: pronunciationRules, categories: ruleCategories })
})

// ===== Onomatopoeia =====
app.get('/api/onomatopoeia', (_req, res) => {
  res.json({ items: onomatopoeia, categories: onomatopoeiaCategories })
})

// ===== Discrimination =====
app.get('/api/discrimination', (_req, res) => {
  res.json({ pairs: discrimination, categories: discCategories })
})

// ===== Search =====
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase()
  if (!q) return res.json({ results: [] })

  const results = []

  // 搜索假名
  for (const item of allKana) {
    if (item.h.includes(q) || item.k.includes(q) || item.r.toLowerCase().includes(q) || (item.type || '').includes(q)) {
      results.push({ ...item, source: 'kana' })
    }
  }

  // 搜索规则
  for (const rule of pronunciationRules) {
    let matched = false
    if (rule.title.toLowerCase().includes(q) || rule.category.includes(q) || rule.rule.toLowerCase().includes(q)) {
      matched = true
    }
    for (const ex of rule.examples) {
      if (ex.word.includes(q) || ex.reading.toLowerCase().includes(q) || ex.meaning.includes(q)) {
        matched = true
        break
      }
    }
    if (matched) {
      results.push({ id: rule.id, title: rule.title, category: rule.category, source: 'rule' })
    }
  }

  // 搜索拟声词
  for (const item of onomatopoeia) {
    if (item.word.includes(q) || item.reading.toLowerCase().includes(q) || item.meaning.includes(q) || item.category.includes(q) || item.example.includes(q)) {
      results.push({ ...item, source: 'onomatopoeia' })
    }
  }

  // 搜索辨音词
  for (const item of discrimination) {
    const hay = [
      item.title,
      item.category,
      item.tip,
      item.a.word,
      item.a.kana,
      item.a.romaji,
      item.a.meaning,
      item.b.word,
      item.b.kana,
      item.b.romaji,
      item.b.meaning,
    ].join(' ').toLowerCase()
    if (hay.includes(q)) {
      results.push({ id: item.id, title: item.title, category: item.category, source: 'discrimination' })
    }
  }

  res.json({ results })
})

// ===== 全量数据（一次性加载） =====
app.get('/api/all', (_req, res) => {
  res.json({
    kana: { seion, dakuon, handakuon, youon, dakuonYouon, special, allKana },
    rules: pronunciationRules,
    ruleCategories,
    onomatopoeia,
    onomatopoeiaCategories,
    discrimination,
    discCategories,
  })
})

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
