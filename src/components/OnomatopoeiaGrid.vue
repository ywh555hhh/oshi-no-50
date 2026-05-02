<template>
  <div class="space-y-4">
    <!-- 分类过滤 -->
    <div class="flex flex-wrap gap-2">
      <button
        class="px-3 py-1 rounded-full text-sm transition-colors"
        :class="activeCategory === null
          ? 'bg-amber-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        @click="activeCategory = null"
      >全部</button>
      <button
        v-for="cat in categories"
        :key="cat"
        class="px-3 py-1 rounded-full text-sm transition-colors"
        :class="activeCategory === cat
          ? 'bg-amber-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>

    <!-- 卡片网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="item in filtered"
        :key="item.word"
        class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4
               hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md
               transition-all cursor-pointer fade-in"
        :class="playingId === item.word ? 'border-amber-500 shadow-md ring-2 ring-amber-200 dark:ring-amber-800' : ''"
        @click="playWord(item)"
      >
        <!-- 词语 + 罗马音 -->
        <div class="flex items-baseline gap-3 mb-2">
          <span class="font-jp text-2xl font-black">{{ item.word }}</span>
          <span class="font-mono text-sm text-amber-600 dark:text-amber-400">{{ item.reading }}</span>
          <span v-if="playingId === item.word" class="text-amber-500 text-sm ml-auto">🔊</span>
        </div>
        <!-- 含义 -->
        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{{ item.meaning }}</p>
        <!-- 例句 -->
        <div class="text-xs text-gray-500 dark:text-gray-400 space-y-0.5 border-t border-gray-100 dark:border-gray-700 pt-2">
          <p class="font-jp">{{ item.example }}</p>
          <p class="font-mono text-gray-400">{{ item.exReading }}</p>
          <p>{{ item.exMeaning }}</p>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filtered.length === 0" class="text-center text-gray-400 py-8">
      该分类暂无内容
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
})

const emit = defineEmits(['speak'])
const activeCategory = ref(null)
const playingId = ref(null)

const filtered = computed(() => {
  if (!activeCategory.value) return props.items
  return props.items.filter(i => i.category === activeCategory.value)
})

function playWord(item) {
  playingId.value = item.word
  if (item.audio) {
    const a = new Audio(item.audio)
    a.onended = () => { playingId.value = null }
    a.onerror = () => { playingId.value = null; emit('speak', item.word) }
    a.play().catch(() => { playingId.value = null; emit('speak', item.word) })
  } else {
    emit('speak', item.word)
  }
  setTimeout(() => { playingId.value = null }, 2000)
}
</script>
