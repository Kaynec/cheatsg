<script setup lang="ts">
// We Get The ScrollAreas ScrollArea Ref From The Global Store

const state = useGlobalStore()

// We Set The top Position To Top Of Viewport = 0
const scrollToTop = () => {
  const DURATION = 650
  state.scrollRef?.setScrollPosition('vertical', 0, DURATION)
}
</script>
<template>
  <button
    @click="scrollToTop()"
    class="flex items-center justify-center custom-shadow bg-bcakground-primary transition-500 !hover:bg-gray-7 !rounded-full bg-inherit shadow-2xl -top-2rem w-3rem h-3rem left-1/2 translate-x-50% absolute"
  >
    <div class="i-carbon-chevron-up text-lg" />
  </button>
</template>
<style scoped>
.custom-shadow {
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25));
}
</style>
