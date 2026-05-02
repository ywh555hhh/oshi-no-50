<template>
  <button
    class="kana-char group relative flex flex-col items-center justify-center
           rounded-xl border-2 border-transparent
           bg-white dark:bg-gray-800
           hover:border-rose-400 dark:hover:border-rose-500
           hover:shadow-lg hover:shadow-rose-200/50 dark:hover:shadow-rose-900/30
           transition-all duration-150 cursor-pointer
           select-none aspect-square"
    :class="[
      active ? 'kana-pop border-rose-500 dark:border-rose-400 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 scale-105' : '',
      size === 'sm' ? 'w-20 h-20 p-1' : 'w-24 h-24 p-2 md:w-28 md:h-28',
    ]"
    @click="$emit('click')"
  >
    <!-- 平假名 -->
    <span
      class="font-black leading-none text-gray-900 dark:text-gray-100"
      :class="size === 'sm' ? 'text-2xl' : 'text-3xl md:text-4xl'"
    >{{ item.h }}</span>
    <!-- 片假名 -->
    <span
      class="font-bold text-blue-600 dark:text-blue-400 leading-none"
      :class="size === 'sm' ? 'text-lg' : 'text-xl md:text-2xl'"
    >{{ item.k }}</span>
    <!-- 罗马音 -->
    <span
      class="text-xs text-gray-400 dark:text-gray-500 font-mono"
    >{{ item.r }}</span>
    <!-- 播放指示 -->
    <span
      v-if="active"
      class="absolute top-1 right-1 text-rose-500 text-xs"
    >🔊</span>
  </button>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  active: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
})
defineEmits(['click'])
</script>
