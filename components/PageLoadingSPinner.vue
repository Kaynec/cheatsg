<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center backdrop-blur-lg justify-center z-9999"
  >
    <QSpinner size="5rem" color="primary" />
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loading = ref(false)
nuxtApp.hook('page:start', () => {
  loading.value = true
})
nuxtApp.hook('page:finish', () => {
  loading.value = false
})
</script>
