import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { discrimination } from '../server/data/discrimination.js'
import { pronunciationRules } from '../server/data/rules.js'
import { onomatopoeia } from '../server/data/onomatopoeia.js'
import { seion, dakuon, handakuon, youon, dakuonYouon, special, allKana } from '../server/data/kana.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'public', 'data.json')

const payload = {
  kana: { seion, dakuon, handakuon, youon, dakuonYouon, special, allKana },
  rules: pronunciationRules,
  ruleCategories: Array.from(new Set(pronunciationRules.map(r => r.category))).map(id => ({ id, label: id })),
  onomatopoeia,
  onomatopoeiaCategories: Array.from(new Set(onomatopoeia.map(x => x.category))),
  discrimination,
  discCategories: Array.from(new Set(discrimination.map(x => x.category))).map(id => ({ id, label: id })),
}

fs.writeFileSync(outPath, JSON.stringify(payload, null, 2))
console.log(`Wrote ${outPath}`)
