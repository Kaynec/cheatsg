<template>
  <button
    v-bind="$attrs"
    class="rounded-3xl px-lg py-sm text-sm !border-1 border-primary w-full"
    :style="`color:${getStringColor}`"
  >
    <slot></slot>
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const { color } = defineProps<{
  label?: string;
  color?: string;
}>();

const getStringColor = computed(() => {
  if (color) return color;
  else {
    return `var('--q-primary')`;
  }
});
</script>
