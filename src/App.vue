<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🇯🇵</span>
          <h1 class="text-lg md:text-xl font-bold">
            五十音速查
            <span class="text-sm font-normal text-gray-400 hidden sm:inline">· 推しの50音</span>
          </h1>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="p-2 rounded-lg text-sm"
            :class="viewMode === 'grid' ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'"
            @click="viewMode = 'grid'" title="卡片视图"
          >▦</button>
          <button
            class="p-2 rounded-lg text-sm"
            :class="viewMode === 'table' ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'"
            @click="viewMode = 'table'" title="表格视图"
          >☰</button>
          <button
            class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="toggleDark"
          >{{ isDark ? '☀️' : '🌙' }}</button>
        </div>
      </div>
    </header>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
      <div class="text-4xl animate-pulse">⏳</div>
      <p class="text-gray-400">加载数据中...</p>
    </div>

    <!-- 主内容 -->
    <template v-else>
      <!-- 搜索栏 -->
      <div class="max-w-6xl mx-auto px-4 pt-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索假名、罗马音、规则、拟声词... (如: は, wa, 促音, ドキドキ)"
            class="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800
                   focus:outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500
                   text-gray-900 dark:text-gray-100 placeholder-gray-400 transition-all"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <button
            v-if="searchQuery"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            @click="searchQuery = ''"
          >✕</button>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div v-if="searchQuery" class="max-w-6xl mx-auto px-4 py-4 space-y-4">
        <div v-if="searchResults.length > 0">
          <p class="text-sm text-gray-500 mb-3">找到 {{ searchResults.length }} 个结果</p>
          <div class="space-y-3">
            <div v-if="kanaSearchResults.length" class="flex flex-wrap gap-2">
              <KanaCard
                v-for="item in kanaSearchResults"
                :key="item.h + item.k"
                :item="item"
                :active="playing === item.h"
                size="sm"
                @click="speak(item.h, item.h)"
              />
            </div>
            <div v-for="item in ruleSearchResults" :key="item.id"
              class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <span class="text-xs px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">{{ item.category }}</span>
              <span class="ml-2 font-bold">{{ item.title }}</span>
            </div>
            <div v-for="item in discriminationSearchResults" :key="item.id"
              class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <span class="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">{{ item.category }}</span>
              <span class="ml-2 font-bold">{{ item.title }}</span>
            </div>
            <div v-if="onomatopoeiaSearchResults.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <div v-for="item in onomatopoeiaSearchResults" :key="item.word"
                class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer hover:border-amber-400"
                @click="speak(item.word, item.word)">
                <span class="font-jp font-black text-lg">{{ item.word }}</span>
                <span class="ml-2 text-sm text-amber-600 dark:text-amber-400 font-mono">{{ item.reading }}</span>
                <p class="text-sm text-gray-500">{{ item.meaning }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-400 py-12">没有找到匹配的结果</div>
      </div>

      <!-- 主内容区（非搜索时显示） -->
      <main v-if="!searchQuery" class="max-w-6xl mx-auto px-4 py-6 space-y-12">

        <!-- ===== 清音五十音 ===== -->
        <section>
          <SectionTitle title="清音 · 五十音" subtitle="Seion · 46字" color="rose" />
          <div v-if="viewMode === 'grid'" class="space-y-4">
            <div v-for="group in seionGroups" :key="group.row">
              <h3 class="text-sm font-semibold text-gray-500 mb-2 ml-1">{{ group.row }}行</h3>
              <div class="flex flex-wrap gap-2">
                <KanaCard v-for="item in group.chars" :key="item.h" :item="item" :active="playing === item.h" @click="speak(item.h, item.h)" />
              </div>
            </div>
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full border-collapse text-center font-jp">
              <thead>
                <tr>
                  <th class="p-2 text-xs text-gray-400 font-normal"></th>
                  <th v-for="dan in ['あ段','い段','う段','え段','お段']" :key="dan" class="p-2 text-xs text-gray-500 font-semibold">{{ dan }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in seionTableRows" :key="row.label" class="hover:bg-rose-50 dark:hover:bg-rose-900/20">
                  <td class="p-2 text-xs text-gray-400 font-semibold whitespace-nowrap">{{ row.label }}</td>
                  <td v-for="(cell, ci) in row.cells" :key="ci"
                    class="p-2 cursor-pointer rounded-lg transition-colors"
                    :class="cell ? 'hover:bg-rose-100 dark:hover:bg-rose-800/40' : ''"
                    @click="cell && speak(cell.h, cell.h)">
                    <template v-if="cell">
                      <div class="text-xl md:text-2xl font-bold">{{ cell.h }}</div>
                      <div class="text-sm text-blue-600 dark:text-blue-400">{{ cell.k }}</div>
                      <div class="text-xs text-gray-400 font-mono">{{ cell.r }}</div>
                    </template>
                    <div v-else class="text-gray-200 dark:text-gray-700">—</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ===== 浊音 · 半浊音 ===== -->
        <section>
          <SectionTitle title="浊音 · 半浊音" subtitle="Dakuon · Handakuon · 25字" color="blue" />
          <div class="space-y-4">
            <div v-for="group in dakuonGroups" :key="group.row">
              <h3 class="text-sm font-semibold text-gray-500 mb-2 ml-1">{{ group.row }}行</h3>
              <div class="flex flex-wrap gap-2">
                <KanaCard v-for="item in group.chars" :key="item.h" :item="item" :active="playing === item.h" @click="speak(item.h, item.h)" />
              </div>
            </div>
          </div>
        </section>

        <!-- ===== 拗音 ===== -->
        <section>
          <SectionTitle title="拗音" subtitle="Youon · 33字" color="purple" />
          <div class="space-y-6">
            <div>
              <h3 class="text-sm font-semibold text-gray-500 mb-2 ml-1">清音拗音</h3>
              <div class="flex flex-wrap gap-2">
                <KanaCard v-for="item in data?.kana?.youon || []" :key="item.h" :item="item" :active="playing === item.h" size="sm" @click="speak(item.h, item.h)" />
              </div>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-gray-500 mb-2 ml-1">浊音拗音</h3>
              <div class="flex flex-wrap gap-2">
                <KanaCard v-for="item in data?.kana?.dakuonYouon || []" :key="item.h" :item="item" :active="playing === item.h" size="sm" @click="speak(item.h, item.h)" />
              </div>
            </div>
          </div>
        </section>

        <!-- ===== 特殊音 ===== -->
        <section>
          <SectionTitle title="特殊音" subtitle="促音 · 长音" color="amber" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="item in data?.kana?.special || []" :key="item.h"
              class="p-4 rounded-xl border-2 border-transparent bg-white dark:bg-gray-800
                     hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg
                     transition-all cursor-pointer text-center"
              :class="playing === item.h ? 'kana-pop border-amber-500 shadow-lg' : ''"
              @click="speak(item.h, item.h)">
              <div class="text-3xl font-black kana-char">{{ item.h }} / {{ item.k }}</div>
              <div class="text-sm text-amber-600 dark:text-amber-400 mt-1">{{ item.r }}</div>
              <div class="text-xs text-gray-400 mt-2">{{ item.note }}</div>
            </div>
          </div>
        </section>

        <!-- ===== 发音特例规则 ===== -->
        <section>
          <SectionTitle title="发音特例 · 难关" subtitle="Pronunciation Rules · 点击示例即可听发音" color="rose" />
          <PronunciationRules
            :rules="data?.rules || []"
            :categories="data?.ruleCategories || []"
            @speak="(text) => speak(text, text)"
          />
        </section>

        <!-- ===== 辨音词 ===== -->
        <section>
          <SectionTitle title="辨音词 · 练耳朵" subtitle="就像中文用「神人/僧人」区分 sh/s 一样" color="blue" />
          <p class="text-sm text-gray-500 mb-4">点击 A 或 B 听对比发音。同一组词只有微妙的差别——清浊、长短、促音、声调。反复听，练出日语耳朵。</p>
          <DiscriminationPairs
            :pairs="data?.discrimination || []"
            :categories="data?.discCategories || []"
            @speak="(text) => speak(text, text)"
          />
        </section>

        <!-- ===== 拟声词 ===== -->
        <section>
          <SectionTitle title="拟声词 · 拟态词" subtitle="オノマトペ · Onomatopoeia · 点击即可听发音" color="amber" />
          <OnomatopoeiaGrid
            :items="data?.onomatopoeia || []"
            :categories="data?.onomatopoeiaCategories || []"
            @speak="(text) => speak(text, text)"
          />
        </section>

        <!-- ===== 罗马音对照表 ===== -->
        <section>
          <SectionTitle title="罗马音速查表" subtitle="Romanji Quick Reference" color="teal" />
          <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table class="w-full text-sm">
              <thead class="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th class="p-2 text-left">罗马音</th>
                  <th class="p-2">平假名</th>
                  <th class="p-2">片假名</th>
                  <th class="p-2 text-left">类型</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in data?.kana?.allKana || []" :key="idx"
                  class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  @click="speak(item.h, item.h)">
                  <td class="p-2 font-mono text-teal-600 dark:text-teal-400">{{ item.r }}</td>
                  <td class="p-2 text-center font-jp text-lg">{{ item.h }}</td>
                  <td class="p-2 text-center font-jp text-lg text-blue-600 dark:text-blue-400">{{ item.k }}</td>
                  <td class="p-2 text-gray-400">{{ item.type }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </template>

    <footer class="text-center text-xs text-gray-400 py-8">
      点击任意假名或词语即可听到发音 · 前后端分离架构 · Vue 3 + Express · 推しの50音
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAll, searchKana } from './api/client.js'
import { useSpeech } from './composables/useSpeech.js'
import KanaCard from './components/KanaCard.vue'
import SectionTitle from './components/SectionTitle.vue'
import PronunciationRules from './components/PronunciationRules.vue'
import OnomatopoeiaGrid from './components/OnomatopoeiaGrid.vue'
import DiscriminationPairs from './components/DiscriminationPairs.vue'

const { speak, playing } = useSpeech()
const viewMode = ref('grid')
const searchQuery = ref('')
const isDark = ref(false)
const loading = ref(true)
const data = ref(null)
const searchResults = ref([])

// 按行分组
function groupByRow(arr) {
  const map = new Map()
  for (const item of arr) {
    if (!map.has(item.row)) map.set(item.row, [])
    map.get(item.row).push(item)
  }
  return Array.from(map, ([row, chars]) => ({ row: row + '行', chars }))
}

const seionGroups = computed(() => groupByRow(data.value?.kana?.seion || []))
const dakuonGroups = computed(() => groupByRow([...(data.value?.kana?.dakuon || []), ...(data.value?.kana?.handakuon || [])]))

// 表格视图数据
const seionTableRows = computed(() => {
  const rowDefs = [
    { label: 'あ行', chars: ['あ','い','う','え','お'] },
    { label: 'か行', chars: ['か','き','く','け','こ'] },
    { label: 'さ行', chars: ['さ','し','す','せ','そ'] },
    { label: 'た行', chars: ['た','ち','つ','て','と'] },
    { label: 'な行', chars: ['な','に','ぬ','ね','の'] },
    { label: 'は行', chars: ['は','ひ','ふ','へ','ほ'] },
    { label: 'ま行', chars: ['ま','み','む','め','も'] },
    { label: 'や行', chars: ['や', null,'ゆ', null,'よ'] },
    { label: 'ら行', chars: ['ら','り','る','れ','ろ'] },
    { label: 'わ行', chars: ['わ', null, null, null,'を'] },
  ]
  const seionArr = data.value?.kana?.seion || []
  return rowDefs.map(row => ({
    label: row.label,
    cells: row.chars.map(h => {
      if (!h) return null
      return seionArr.find(s => s.h === h) || null
    }),
  }))
})

// 搜索分类
const kanaSearchResults = computed(() => searchResults.value.filter(r => r.source === 'kana'))
const ruleSearchResults = computed(() => searchResults.value.filter(r => r.source === 'rule'))
const discriminationSearchResults = computed(() => searchResults.value.filter(r => r.source === 'discrimination'))
const onomatopoeiaSearchResults = computed(() => searchResults.value.filter(r => r.source === 'onomatopoeia'))

// 深色模式
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// 加载数据
onMounted(async () => {
  window.speechSynthesis?.getVoices()
  window.speechSynthesis && (window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices())

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

  try {
    data.value = await fetchAll()
  } catch (e) {
    console.error('Failed to load data:', e)
  } finally {
    loading.value = false
  }
})

// 防抖搜索
let searchTimer = null
import { watch } from 'vue'
watch(searchQuery, (q) => {
  clearTimeout(searchTimer)
  const query = q.trim()
  if (!query) { searchResults.value = []; return }
  searchTimer = setTimeout(async () => {
    try {
      const res = await searchKana(query, data.value)
      searchResults.value = res.results || []
    } catch {
      searchResults.value = []
    }
  }, 200)
})
</script>
