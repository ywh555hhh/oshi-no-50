<template>
  <div class="space-y-6">
    <!-- 分类过滤 -->
    <div class="flex flex-wrap gap-2">
      <button
        class="px-3 py-1 rounded-full text-sm transition-colors"
        :class="activeCategory === null
          ? 'bg-rose-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        @click="activeCategory = null"
      >全部</button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="px-3 py-1 rounded-full text-sm transition-colors"
        :class="activeCategory === cat.id
          ? 'bg-rose-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        @click="activeCategory = cat.id"
      >{{ cat.label }}</button>
    </div>

    <!-- 规则卡片 -->
    <div v-for="rule in filteredRules" :key="rule.id" class="fade-in">
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <!-- 标题栏 -->
        <div
          class="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          @click="toggle(rule.id)"
        >
          <span class="text-sm font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap">{{ rule.icon }}</span>
          <div class="flex-1">
            <h3 class="font-bold">{{ rule.title }}</h3>
            <p class="text-xs text-gray-400">{{ rule.category }}</p>
          </div>
          <span class="text-gray-400 text-xl transition-transform" :class="expanded[rule.id] ? 'rotate-180' : ''">&#9662;</span>
        </div>

        <!-- 展开内容 -->
        <div v-if="expanded[rule.id]" class="border-t border-gray-100 dark:border-gray-700">
          <!-- 规则说明 -->
          <div class="px-5 py-3 bg-gray-50 dark:bg-gray-900/50">
            <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ rule.rule }}</p>
          </div>
          <!-- 示例表格 -->
          <div class="divide-y divide-gray-100 dark:divide-gray-700">
            <div
              v-for="(ex, i) in rule.examples"
              :key="i"
              class="flex items-center gap-3 px-5 py-3 hover:bg-rose-50/50 dark:hover:bg-rose-900/10 cursor-pointer transition-colors"
              @click.stop="playAudio(ex.audio, ex.word)"
            >
              <span class="text-rose-400 text-xs">{{ playingId === (ex.audio || ex.word) ? '⏸' : '🔊' }}</span>
              <span class="font-jp text-lg font-bold min-w-[7rem]">{{ ex.word }}</span>
              <span class="font-mono text-sm text-gray-500 min-w-[10rem]">{{ ex.reading }}</span>
              <span class="text-sm flex-1">{{ ex.meaning }}</span>
              <span v-if="ex.note" class="text-xs text-gray-400 hidden sm:block">{{ ex.note }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  rules: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
})

const emit = defineEmits(['speak'])

const activeCategory = ref(null)
const expanded = ref({})
const playingId = ref(null)

function toggle(id) {
  expanded.value[id] = !expanded.value[id]
}

const filteredRules = computed(() => {
  if (!activeCategory.value) return props.rules
  return props.rules.filter(r => r.category === activeCategory.value)
})

function playAudio(audioUrl, fallbackWord) {
  playingId.value = audioUrl || fallbackWord
  if (audioUrl) {
    const a = new Audio(audioUrl)
    a.onended = () => { playingId.value = null }
    a.onerror = () => { playingId.value = null; emit('speak', fallbackWord) }
    a.play().catch(() => { playingId.value = null; emit('speak', fallbackWord) })
  } else {
    emit('speak', fallbackWord)
  }
  setTimeout(() => { playingId.value = null }, 2000)
}
</script>
