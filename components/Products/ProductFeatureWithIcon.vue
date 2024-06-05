<template>
  <div class="flex gap-2 items-center text_lg text-text-secondary">
    <slot name="icon">
      <CheckCircle class="fill-gray" />
    </slot>
    {{ title }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
