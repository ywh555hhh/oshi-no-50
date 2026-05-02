<template>
  <div class="flex items-center gap-3 mb-4">
    <div
      class="w-1 h-8 rounded-full"
      :class="colorMap[color] || 'bg-rose-500'"
    ></div>
    <div>
      <h2 class="text-lg md:text-xl font-bold">{{ title }}</h2>
      <p class="text-xs text-gray-400">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  color: { type: String, default: 'rose' },
})

const colorMap = {
  rose: 'bg-rose-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  amber: 'bg-amber-500',
  teal: 'bg-teal-500',
}
</script>
