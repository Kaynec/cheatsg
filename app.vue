<script setup lang="ts">
const globalStore = useGlobalStore();

onMounted(() => {
  globalStore.changeDarkModeSelectors();
});
</script>
<template>
  <Head>
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta lang="fa" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <NuxtLayout>
    <NuxtLoadingIndicator :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
</template>
