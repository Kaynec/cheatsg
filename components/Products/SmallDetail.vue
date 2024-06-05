<template>
  <div class="flex py-xl justify-between full-width px-sm lg:px-xl">
    <span class="flex-1 max-w-90">
      {{ label }}
    </span>
    <div class="flex-1 text-text-secondary">
      <span class="pb-lg">
        {{ desc }}
      </span>
      <q-separator v-if="addSeperator" class="q-mt-sm" color="border-primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    desc: string
    addSeperator?: boolean
  }>(),
  {
    addSeperator: true
  }
)
</script>

<style scoped></style>
