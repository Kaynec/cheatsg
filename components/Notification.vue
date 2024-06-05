<template>
  <div
    class="border-2 border-border-secondary bg-primary-light rounded-lg pa-sm space-y-4"
  >
    <div class="flex gap-2">
      <BlueDarngerIcon />
      <span class="text-text-primary"> {{ name }} </span>
      <button class="i-carbon-close text-lg ms-auto" @click="$emit('close')" />
    </div>
    <p class="text-text-secondary">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
}>()

defineEmits(['close'])
</script>
