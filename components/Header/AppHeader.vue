<template>
  <header class="bg-transparent mx-auto transition-600">
    <LazyDesktopHeader
      :key="store.currentuser?.firstname + ' ' + store.currentuser?.lastname"
      :scrollAmount="scrollAmount"
      :currentuser="store.currentuser"
    />
    <LazyMobileHeader
      :key="store.currentuser?.firstname + ' ' + store.currentuser?.lastname"
      :scrollAmount="scrollAmount"
      :currentuser="store.currentuser"
    />
  </header>
</template>

<script setup lang="ts">
defineProps(["scrollAmount"]);

const store = useAuthStore();
</script>
