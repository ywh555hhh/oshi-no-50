<template>
  <div class="space-y-6">
    <!-- 分类过滤 -->
    <div class="flex flex-wrap gap-2">
      <button
        class="px-3 py-1.5 rounded-full text-sm font-semibold transition-colors"
        :class="activeCategory === null
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        @click="activeCategory = null"
      >全部 ({{ pairs.length }}组)</button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="px-3 py-1.5 rounded-full text-sm transition-colors"
        :class="activeCategory === cat.id
          ? catColorActive(cat.color)
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        @click="activeCategory = cat.id"
      >{{ cat.label }} <span class="text-xs opacity-60">{{ cat.tip }}</span></button>
    </div>

    <!-- 对比卡片 -->
    <div v-for="item in filtered" :key="item.id" class="fade-in">
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <!-- 标题栏 -->
        <div class="flex items-center gap-3 px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
          <span class="text-sm font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold">{{ item.title }}</span>
          <span class="text-xs text-gray-400">{{ item.category }}</span>
        </div>

        <!-- 对比区域 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-gray-700">
          <!-- 词A -->
          <div
            class="flex flex-col items-center justify-center p-5 cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
            :class="playingId === item.a.audio ? 'bg-blue-50 dark:bg-blue-900/20' : ''"
            @click="play(item.a)"
          >
            <span class="text-xs text-blue-400 mb-1">A</span>
            <span class="font-jp text-3xl font-black mb-1">{{ item.a.word }}</span>
            <span class="font-jp text-lg text-gray-500">{{ item.a.kana }}</span>
            <span class="font-mono text-sm text-blue-600 dark:text-blue-400">{{ item.a.romaji }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ item.a.meaning }}</span>
          </div>
          <!-- 词B -->
          <div
            class="flex flex-col items-center justify-center p-5 cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors"
            :class="playingId === item.b.audio ? 'bg-rose-50 dark:bg-rose-900/20' : ''"
            @click="play(item.b)"
          >
            <span class="text-xs text-rose-400 mb-1">B</span>
            <span class="font-jp text-3xl font-black mb-1">{{ item.b.word }}</span>
            <span class="font-jp text-lg text-gray-500">{{ item.b.kana }}</span>
            <span class="font-mono text-sm text-rose-600 dark:text-rose-400">{{ item.b.romaji }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ item.b.meaning }}</span>
          </div>
        </div>

        <!-- 提示 -->
        <div class="px-5 py-3 bg-amber-50/50 dark:bg-amber-900/10 border-t border-gray-100 dark:border-gray-700">
          <p class="text-sm text-amber-800 dark:text-amber-300">
            <span class="font-bold">辨音提示：</span>{{ item.tip }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="text-center text-gray-400 py-8">该分类暂无内容</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  pairs: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
})

const emit = defineEmits(['speak'])
const activeCategory = ref(null)
const playingId = ref(null)

const filtered = computed(() => {
  if (!activeCategory.value) return props.pairs
  return props.pairs.filter(p => p.category === activeCategory.value)
})

function play(word) {
  playingId.value = word.audio
  if (word.audio) {
    const a = new Audio(word.audio)
    a.onended = () => { playingId.value = null }
    a.onerror = () => { playingId.value = null; emit('speak', word.kana) }
    a.play().catch(() => { playingId.value = null; emit('speak', word.kana) })
  } else {
    emit('speak', word.kana)
  }
  setTimeout(() => { playingId.value = null }, 3000)
}

const colorMap = {
  blue: 'bg-blue-500 text-white',
  teal: 'bg-teal-500 text-white',
  purple: 'bg-purple-500 text-white',
  amber: 'bg-amber-500 text-white',
  rose: 'bg-rose-500 text-white',
  green: 'bg-green-500 text-white',
}
function catColorActive(color) {
  return colorMap[color] || 'bg-blue-500 text-white'
}
</script>
