<template>
  <label
    class="relative full-width justify-between inline-flex items-center cursor-pointer"
    :checked="!!modelValue"
    :aria-checked="!!modelValue"
  >
    <input type="checkbox" value="" class="sr-only peer" v-model="modelValue" />

    <span class="ms-3 text-sm font-medium text-text-primary">{{ label }}</span>
    <div
      class="w-11 h-6 bg-gray-200 !rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:end-[2px] after:bg-white after:border-gray-300 after:border after:!rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
}>()

const modelValue = defineModel<boolean>()
</script>
