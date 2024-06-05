<template>
  <div
    class="text-primary h-8 px-1 text-xs px-3 items-center gap-1 rounded-lg flex"
    :class="[{ 'border-1 border-primary': bordered }, containerClasses]"
  >
    <Star class="stroke-primary !w-4 !h-4 mb-1" :class="starClasses" />
    {{ starNumber }}
  </div>
</template>

<script setup lang="ts">
const { bordered = true, starNumber = 0 } = defineProps<{
  starNumber: number
  bordered?: boolean
  starClasses?: string
  containerClasses?: string
}>()
</script>
