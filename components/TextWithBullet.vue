<template>
  <span
    class="text-text-secondary relative f-text-9-11 flex items-center gap-1 whitespace-nowrap"
  >
    <Bullet
      class="fill-primary shadow-2xl top-1/2 !rounded-full bg-primary w-1.25 h-1.25"
    />
    {{ label }}
    <span class="text-text-primary"> {{ value }} </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<style scoped></style>
